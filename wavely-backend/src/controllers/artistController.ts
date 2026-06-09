import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { createAuditLog } from '../services/auditService';
import { pool } from '../db/db';

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

    const [rows]: any = await pool.execute(
      `
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

    const [artistRows]: any = await pool.execute(
      `
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

    const [trackRows]: any = await pool.execute(
      `
      SELECT *
      FROM tracks
      WHERE artist_id = ?
      `,
      [artistId]
    );

    const [followerRows]: any = await pool.execute(
  `
  SELECT COUNT(*) AS followers
  FROM user_artists
  WHERE artist_id = ?
  `,
  [artistId]
);

res.json({
  artist: artistRows[0],
  tracks: trackRows,
  followers: followerRows[0].followers
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