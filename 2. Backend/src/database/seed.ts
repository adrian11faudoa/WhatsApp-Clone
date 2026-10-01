/* eslint-disable no-console */
import 'dotenv/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as argon2 from 'argon2';
import * as schema from './schema';

/**
 * Deterministic local-development seed data: a handful of users, a direct
 * conversation, and a group conversation. Never used against production —
 * intended for `npm run db:seed` against a local/dev DATABASE_URL only.
 * No real credentials are seeded; the shared password below is a fixed,
 * clearly-labeled development-only value.
 */
const DEV_SEED_PASSWORD = 'dev-seed-password-only';

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('DATABASE_URL is not set. Aborting seed.');
    process.exit(1);
  }
  if (process.env.NODE_ENV === 'production') {
    console.error('Refusing to run the development seed in production.');
    process.exit(1);
  }

  const pool = new Pool({ connectionString });
  const db = drizzle(pool, { schema });

  const passwordHash = await argon2.hash(DEV_SEED_PASSWORD, {
    type: argon2.argon2id,
  });

  console.log('Seeding development data...');

  const [alice] = await db
    .insert(schema.users)
    .values({ email: 'alice@example.dev', passwordHash })
    .returning({ id: schema.users.id });
  await db.insert(schema.profiles).values({
    userId: alice.id,
    username: 'alice',
    displayName: 'Alice (seed)',
  });

  const [bob] = await db
    .insert(schema.users)
    .values({ email: 'bob@example.dev', passwordHash })
    .returning({ id: schema.users.id });
  await db.insert(schema.profiles).values({
    userId: bob.id,
    username: 'bob',
    displayName: 'Bob (seed)',
  });

  const [carol] = await db
    .insert(schema.users)
    .values({ email: 'carol@example.dev', passwordHash })
    .returning({ id: schema.users.id });
  await db.insert(schema.profiles).values({
    userId: carol.id,
    username: 'carol',
    displayName: 'Carol (seed)',
  });

  const [direct] = await db
    .insert(schema.conversations)
    .values({
      type: 'DIRECT',
      directKey: [alice.id, bob.id].sort().join(':'),
      createdById: alice.id,
    })
    .returning({ id: schema.conversations.id });
  await db.insert(schema.conversationMembers).values([
    { conversationId: direct.id, userId: alice.id, role: 'MEMBER' },
    { conversationId: direct.id, userId: bob.id, role: 'MEMBER' },
  ]);

  const [group] = await db
    .insert(schema.conversations)
    .values({ type: 'GROUP', createdById: alice.id })
    .returning({ id: schema.conversations.id });
  await db.insert(schema.groupProfiles).values({
    conversationId: group.id,
    name: 'Seed Group',
    description: 'A development-only seeded group conversation.',
  });
  await db.insert(schema.conversationMembers).values([
    { conversationId: group.id, userId: alice.id, role: 'OWNER' },
    { conversationId: group.id, userId: bob.id, role: 'MEMBER' },
    { conversationId: group.id, userId: carol.id, role: 'MEMBER' },
  ]);

  console.log(
    'Seed complete. Development accounts (password for all: "%s"):',
    DEV_SEED_PASSWORD,
  );
  console.log('  alice@example.dev / alice');
  console.log('  bob@example.dev / bob');
  console.log('  carol@example.dev / carol');

  await pool.end();
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
