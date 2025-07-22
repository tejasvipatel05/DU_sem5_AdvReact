import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import appointmentRoutes from './routes/appointments.js';
import serviceRoutes from './routes/services.js';
import staffRoutes from './routes/staff.js';
import clientRoutes from './routes/clients.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const connectDB = async () => {
  try {
    // Use a local MongoDB connection for development
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/luxe-beauty-salon';
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Don't exit process, continue with mock data
  }
};

connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/clients', clientRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});