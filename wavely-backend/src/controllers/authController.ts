import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../db/db';

export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      username,
      email,
      password
    } = req.body;

    // VALIDACIJA
    if (!username || !email || !password) {
      return res.status(400).json({
        message: 'All fields are required'
      });
    }

    // PROVERA DA LI KORISNIK POSTOJI
    const [existing] = await pool.execute(
      'SELECT id FROM users WHERE email = ? OR username = ?',
      [email, username]
    );

    const existingUsers = existing as { id: number }[];

    if (existingUsers.length > 0) {
      return res.status(400).json({
        message: 'User already exists'
      });
    }

if (
  !/^[a-zA-Z0-9-]{3,40}$/.test(username)
) {
  return res.status(400).json({
    message: 'Korisničko ime nije validno'
  });
}

if (
  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
) {
  return res.status(400).json({
    message: 'Email nije validan'
  });
}

if (
  !/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)
) {
  return res.status(400).json({
    message: 'Lozinka ne ispunjava uslove'
  });
}

    // HASH LOZINKE
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // INSERT USER
    await pool.execute(
      `INSERT INTO users 
      (username, email, password_hash, role)
      VALUES (?, ?, ?, ?)`,
      [
        username,
        email,
        hashedPassword,
        'listener'
      ]
    );

    res.status(201).json({
      message: 'User created'
    });

  } catch {
    res.status(500).json({
      message: 'Server error'
    });
  }
};

export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      email,
      password
    } = req.body;

    // PRONALAZENJE USERA
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    const users = rows as {
      id: number;
      username: string;
      email: string;
      password_hash: string;
      role: string;
    }[];

    const user = users[0];

    // PROVERA USERA
    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }

    // PROVERA PASSWORDA
    const match = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!match) {
      return res.status(401).json({
        message: 'Invalid credentials'
      });
    }

    // JWT TOKEN
    const token = jwt.sign(
      {
        user_id: user.id,
        username: user.username,
        role: user.role
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1h'
      }
    );

    res.json({
  token,
  role: user.role,
  username: user.username
});

  } catch {
    res.status(500).json({
      message: 'Server error'
    });
  }
};