import express from 'express';
import {
  getAllArtists,
  createArtist,
  getArtistDetails,
  deleteArtist,
  updateArtist,
  updateTrack
} from '../controllers/artistController';import { authMiddleware } from '../middleware/authMiddleware';
import { authorizeRole } from '../middleware/authorizeRole';

const router = express.Router();

router.get(
  '/',
  getAllArtists
);
router.post(
  '/',
  authMiddleware,
  authorizeRole('admin'),
  createArtist
);

router.delete(
  '/:id',
  authMiddleware,
  authorizeRole('admin'),
  deleteArtist
);

router.get(
  '/:id',
  getArtistDetails
);
export default router;

router.put(
  '/:id',
  authMiddleware,
  authorizeRole('admin'),
  updateArtist
);
router.put(
  '/:id',
  authMiddleware,
  authorizeRole('admin'),
  updateTrack
);