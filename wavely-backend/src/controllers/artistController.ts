import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { createAuditLog } from '../services/auditService';
import { pool } from '../db/db';
import { RowDataPacket } from 'mysql2';

interface Artist extends RowDataPacket {
  id: number;
  name: string;
  genre: string;
  country: string;
  bio: string;
}

interface Track extends RowDataPacket {
  id: number;
  title: string;
  artist_id: number;
}

interface ArtistName extends RowDataPacket {
  name: string;
}

interface FollowerCount extends RowDataPacket {
  followers: number;
}

export const getAllArtists = async (
  req: Request,
  res: Response
) => {
  try {

    const [rows] = await pool.query(
      'SELECT * FROM artists'
    );

    res.json(rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server error'
    });

  }
};

export const createArtist = async (
  req: AuthRequest,
  res: Response
) => {
  try {

    const {
      name,
      genre,
      country,
      bio
    } = req.body;

    if (!name || name.trim().length < 2) {
  return res.status(400).json({
    message: 'Artist name is invalid'
  });
}

    await pool.execute(
      `
      INSERT INTO artists
      (name, genre, country, bio)
      VALUES (?, ?, ?, ?)
      `,
      [name, genre, country, bio]
    );

    await createAuditLog(
      req.user!.id,
      `Created artist ${name}`
    );

    res.json({
      message: 'Artist created'
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server error'
    });

  }
};

export const updateArtist = async (
  req: AuthRequest,
  res: Response
) => {
  try {

    const artistId = Number(req.params.id);

    const {
      name,
      genre,
      country,
      bio
    } = req.body;

    await pool.execute(
      `
      UPDATE artists
      SET
        name = ?,
        genre = ?,
        country = ?,
        bio = ?
      WHERE id = ?
      `,
      [
        name,
        genre,
        country,
        bio,
        artistId
      ]
    );

    await createAuditLog(
      req.user!.id,
      `Updated artist ${name}`
    );

    res.json({
      message: 'Artist updated'
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server error'
    });

  }
};

export const deleteArtist = async (
  req: AuthRequest,
  res: Response
) => {
  try {

    const artistId = Number(req.params.id);

const [rows] =
  await pool.execute<ArtistName[]>(      `
      SELECT name
      FROM artists
      WHERE id = ?
      `,
      [artistId]
    );

    const artistName = rows[0]?.name;

    await pool.execute(
      `
      DELETE FROM artists
      WHERE id = ?
      `,
      [artistId]
    );

    await createAuditLog(
      req.user!.id,
      `Deleted artist ${artistName}`
    );

    res.json({
      message: 'Artist deleted'
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server error'
    });

  }
};

export const getArtistDetails = async (
  req: Request,
  res: Response
) => {
  try {

    const artistId = Number(req.params.id);

const [artistRows] =
  await pool.execute<Artist[]>(      `
      SELECT *
      FROM artists
      WHERE id = ?
      `,
      [artistId]
    );

    if (artistRows.length === 0) {
      return res.status(404).json({
        message: 'Artist not found'
      });
    }

const [trackRows] =
  await pool.execute<Track[]>(      `
      SELECT *
      FROM tracks
      WHERE artist_id = ?
      `,
      [artistId]
    );

const [followerRows] =
  await pool.execute<FollowerCount[]>(  `
  SELECT COUNT(*) AS followers
  FROM user_artists
  WHERE artist_id = ?
  `,
  [artistId]
);

res.json({
  artist: artistRows[0],
  tracks: trackRows,
followers: followerRows[0]?.followers ?? 0});

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server error'
    });

  }
};

