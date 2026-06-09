import { Request, Response } from 'express';
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