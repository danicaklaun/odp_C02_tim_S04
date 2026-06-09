import express from 'express';

import {
  getAllUsers,
  updateRole
} from '../controllers/userController';

import { authMiddleware } from '../middleware/authMiddleware';
import { authorizeRole } from '../middleware/authorizeRole';

const router = express.Router();

router.get(
  '/all',
  authMiddleware,
  authorizeRole('admin'),
  getAllUsers
);

router.put(
  '/:id/role',
  authMiddleware,
  authorizeRole('admin'),
  updateRole
);

export default router;