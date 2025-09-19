
import { type ColumnType, type Generated } from 'kysely';

export interface DatabaseSchema {
  users: UsersTable;
}

export interface UsersTable {
  id: Generated<number>;
  username: string;
  password: string;
  created_at: ColumnType<Date, string | undefined, never>;
}
