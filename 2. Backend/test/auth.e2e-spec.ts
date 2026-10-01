import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { DATABASE_POOL } from '../src/database/database.module';
import { Pool } from 'pg';
import { truncateAll } from './db-test-helper';

describe('Auth (e2e)', () => {
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

  const validRegisterBody = {
    email: 'alice@example.com',
    password: 'correct-horse-battery',
    username: 'alice',
    displayName: 'Alice A',
  };

  describe('POST /auth/register', () => {
    it('creates an account and returns tokens', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/register')
        .send(validRegisterBody)
        .expect(201);

      expect(res.body.user.email).toBe('alice@example.com');
      expect(res.body.user.username).toBe('alice');
      expect(res.body.tokens.accessToken).toEqual(expect.any(String));
      expect(res.body.tokens.refreshToken).toEqual(expect.any(String));
      expect(res.body.sessionId).toEqual(expect.any(String));
    });

    it('rejects a password shorter than 12 characters', async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send({ ...validRegisterBody, password: 'short' })
        .expect(400);
    });

    it('rejects a duplicate email', async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send(validRegisterBody)
        .expect(201);

      const res = await request(app.getHttpServer())
        .post('/auth/register')
        .send({ ...validRegisterBody, username: 'alice2' })
        .expect(409);

      expect(res.body.error.code).toBe('EMAIL_ALREADY_REGISTERED');
    });

    it('rejects a duplicate username', async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send(validRegisterBody)
        .expect(201);

      const res = await request(app.getHttpServer())
        .post('/auth/register')
        .send({ ...validRegisterBody, email: 'alice2@example.com' })
        .expect(409);

      expect(res.body.error.code).toBe('USERNAME_ALREADY_TAKEN');
    });

    it('never returns a password hash in the response body', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/register')
        .send(validRegisterBody)
        .expect(201);

      expect(JSON.stringify(res.body)).not.toMatch(/passwordHash/i);
      expect(JSON.stringify(res.body)).not.toMatch(/\$argon2/);
    });
  });

  describe('POST /auth/login', () => {
    beforeEach(async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send(validRegisterBody)
        .expect(201);
    });

    it('logs in with correct credentials', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'alice@example.com', password: 'correct-horse-battery' })
        .expect(200);

      expect(res.body.tokens.accessToken).toEqual(expect.any(String));
    });

    it('rejects an incorrect password with INVALID_CREDENTIALS', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'alice@example.com',
          password: 'totally-wrong-password',
        })
        .expect(401);

      expect(res.body.error.code).toBe('INVALID_CREDENTIALS');
    });

    it('rejects an unknown email with the same error code as a wrong password', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'nobody@example.com', password: 'whatever-password' })
        .expect(401);

      expect(res.body.error.code).toBe('INVALID_CREDENTIALS');
    });
  });

  describe('token refresh + logout', () => {
    it('rotates the refresh token and invalidates the old one', async () => {
      const registerRes = await request(app.getHttpServer())
        .post('/auth/register')
        .send(validRegisterBody)
        .expect(201);

      const originalRefreshToken = registerRes.body.tokens.refreshToken;

      const refreshRes = await request(app.getHttpServer())
        .post('/auth/refresh')
        .send({ refreshToken: originalRefreshToken })
        .expect(200);

      expect(refreshRes.body.tokens.refreshToken).not.toEqual(
        originalRefreshToken,
      );

      // The old refresh token must no longer work (rotation).
      await request(app.getHttpServer())
        .post('/auth/refresh')
        .send({ refreshToken: originalRefreshToken })
        .expect(401);
    });

    it('rejects a garbage refresh token', async () => {
      await request(app.getHttpServer())
        .post('/auth/refresh')
        .send({ refreshToken: 'not-a-real-token' })
        .expect(401);
    });

    it('revokes the session on logout so its access token stops working', async () => {
      const registerRes = await request(app.getHttpServer())
        .post('/auth/register')
        .send(validRegisterBody)
        .expect(201);

      const { accessToken } = registerRes.body.tokens;

      await request(app.getHttpServer())
        .get('/users/me')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      await request(app.getHttpServer())
        .post('/auth/logout')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({})
        .expect(204);

      await request(app.getHttpServer())
        .get('/users/me')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(401);
    });
  });

  describe('protected routes', () => {
    it('rejects requests with no Authorization header', async () => {
      await request(app.getHttpServer()).get('/users/me').expect(401);
    });

    it('rejects requests with a malformed bearer token', async () => {
      await request(app.getHttpServer())
        .get('/users/me')
        .set('Authorization', 'Bearer not-a-jwt')
        .expect(401);
    });
  });
});
