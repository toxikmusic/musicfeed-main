
import { type Response } from 'express';
import { createTrack, getTracks } from './tracks.service';
import { type AuthenticatedRequest } from '../../middleware/auth.middleware';

export async function uploadTrack(
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> {
  const { title } = req.body;
  const user = req.user;

  if (!title || !req.file || !user) {
    res.status(400).json({ message: 'Title and audio file are required' });
    return;
  }

  try {
    const newTrack = await createTrack({
      user_id: user.id,
      title,
      file_path: `/uploads/tracks/${req.file.filename}`,
    });

    res.status(201).json({
      ...newTrack,
      username: user.username,
    });
  } catch (error) {
    console.error('Error uploading track:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function getTrackFeed(
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> {
  try {
    const tracks = await getTracks();
    res.status(200).json(tracks);
  } catch (error) {
    console.error('Error fetching track feed:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
