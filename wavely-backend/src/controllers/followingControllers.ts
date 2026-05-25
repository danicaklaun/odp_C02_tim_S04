import { Response } from 'express';
import { pool } from '../db/db';
import { AuthRequest } from '../middleware/authMiddleware';

export const getFollowing = async (
  req: AuthRequest,
  res: Response
) => {
  try {

    const [rows] = await pool.execute(
      `
      SELECT artists.*
      FROM user_artists
      JOIN artists
      ON artists.id = user_artists.artist_id
      WHERE user_artists.user_id = ?
      `,
      [req.user!.id]
    );

    res.json(rows);

  } catch {
    res.status(500).json({
      message: 'Server error'
    });
  }
};

export const followArtist = async (
  req: AuthRequest,
  res: Response
) => {
  try {

const artistId = Number(req.params.artistId);
    await pool.execute(
      `
      INSERT INTO user_artists (user_id, artist_id)
      VALUES (?, ?)
      `,
      [req.user!.id, artistId]
    );

    res.json({
      message: 'Artist followed'
    });

  } catch {
    res.status(500).json({
      message: 'Server error'
    });
  }
};

export const unfollowArtist = async (
  req: AuthRequest,
  res: Response
) => {
  try {

const artistId = Number(req.params.artistId);
    await pool.execute(
      `
      DELETE FROM user_artists
      WHERE user_id = ?
      AND artist_id = ?
      `,
      [req.user!.id, artistId]
    );

    res.json({
      message: 'Artist unfollowed'
    });

  } catch {
    res.status(500).json({
      message: 'Server error'
    });
  }
};