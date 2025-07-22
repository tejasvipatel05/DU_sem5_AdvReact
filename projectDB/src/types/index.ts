export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'client' | 'staff' | 'admin';
  avatar?: string;
  specialties?: string[];
  bio?: string;
  rating?: number;
  isAvailable?: boolean;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: 'hair' | 'nails' | 'facial' | 'massage' | 'waxing' | 'makeup' | 'spa';
  duration: number;
  price: number;
  image: string;
  isActive: boolean;
}

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  staffId: string;
  staffName: string;
  serviceId: string;
  serviceName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
  totalPrice: number;
  notes?: string;
  createdAt?: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export interface BookingForm {
  serviceId: string;
  staffId: string;
  date: string;
  time: string;
  notes?: string;
}