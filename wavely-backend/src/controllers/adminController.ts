import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import { pool } from '../db/db';

interface CountResult extends RowDataPacket {
  total: number;
}

export const getDashboardStats = async (
  req: Request,
  res: Response
) => {
  try {

   const [users] =
  await pool.execute<CountResult[]>(
    'SELECT COUNT(*) AS total FROM users'
  );

const [artists] =
  await pool.execute<CountResult[]>(
    'SELECT COUNT(*) AS total FROM artists'
  );

const [tracks] =
  await pool.execute<CountResult[]>(
    'SELECT COUNT(*) AS total FROM tracks'
  );

const [playlists] =
  await pool.execute<CountResult[]>(
    'SELECT COUNT(*) AS total FROM playlists'
  );

    const totalUsers = users[0]?.total ?? 0;
const totalArtists = artists[0]?.total ?? 0;
const totalTracks = tracks[0]?.total ?? 0;
const totalPlaylists = playlists[0]?.total ?? 0;

res.json({
  users: totalUsers,
  artists: totalArtists,
  tracks: totalTracks,
  playlists: totalPlaylists
});

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server error'
    });

  }
};