import express from 'express';

const router = express.Router();

// Mock clients data
const mockClients = [
  {
    id: '1',
    name: 'Emma Johnson',
    email: 'emma@example.com',
    phone: '+1-555-0123',
    totalVisits: 12,
    totalSpent: 1240,
    lastVisit: '2024-01-15',
    preferences: {
      notifications: true,
      newsletter: true
    }
  }
];

// Get all clients
router.get('/', (req, res) => {
  try {
    res.json(mockClients);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get client by ID
router.get('/:id', (req, res) => {
  try {
    const client = mockClients.find(c => c.id === req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;