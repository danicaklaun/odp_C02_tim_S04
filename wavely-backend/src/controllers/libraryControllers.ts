import { Response } from 'express';
import { pool } from '../db/db';
import { AuthRequest } from '../middleware/authMiddleware';

export const getLibrary = async (
  req: AuthRequest,
  res: Response
) => {
  try {

    const [rows] = await pool.execute(
      `
      SELECT tracks.*, user_tracks.saved_at
      FROM user_tracks
      JOIN tracks
      ON tracks.id = user_tracks.track_id
      WHERE user_tracks.user_id = ?
      ORDER BY user_tracks.saved_at DESC
      `,
      [req.user!.id]
    );

    res.json(rows);

 } catch (error) {

  console.log(error);

  res.status(500).json({
    message: 'Server error'
  });
}
};

export const saveTrack = async (
  req: AuthRequest,
  res: Response
) => {
  try {

    const trackId = Number(req.params.trackId);

    await pool.execute(
      `
      INSERT INTO user_tracks (user_id, track_id)
      VALUES (?, ?)
      `,
      [req.user!.id, trackId]
    );

    res.json({
      message: 'Track saved'
    });

  } catch (error) {

  console.log(error);

  res.status(500).json({
    message: 'Server error'
  });
}
};

export const removeTrack = async (
  req: AuthRequest,
  res: Response
) => {
  try {

    const trackId = Number(req.params.trackId);

    await pool.execute(
      `
      DELETE FROM user_tracks
      WHERE user_id = ?
      AND track_id = ?
      `,
      [req.user!.id, trackId]
    );

    res.json({
      message: 'Track removed'
    });

  } catch (error) {

  console.log(error);

  res.status(500).json({
    message: 'Server error'
  });
}
};