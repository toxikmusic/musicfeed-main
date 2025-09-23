
import { type ColumnType, type Generated } from 'kysely';

export interface DatabaseSchema {
  users: UsersTable;
  tracks: TracksTable;
}

export interface UsersTable {
  id: Generated<number>;
  username: string;
  password: string;
  created_at: ColumnType<Date, string | undefined, never>;
}

export interface TracksTable {
  id: Generated<number>;
  user_id: number;
  title: string;
  file_path: string;
  created_at: ColumnType<Date, string | undefined, never>;
}
