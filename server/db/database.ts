
import { Kysely, SqliteDialect } from 'kysely';
import Database from 'better-sqlite3';
import { type DatabaseSchema } from './schema';
import path from 'path';
import fs from 'fs';

const dbDir = process.env.DATA_DIRECTORY || path.join(process.cwd(), 'data');

// Ensure the data directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
  console.log(`Created database directory at: ${dbDir}`);
}

const dbPath = path.join(dbDir, 'database.sqlite');

const sqliteDb = new Database(dbPath);
console.log(`Database connected at: ${dbPath}`);

export const db = new Kysely<DatabaseSchema>({
  dialect: new SqliteDialect({
    database: sqliteDb,
  }),
  log: ['query', 'error'],
});
