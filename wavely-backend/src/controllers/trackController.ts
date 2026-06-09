import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { createAuditLog } from '../services/auditService';
import { pool } from '../db/db';

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

    const [rows]: any = await pool.execute(
      `
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