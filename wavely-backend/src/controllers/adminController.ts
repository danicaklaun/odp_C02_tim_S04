import { Request, Response } from 'express';
import { pool } from '../db/db';

export const getDashboardStats = async (
  req: Request,
  res: Response
) => {
  try {

    const [users]: any = await pool.execute(
      'SELECT COUNT(*) AS total FROM users'
    );

    const [artists]: any = await pool.execute(
      'SELECT COUNT(*) AS total FROM artists'
    );

    const [tracks]: any = await pool.execute(
      'SELECT COUNT(*) AS total FROM tracks'
    );

    const [playlists]: any = await pool.execute(
      'SELECT COUNT(*) AS total FROM playlists'
    );

    res.json({
      users: users[0].total,
      artists: artists[0].total,
      tracks: tracks[0].total,
      playlists: playlists[0].total
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server error'
    });

  }
};