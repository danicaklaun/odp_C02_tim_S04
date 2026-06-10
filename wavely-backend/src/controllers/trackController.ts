import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { createAuditLog } from '../services/auditService';
import { pool } from '../db/db';
import { RowDataPacket } from 'mysql2';

interface TrackDetails extends RowDataPacket {
  id: number;
  title: string;
  artist_id: number;
  duration_sec: number;
  album: string;
  release_year: number;
  artist_name: string;
  genre: string;
}

interface TrackTitle extends RowDataPacket {
  title: string;
}

export const getTracks = async (
  req: Request,
  res: Response
) => {
  try {

    const [rows] = await pool.execute(
      `
      SELECT *
      FROM tracks
      `
    );

    res.json(rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server error'
    });

  }
};

export const getTrackDetails = async (
  req: Request,
  res: Response
) => {
  try {

    const trackId = Number(req.params.id);

const [rows] =
  await pool.execute<TrackDetails[]>(      `
      SELECT
        tracks.*,
        artists.name AS artist_name,
        artists.genre
      FROM tracks
      JOIN artists
      ON artists.id = tracks.artist_id
      WHERE tracks.id = ?
      `,
      [trackId]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Track not found'
      });
    }

res.json(rows[0] ?? null);
  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server error'
    });

  }
};

export const createTrack = async (
  req: AuthRequest,
  res: Response
) => {
  try {

    const {
      title,
      artist_id,
      duration_sec,
      album,
      release_year
    } = req.body;

    if (!title || title.trim().length === 0) {
  return res.status(400).json({
    message: 'Track title is required'
  });
}

if (!duration_sec || duration_sec <= 0) {
  return res.status(400).json({
    message: 'Duration must be greater than 0'
  });
}

const currentYear = new Date().getFullYear();

if (
  !release_year ||
  release_year < 1900 ||
  release_year > currentYear
) {
  return res.status(400).json({
    message: 'Invalid release year'
  });
}

    await pool.execute(
      `
      INSERT INTO tracks
      (
        title,
        artist_id,
        duration_sec,
        album,
        release_year
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        title,
        artist_id,
        duration_sec,
        album,
        release_year
      ]
    );

    await createAuditLog(
      req.user!.id,
      `Created track ${title}`
    );

    res.json({
      message: 'Track created'
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server error'
    });

  }
};

export const deleteTrack = async (
  req: AuthRequest,
  res: Response
) => {
  try {

    const trackId = Number(req.params.id);

const [rows] =
  await pool.execute<TrackTitle[]>(      `
      SELECT title
      FROM tracks
      WHERE id = ?
      `,
      [trackId]
    );

    const trackTitle = rows[0]?.title;

    await pool.execute(
      `
      DELETE FROM tracks
      WHERE id = ?
      `,
      [trackId]
    );

    await createAuditLog(
      req.user!.id,
      `Deleted track ${trackTitle}`
    );

    res.json({
      message: 'Track deleted'
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server error'
    });

  }
};

export const updateTrack = async (
  req: AuthRequest,
  res: Response
) => {
  try {

    const trackId = Number(req.params.id);

    const {
      title,
      artist_id,
      duration_sec,
      album,
      release_year
    } = req.body;

    await pool.execute(
      `
      UPDATE tracks
      SET
        title = ?,
        artist_id = ?,
        duration_sec = ?,
        album = ?,
        release_year = ?
      WHERE id = ?
      `,
      [
        title,
        artist_id,
        duration_sec,
        album,
        release_year,
        trackId
      ]
    );

    await createAuditLog(
      req.user!.id,
      `Updated track ${title}`
    );

    res.json({
      message: 'Track updated'
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server error'
    });

  }
};