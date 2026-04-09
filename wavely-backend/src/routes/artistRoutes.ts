import express from 'express';
import { getAllArtists } from '../controllers/artistController';

const router = express.Router();

router.get('/', getAllArtists);

export default router;