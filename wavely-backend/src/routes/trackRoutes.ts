import express from 'express';
import {
  getTracks,
  getTrackDetails,
  createTrack,
  deleteTrack,
    updateTrack
} from '../controllers/trackController';

import { authMiddleware } from '../middleware/authMiddleware';
import { authorizeRole } from '../middleware/authorizeRole';
const router = express.Router();

router.get(
  '/',
  getTracks
);

router.post(
  '/',
  authMiddleware,
  authorizeRole('admin'),
  createTrack
);

router.delete(
  '/:id',
  authMiddleware,
  authorizeRole('admin'),
  deleteTrack
);

router.get(
  '/:id',
  getTrackDetails
);
router.put(
  '/:id',
  authMiddleware,
  authorizeRole('admin'),
  updateTrack
);

export default router;