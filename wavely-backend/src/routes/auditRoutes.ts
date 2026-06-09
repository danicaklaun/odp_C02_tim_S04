import express from 'express';

import { getAuditLogs } from '../controllers/auditControllers';

import { authMiddleware } from '../middleware/authMiddleware';
import { authorizeRole } from '../middleware/authorizeRole';

const router = express.Router();

router.get(
  '/',
  authMiddleware,
  authorizeRole('admin'),
  getAuditLogs
);

export default router;