import express from 'express';

import {
  getFollowing,
  followArtist,
  unfollowArtist
} from '../controllers/followingControllers';

import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get(
  '/',
  authMiddleware,
  getFollowing
);

router.post(
  '/:artistId',
  authMiddleware,
  followArtist
);

router.delete(
  '/:artistId',
  authMiddleware,
  unfollowArtist
);

export default router;