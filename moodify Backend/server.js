import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Middleware
const allowedOrigin = process.env.CLIENT_URL?.replace(/\/$/, ''); // Remove trailing slash

app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}));


// Routes
app.use('/api/auth', authRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('🎵 Moodify Backend is running!');
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection failed:', err.message);
});
