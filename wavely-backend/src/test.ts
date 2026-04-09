import { pool } from './db/db';

const test = async () => {
  const [rows] = await pool.query('SELECT 1');
  console.log(rows);
};

test();