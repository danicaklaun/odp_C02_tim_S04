import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { authorizeRole } from '../middleware/authorizeRole';
import { getDashboardStats } from '../controllers/adminController';

const router = express.Router();

router.get(
  '/stats',
  authMiddleware,
  authorizeRole('admin'),
  getDashboardStats
);

export default router;