
import { db } from '../../db/database';
import { type UsersTable } from '../../db/schema';
import { type Insertable } from 'kysely';

export async function createUser(user: Insertable<UsersTable>) {
  return await db
    .insertInto('users')
    .values(user)
    .returning(['id', 'username'])
    .executeTakeFirstOrThrow();
}

export async function findUserByUsername(username: string) {
  return await db
    .selectFrom('users')
    .selectAll()
    .where('username', '=', username)
    .executeTakeFirst();
}

export async function findPublicUserByUsername(username: string) {
  return await db
    .selectFrom('users')
    .select(['id', 'username', 'created_at'])
    .where('username', '=', username)
    .executeTakeFirst();
}
