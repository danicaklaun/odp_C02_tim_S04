import express from 'express';
import { getTracks } from '../controllers/trackController';

const router = express.Router();

router.get(
  '/',
  getTracks
);

export default router;