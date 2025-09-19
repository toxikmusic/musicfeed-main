
import { type Request, type Response } from 'express';
import { findPublicUserByUsername } from './users.service';

export async function getUserProfile(req: Request, res: Response): Promise<void> {
  const { username } = req.params;

  try {
    const user = await findPublicUserByUsername(username);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
