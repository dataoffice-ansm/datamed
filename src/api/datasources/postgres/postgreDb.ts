import { Pool } from 'pg';
import type { DB } from 'api/datasources/postgres/schema.introspection';
import { Kysely, PostgresDialect } from 'kysely';

export const dbInstance = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    }),
  }),
});
