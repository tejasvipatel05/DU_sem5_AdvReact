import express from 'express';

const router = express.Router();

// Mock appointments data
let mockAppointments = [
  {
    id: '1',
    clientId: '1',
    clientName: 'Emma Johnson',
    staffId: '2',
    staffName: 'Sarah Williams',
    serviceId: '1',
    serviceName: 'Classic Haircut & Style',
    date: '2024-01-20',
    startTime: '10:00',
    endTime: '11:00',
    status: 'confirmed',
    totalPrice: 85,
    notes: 'First time client, prefers shorter length'
  },
  {
    id: '2',
    clientId: '1',
    clientName: 'Emma Johnson',
    staffId: '2',
    staffName: 'Sarah Williams',
    serviceId: '2',
    serviceName: 'Luxury Facial Treatment',
    date: '2024-01-22',
    startTime: '14:00',
    endTime: '15:30',
    status: 'scheduled',
    totalPrice: 120,
    notes: 'Sensitive skin, avoid harsh products'
  }
];

// Get all appointments
router.get('/', (req, res) => {
  try {
    const { clientId, staffId, date, status } = req.query;
    let appointments = [...mockAppointments];
    
    if (clientId) {
      appointments = appointments.filter(apt => apt.clientId === clientId);
    }
    
    if (staffId) {
      appointments = appointments.filter(apt => apt.staffId === staffId);
    }
    
    if (date) {
      appointments = appointments.filter(apt => apt.date === date);
    }
    
    if (status) {
      appointments = appointments.filter(apt => apt.status === status);
    }
    
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new appointment
router.post('/', (req, res) => {
  try {
    const { clientId, staffId, serviceId, date, startTime, endTime, notes } = req.body;
    
    const newAppointment = {
      id: String(mockAppointments.length + 1),
      clientId,
      clientName: 'Client Name', // In real app, fetch from user
      staffId,
      staffName: 'Staff Name', // In real app, fetch from user
      serviceId,
      serviceName: 'Service Name', // In real app, fetch from service
      date,
      startTime,
      endTime,
      status: 'scheduled',
      totalPrice: 100, // In real app, fetch from service
      notes: notes || '',
      createdAt: new Date()
    };
    
    mockAppointments.push(newAppointment);
    
    res.status(201).json({
      message: 'Appointment created successfully',
      appointment: newAppointment
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update appointment
router.put('/:id', (req, res) => {
  try {
    const appointmentIndex = mockAppointments.findIndex(apt => apt.id === req.params.id);
    
    if (appointmentIndex === -1) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    mockAppointments[appointmentIndex] = {
      ...mockAppointments[appointmentIndex],
      ...req.body,
      updatedAt: new Date()
    };
    
    res.json({
      message: 'Appointment updated successfully',
      appointment: mockAppointments[appointmentIndex]
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete appointment
router.delete('/:id', (req, res) => {
  try {
    const appointmentIndex = mockAppointments.findIndex(apt => apt.id === req.params.id);
    
    if (appointmentIndex === -1) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    mockAppointments.splice(appointmentIndex, 1);
    
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;