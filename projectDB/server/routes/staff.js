import express from 'express';

const router = express.Router();

// Mock staff data
const mockStaff = [
  {
    id: '2',
    name: 'Sarah Williams',
    email: 'sarah@luxebeauty.com',
    phone: '+1-555-0124',
    role: 'staff',
    specialties: ['hair', 'makeup'],
    bio: 'Senior stylist with 8 years of experience in hair cutting and color.',
    avatar: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    isAvailable: true
  },
  {
    id: '3',
    name: 'Maria Rodriguez',
    email: 'maria@luxebeauty.com',
    phone: '+1-555-0126',
    role: 'staff',
    specialties: ['facial', 'spa'],
    bio: 'Licensed esthetician specializing in skincare and facial treatments.',
    avatar: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    isAvailable: true
  },
  {
    id: '4',
    name: 'Jessica Chen',
    email: 'jessica@luxebeauty.com',
    phone: '+1-555-0127',
    role: 'staff',
    specialties: ['nails', 'waxing'],
    bio: 'Nail technician and waxing specialist with attention to detail.',
    avatar: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    isAvailable: true
  }
];

// Get all staff
router.get('/', (req, res) => {
  try {
    const { specialty } = req.query;
    let staff = mockStaff.filter(member => member.isAvailable);
    
    if (specialty) {
      staff = staff.filter(member => member.specialties.includes(specialty));
    }
    
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get staff by ID
router.get('/:id', (req, res) => {
  try {
    const staff = mockStaff.find(s => s.id === req.params.id);
    if (!staff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;