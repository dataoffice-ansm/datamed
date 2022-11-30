import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import type { DB } from './schema.introspection';

export const dbInstance = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    }),
  }),
});
