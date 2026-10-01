import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { Pool } from 'pg';
import { AppModule } from '../src/app.module';
import { DATABASE_POOL } from '../src/database/database.module';
import { truncateAll } from './db-test-helper';

describe('Conversations (e2e)', () => {
  let app: INestApplication;
  let pool: Pool;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
    pool = app.get(DATABASE_POOL);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await truncateAll(pool);
  });

  async function registerUser(email: string, username: string) {
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email,
        password: 'correct-horse-battery',
        username,
        displayName: username,
      })
      .expect(201);
    return {
      userId: res.body.user.id as string,
      accessToken: res.body.tokens.accessToken as string,
    };
  }

  describe('direct conversations', () => {
    it('creates a direct conversation between two users', async () => {
      const alice = await registerUser('alice@example.com', 'alice');
      const bob = await registerUser('bob@example.com', 'bob');

      const res = await request(app.getHttpServer())
        .post('/conversations/direct')
        .set('Authorization', `Bearer ${alice.accessToken}`)
        .send({ userId: bob.userId })
        .expect(201);

      expect(res.body.type).toBe('DIRECT');
      const memberIds = res.body.members.map(
        (m: { userId: string }) => m.userId,
      );
      expect(memberIds).toEqual(
        expect.arrayContaining([alice.userId, bob.userId]),
      );
    });

    it('is idempotent: repeated requests return the same conversation', async () => {
      const alice = await registerUser('alice@example.com', 'alice');
      const bob = await registerUser('bob@example.com', 'bob');

      const first = await request(app.getHttpServer())
        .post('/conversations/direct')
        .set('Authorization', `Bearer ${alice.accessToken}`)
        .send({ userId: bob.userId })
        .expect(201);

      const second = await request(app.getHttpServer())
        .post('/conversations/direct')
        .set('Authorization', `Bearer ${alice.accessToken}`)
        .send({ userId: bob.userId })
        .expect(201);

      expect(second.body.id).toBe(first.body.id);
    });

    it('is symmetric regardless of who initiates', async () => {
      const alice = await registerUser('alice@example.com', 'alice');
      const bob = await registerUser('bob@example.com', 'bob');

      const fromAlice = await request(app.getHttpServer())
        .post('/conversations/direct')
        .set('Authorization', `Bearer ${alice.accessToken}`)
        .send({ userId: bob.userId })
        .expect(201);

      const fromBob = await request(app.getHttpServer())
        .post('/conversations/direct')
        .set('Authorization', `Bearer ${bob.accessToken}`)
        .send({ userId: alice.userId })
        .expect(201);

      expect(fromBob.body.id).toBe(fromAlice.body.id);
    });

    it('stays correct under concurrent duplicate creation', async () => {
      const alice = await registerUser('alice@example.com', 'alice');
      const bob = await registerUser('bob@example.com', 'bob');

      const requests = Array.from({ length: 8 }, () =>
        request(app.getHttpServer())
          .post('/conversations/direct')
          .set('Authorization', `Bearer ${alice.accessToken}`)
          .send({ userId: bob.userId }),
      );

      const results = await Promise.all(requests);
      const ids = new Set(results.map((r) => r.body.id));
      expect(ids.size).toBe(1);

      const countRes = await pool.query(
        `SELECT count(*)::int AS count FROM conversations WHERE type = 'DIRECT'`,
      );
      expect(countRes.rows[0].count).toBe(1);
    });

    it('rejects a direct conversation with oneself', async () => {
      const alice = await registerUser('alice@example.com', 'alice');
      await request(app.getHttpServer())
        .post('/conversations/direct')
        .set('Authorization', `Bearer ${alice.accessToken}`)
        .send({ userId: alice.userId })
        .expect(400);
    });

    it('404s for a nonexistent target user', async () => {
      const alice = await registerUser('alice@example.com', 'alice');
      await request(app.getHttpServer())
        .post('/conversations/direct')
        .set('Authorization', `Bearer ${alice.accessToken}`)
        .send({ userId: '00000000-0000-0000-0000-000000000000' })
        .expect(404);
    });
  });

  describe('access control', () => {
    it('prevents a non-member from reading a conversation (IDOR protection)', async () => {
      const alice = await registerUser('alice@example.com', 'alice');
      const bob = await registerUser('bob@example.com', 'bob');
      const carol = await registerUser('carol@example.com', 'carol');

      const convo = await request(app.getHttpServer())
        .post('/conversations/direct')
        .set('Authorization', `Bearer ${alice.accessToken}`)
        .send({ userId: bob.userId })
        .expect(201);

      await request(app.getHttpServer())
        .get(`/conversations/${convo.body.id}`)
        .set('Authorization', `Bearer ${carol.accessToken}`)
        .expect(404);
    });

    it('returns 404 (not 403) for a nonexistent conversation, matching non-member response', async () => {
      const alice = await registerUser('alice@example.com', 'alice');
      await request(app.getHttpServer())
        .get('/conversations/00000000-0000-0000-0000-000000000000')
        .set('Authorization', `Bearer ${alice.accessToken}`)
        .expect(404);
    });
  });

  describe('groups', () => {
    it('creates a group with the creator as OWNER', async () => {
      const alice = await registerUser('alice@example.com', 'alice');
      const bob = await registerUser('bob@example.com', 'bob');

      const res = await request(app.getHttpServer())
        .post('/conversations/groups')
        .set('Authorization', `Bearer ${alice.accessToken}`)
        .send({ name: 'Weekend Trip', memberIds: [bob.userId] })
        .expect(201);

      expect(res.body.type).toBe('GROUP');
      expect(res.body.group.name).toBe('Weekend Trip');
      const alice_member = res.body.members.find(
        (m: { userId: string }) => m.userId === alice.userId,
      );
      const bob_member = res.body.members.find(
        (m: { userId: string }) => m.userId === bob.userId,
      );
      expect(alice_member.role).toBe('OWNER');
      expect(bob_member.role).toBe('MEMBER');
    });

    it('prevents a MEMBER from removing another member', async () => {
      const alice = await registerUser('alice@example.com', 'alice');
      const bob = await registerUser('bob@example.com', 'bob');
      const carol = await registerUser('carol@example.com', 'carol');

      const group = await request(app.getHttpServer())
        .post('/conversations/groups')
        .set('Authorization', `Bearer ${alice.accessToken}`)
        .send({ name: 'Trio', memberIds: [bob.userId, carol.userId] })
        .expect(201);

      await request(app.getHttpServer())
        .delete(`/conversations/${group.body.id}/members/${carol.userId}`)
        .set('Authorization', `Bearer ${bob.accessToken}`)
        .expect(403);
    });

    it('allows the OWNER to remove a member', async () => {
      const alice = await registerUser('alice@example.com', 'alice');
      const bob = await registerUser('bob@example.com', 'bob');

      const group = await request(app.getHttpServer())
        .post('/conversations/groups')
        .set('Authorization', `Bearer ${alice.accessToken}`)
        .send({ name: 'Duo', memberIds: [bob.userId] })
        .expect(201);

      await request(app.getHttpServer())
        .delete(`/conversations/${group.body.id}/members/${bob.userId}`)
        .set('Authorization', `Bearer ${alice.accessToken}`)
        .expect(204);

      const membersRes = await request(app.getHttpServer())
        .get(`/conversations/${group.body.id}/members`)
        .set('Authorization', `Bearer ${alice.accessToken}`)
        .expect(200);

      expect(
        membersRes.body.find(
          (m: { userId: string }) => m.userId === bob.userId,
        ),
      ).toBeUndefined();
    });

    it('prevents removing the OWNER', async () => {
      const alice = await registerUser('alice@example.com', 'alice');
      const bob = await registerUser('bob@example.com', 'bob');

      const group = await request(app.getHttpServer())
        .post('/conversations/groups')
        .set('Authorization', `Bearer ${alice.accessToken}`)
        .send({ name: 'Duo', memberIds: [bob.userId] })
        .expect(201);

      await request(app.getHttpServer())
        .patch(`/conversations/${group.body.id}/members/${bob.userId}/role`)
        .set('Authorization', `Bearer ${alice.accessToken}`)
        .send({ role: 'ADMIN' })
        .expect(200);

      await request(app.getHttpServer())
        .delete(`/conversations/${group.body.id}/members/${alice.userId}`)
        .set('Authorization', `Bearer ${bob.accessToken}`)
        .expect(403);
    });

    it('only allows the OWNER to change roles', async () => {
      const alice = await registerUser('alice@example.com', 'alice');
      const bob = await registerUser('bob@example.com', 'bob');
      const carol = await registerUser('carol@example.com', 'carol');

      const group = await request(app.getHttpServer())
        .post('/conversations/groups')
        .set('Authorization', `Bearer ${alice.accessToken}`)
        .send({ name: 'Trio', memberIds: [bob.userId, carol.userId] })
        .expect(201);

      await request(app.getHttpServer())
        .patch(`/conversations/${group.body.id}/members/${carol.userId}/role`)
        .set('Authorization', `Bearer ${bob.accessToken}`)
        .send({ role: 'ADMIN' })
        .expect(403);
    });
  });

  describe('listing', () => {
    it('lists only conversations the user is an active member of', async () => {
      const alice = await registerUser('alice@example.com', 'alice');
      const bob = await registerUser('bob@example.com', 'bob');
      const carol = await registerUser('carol@example.com', 'carol');

      await request(app.getHttpServer())
        .post('/conversations/direct')
        .set('Authorization', `Bearer ${alice.accessToken}`)
        .send({ userId: bob.userId })
        .expect(201);

      await request(app.getHttpServer())
        .post('/conversations/direct')
        .set('Authorization', `Bearer ${bob.accessToken}`)
        .send({ userId: carol.userId })
        .expect(201);

      const aliceList = await request(app.getHttpServer())
        .get('/conversations')
        .set('Authorization', `Bearer ${alice.accessToken}`)
        .expect(200);

      expect(aliceList.body.items).toHaveLength(1);

      const bobList = await request(app.getHttpServer())
        .get('/conversations')
        .set('Authorization', `Bearer ${bob.accessToken}`)
        .expect(200);

      expect(bobList.body.items).toHaveLength(2);
    });

    it('rejects a limit above the bounded maximum', async () => {
      const alice = await registerUser('alice@example.com', 'alice');
      await request(app.getHttpServer())
        .get('/conversations?limit=99999')
        .set('Authorization', `Bearer ${alice.accessToken}`)
        .expect(400);
    });
  });

  describe('leaving a conversation', () => {
    it('lets a member leave and then blocks further access', async () => {
      const alice = await registerUser('alice@example.com', 'alice');
      const bob = await registerUser('bob@example.com', 'bob');

      const group = await request(app.getHttpServer())
        .post('/conversations/groups')
        .set('Authorization', `Bearer ${alice.accessToken}`)
        .send({ name: 'Duo', memberIds: [bob.userId] })
        .expect(201);

      await request(app.getHttpServer())
        .delete(`/conversations/${group.body.id}/members/me`)
        .set('Authorization', `Bearer ${bob.accessToken}`)
        .expect(204);

      await request(app.getHttpServer())
        .get(`/conversations/${group.body.id}`)
        .set('Authorization', `Bearer ${bob.accessToken}`)
        .expect(404);
    });
  });
});
