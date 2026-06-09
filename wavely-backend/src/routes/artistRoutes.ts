import express from 'express';
import {
  getAllArtists,
  createArtist,
  getArtistDetails,
  deleteArtist
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