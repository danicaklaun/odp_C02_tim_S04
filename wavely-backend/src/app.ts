import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import artistRoutes from './routes/artistRoutes';
import testRoutes from './routes/testRoutes';
import followingRoutes from './routes/followingRoutes';
import libraryRoutes from './routes/libraryRoutes';
import playlistRoutes from './routes/playlistRoutes';
import trackRoutes from './routes/trackRoutes';
import auditRoutes from './routes/auditRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/test', testRoutes);
app.use('/api/following', followingRoutes);
app.use('/api/library', libraryRoutes);
app.use('/api/playlists', playlistRoutes);
app.use(
  '/api/tracks',
  trackRoutes
);
app.use(
  '/api/audits',
  auditRoutes
);
app.use(
  '/api/users',
  userRoutes
);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});