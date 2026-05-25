import express from 'express';

import {
  getLibrary,
  saveTrack,
  removeTrack
} from '../controllers/libraryControllers';

import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get(
  '/',
  authMiddleware,
  getLibrary
);

router.post(
  '/:trackId',
  authMiddleware,
  saveTrack
);

router.delete(
  '/:trackId',
  authMiddleware,
  removeTrack
);

export default router;