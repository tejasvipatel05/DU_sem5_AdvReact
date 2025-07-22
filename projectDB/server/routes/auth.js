import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Mock data for development
const mockUsers = [
  {
    id: '1',
    name: 'Emma Johnson',
    email: 'emma@example.com',
    password: 'password123',
    phone: '+1-555-0123',
    role: 'client'
  },
  {
    id: '2',
    name: 'Sarah Williams',
    email: 'sarah@luxebeauty.com',
    password: 'staff123',
    phone: '+1-555-0124',
    role: 'staff'
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@luxebeauty.com',
    password: 'admin123',
    phone: '+1-555-0125',
    role: 'admin'
  }
];

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, role = 'client' } = req.body;

    // Check if user exists in mock data
    const existingUser = mockUsers.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = {
      id: String(mockUsers.length + 1),
      name,
      email,
      password,
      phone,
      role,
      createdAt: new Date()
    };

    mockUsers.push(newUser);

    const token = jwt.sign(
      { userId: newUser.id, role: newUser.role },
      process.env.JWT_SECRET || 'luxe-beauty-secret',
      { expiresIn: '7d' }
    );

    console.log("token------------------------------",token);
    

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user in mock data
    const user = mockUsers.find(user => user.email === email);
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'luxe-beauty-secret',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;