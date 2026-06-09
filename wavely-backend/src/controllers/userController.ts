import { Request, Response } from 'express';
import { pool } from '../db/db';

export const getAllUsers = async (
  req: Request,
  res: Response
) => {
  try {

    const [rows] = await pool.execute(`
      SELECT
        users.id,
        users.username,
        users.email,
        users.role,
        COUNT(user_tracks.track_id) AS saved_tracks
      FROM users
      LEFT JOIN user_tracks
      ON user_tracks.user_id = users.id
      GROUP BY
        users.id,
        users.username,
        users.email,
        users.role
      ORDER BY users.id
    `);

    res.json(rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server error'
    });

  }
};

export const updateRole = async (
  req: Request,
  res: Response
) => {
  try {

    const userId = Number(req.params.id);
    const { role } = req.body;

    await pool.execute(
      `
      UPDATE users
      SET role = ?
      WHERE id = ?
      `,
      [role, userId]
    );

    res.json({
      message: 'Role updated'
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server error'
    });

  }
};