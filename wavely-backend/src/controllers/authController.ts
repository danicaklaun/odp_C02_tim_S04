import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../db/db';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const hashed = await bcrypt.hash(password, 10);

    await pool.execute(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, hashed]
    );

    res.status(201).json({ message: 'User created' });

  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const [rows]: any = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    const user = rows[0];

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.json({ token });

  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};