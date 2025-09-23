
import { db } from '../../db/database';
import { type TracksTable } from '../../db/schema';
import { type Insertable } from 'kysely';

export async function createTrack(track: Insertable<TracksTable>) {
  return await db
    .insertInto('tracks')
    .values(track)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function getTracks(limit = 50, offset = 0) {
  return await db
    .selectFrom('tracks')
    .innerJoin('users', 'users.id', 'tracks.user_id')
    .select([
      'tracks.id',
      'tracks.title',
      'tracks.file_path',
      'tracks.created_at',
      'users.username',
    ])
    .orderBy('tracks.created_at', 'desc')
    .limit(limit)
    .offset(offset)
    .execute();
}
