import { Request, Response } from 'express';
import { pool } from '../db/db';

export const getAllUsers = async (
  req: Request,
  res: Response
) => {
  try {

    const [rows] = await pool.execute(`
      SELECT
        id,
        username,
        email,
        role
      FROM users
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