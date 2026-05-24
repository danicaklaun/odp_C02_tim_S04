import express from 'express';
import { authorizeRole } from '../middleware/authorizeRole';
import {
  authMiddleware,
  AuthRequest
} from '../middleware/authMiddleware';

const router = express.Router();

router.get(
  '/',
  authMiddleware,
  (req: AuthRequest, res) => {
    res.json({
      message: 'Protected route works',
      user: req.user
    });
  }
);

router.get(
  '/admin',
  authMiddleware,
  authorizeRole('admin'),
  (req: AuthRequest, res) => {
    res.json({
      message: 'Admin route works'
    });
  }
);

export default router;