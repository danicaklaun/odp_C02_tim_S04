import { pool } from '../db/db';

export const createAuditLog = async (
  userId: number,
  action: string
) => {

  await pool.execute(
    `
    INSERT INTO audits (user_id, action)
    VALUES (?, ?)
    `,
    [userId, action]
  );
};