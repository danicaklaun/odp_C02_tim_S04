import { Request, Response } from 'express';
import { pool } from '../db/db';

export const getAllArtists = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM artists');
    res.json(rows);
  } catch (err) {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
}
};