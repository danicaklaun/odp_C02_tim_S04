import { Request, Response } from 'express';
import { pool } from '../db/db';

export const getAuditLogs = async (
  req: Request,
  res: Response
) => {
  try {

    const [rows] = await pool.execute(`
      SELECT *
      FROM audits
      ORDER BY created_at DESC
    `);

    res.json(rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server error'
    });

  }
};