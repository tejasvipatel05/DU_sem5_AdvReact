import express from 'express';

const router = express.Router();

// Mock services data
const mockServices = [
  {
    id: '1',
    name: 'Classic Haircut & Style',
    description: 'Professional haircut with wash, cut, and styling',
    category: 'hair',
    duration: 60,
    price: 85,
    image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800',
    isActive: true
  },
  {
    id: '2',
    name: 'Luxury Facial Treatment',
    description: 'Deep cleansing facial with premium skincare products',
    category: 'facial',
    duration: 90,
    price: 120,
    image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=800',
    isActive: true
  },
  {
    id: '3',
    name: 'Gel Manicure',
    description: 'Long-lasting gel manicure with nail art options',
    category: 'nails',
    duration: 45,
    price: 55,
    image: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=800',
    isActive: true
  },
  {
    id: '4',
    name: 'Relaxation Massage',
    description: 'Full body relaxation massage with aromatherapy',
    category: 'massage',
    duration: 75,
    price: 110,
    image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800',
    isActive: true
  },
  {
    id: '5',
    name: 'Bridal Makeup',
    description: 'Complete bridal makeup with trial session',
    category: 'makeup',
    duration: 120,
    price: 200,
    image: 'https://images.pexels.com/photos/29351977/pexels-photo-29351977.jpeg',
    isActive: true
  },
  {
    id: '6',
    name: 'Brazilian Wax',
    description: 'Professional waxing service with premium wax',
    category: 'waxing',
    duration: 30,
    price: 65,
    image: 'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=800',
    isActive: true
  }
];

// Get all services
router.get('/', (req, res) => {
  try {
    const { category } = req.query;
    let services = mockServices.filter(service => service.isActive);
    
    if (category) {
      services = services.filter(service => service.category === category);
    }
    
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get service by ID
router.get('/:id', (req, res) => {
  try {
    const service = mockServices.find(s => s.id === req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;