import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import artistRoutes from './routes/artistRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/artists', artistRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});