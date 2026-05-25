import express from 'express';

import {
  getPlaylists,
  createPlaylist,
  deletePlaylist,
  addTrackToPlaylist,
  getPlaylistDetails,
  removeTrackFromPlaylist
} from '../controllers/playlistController';

import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get(
  '/',
  authMiddleware,
  getPlaylists
);

router.get(
  '/:id',
  authMiddleware,
  getPlaylistDetails
);

router.post(
  '/',
  authMiddleware,
  createPlaylist
);

router.post(
  '/:id/tracks',
  authMiddleware,
  addTrackToPlaylist
);

router.delete(
  '/:id/tracks/:trackId',
  authMiddleware,
  removeTrackFromPlaylist
);

router.delete(
  '/:id',
  authMiddleware,
  deletePlaylist
);

export default router;