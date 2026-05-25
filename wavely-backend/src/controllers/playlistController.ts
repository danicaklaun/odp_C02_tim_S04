import { Response } from 'express';
import { pool } from '../db/db';
import { AuthRequest } from '../middleware/authMiddleware';

export const getPlaylists = async (
  req: AuthRequest,
  res: Response
) => {
  try {

    const [rows] = await pool.execute(
      `
      SELECT *
      FROM playlists
      WHERE user_id = ?
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

export const createPlaylist = async (
  req: AuthRequest,
  res: Response
) => {
  try {

    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        message: 'Playlist name required'
      });
    }

    await pool.execute(
      `
      INSERT INTO playlists
      (user_id, name, description)
      VALUES (?, ?, ?)
      `,
      [
        req.user!.id,
        name,
        description || null
      ]
    );

    res.json({
      message: 'Playlist created'
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server error'
    });
  }
};

export const deletePlaylist = async (
  req: AuthRequest,
  res: Response
) => {
  try {

    const playlistId = Number(req.params.id);

    await pool.execute(
      `
      DELETE FROM playlists
      WHERE id = ?
      AND user_id = ?
      `,
      [playlistId, req.user!.id]
    );

    res.json({
      message: 'Playlist deleted'
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server error'
    });
  }
};

export const addTrackToPlaylist = async (
  req: AuthRequest,
  res: Response
) => {
  try {

    const playlistId = Number(req.params.id);
    const { trackId } = req.body;

    const [libraryRows]: any = await pool.execute(
      `
      SELECT *
      FROM user_tracks
      WHERE user_id = ?
      AND track_id = ?
      `,
      [req.user!.id, trackId]
    );

    if (libraryRows.length === 0) {
      return res.status(400).json({
        message: 'Track not in library'
      });
    }

    const [existingRows]: any = await pool.execute(
      `
      SELECT *
      FROM playlist_tracks
      WHERE playlist_id = ?
      AND track_id = ?
      `,
      [playlistId, trackId]
    );

    if (existingRows.length > 0) {
      return res.status(400).json({
        message: 'Track already exists'
      });
    }

    const [countRows]: any = await pool.execute(
      `
      SELECT COUNT(*) as total
      FROM playlist_tracks
      WHERE playlist_id = ?
      `,
      [playlistId]
    );

    const position = countRows[0].total + 1;

    await pool.execute(
      `
      INSERT INTO playlist_tracks
      (playlist_id, track_id, position)
      VALUES (?, ?, ?)
      `,
      [playlistId, trackId, position]
    );

    res.json({
      message: 'Track added to playlist'
    });

  } catch (error) {

  console.log(error);

  res.status(500).json({
    message: 'Server error'
  });
}
};

export const getPlaylistDetails = async (
  req: AuthRequest,
  res: Response
) => {
  try {

    const playlistId = Number(req.params.id);

    const [rows] = await pool.execute(
      `
      SELECT
        tracks.*,
        playlist_tracks.position
      FROM playlist_tracks
      JOIN tracks
      ON tracks.id = playlist_tracks.track_id
      WHERE playlist_tracks.playlist_id = ?
      ORDER BY playlist_tracks.position ASC
      `,
      [playlistId]
    );

    res.json(rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server error'
    });
  }
};

export const removeTrackFromPlaylist = async (
  req: AuthRequest,
  res: Response
) => {
  try {

    const playlistId = Number(req.params.id);
    const trackId = Number(req.params.trackId);

    await pool.execute(
      `
      DELETE FROM playlist_tracks
      WHERE playlist_id = ?
      AND track_id = ?
      `,
      [playlistId, trackId]
    );

    res.json({
      message: 'Track removed from playlist'
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server error'
    });
  }
};