import { Pool } from 'pg';

/**
 * Truncates all application tables between tests so each test starts from
 * a clean slate while reusing one connection pool for the whole suite
 * (faster than reconnecting per test).
 */
export async function truncateAll(pool: Pool): Promise<void> {
  await pool.query(`
    TRUNCATE TABLE
      audit_events,
      conversation_members,
      group_profiles,
      conversations,
      sessions,
      devices,
      profiles,
      users
    RESTART IDENTITY CASCADE
  `);
}
