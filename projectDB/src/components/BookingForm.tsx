import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, MessageSquare } from 'lucide-react';
import { Service, User as StaffMember, BookingForm as BookingFormType } from '../types';
import { useAuth } from '../context/AuthContext';

interface BookingFormProps {
  onNavigate: (page: string) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [formData, setFormData] = useState<BookingFormType>({
    serviceId: '',
    staffId: '',
    date: '',
    time: '',
    notes: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  useEffect(() => {
    fetchServices();
    fetchStaff();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const fetchStaff = async () => {
    try {
      const response = await fetch('/api/staff');
      const data = await response.json();
      setStaff(data);
    } catch (error) {
      console.error('Error fetching staff:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setMessage('Please login to book an appointment');
      onNavigate('login');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const selectedService = services.find(s => s.id === formData.serviceId);
      const endTime = calculateEndTime(formData.time, selectedService?.duration || 60);

      const appointmentData = {
        clientId: user.id,
        staffId: formData.staffId,
        serviceId: formData.serviceId,
        date: formData.date,
        startTime: formData.time,
        endTime: endTime,
        notes: formData.notes
      };

      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(appointmentData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Appointment booked successfully!');
        setFormData({
          serviceId: '',
          staffId: '',
          date: '',
          time: '',
          notes: ''
        });
        setTimeout(() => {
          onNavigate('appointments');
        }, 2000);
      } else {
        setMessage(data.message || 'Failed to book appointment');
      }
    } catch (error) {
      setMessage('Error booking appointment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateEndTime = (startTime: string, duration: number): string => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes, 0, 0);
    
    const endDate = new Date(startDate.getTime() + duration * 60000);
    return `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;
  };

  const selectedService = services.find(s => s.id === formData.serviceId);
  const filteredStaff = formData.serviceId 
    ? staff.filter(member => member.specialties?.includes(selectedService?.category || ''))
    : staff;

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Book Your Appointment
          </h2>
          <p className="text-xl text-gray-600">
            Choose your preferred service, stylist, and time slot
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            {message && (
              <div className={`mb-6 p-4 rounded-lg ${
                message.includes('successfully') 
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Service Selection */}
              <div>
                <label className="flex items-center space-x-2 text-lg font-semibold text-gray-900 mb-4">
                  <User className="h-5 w-5 text-pink-600" />
                  <span>Select Service</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                        formData.serviceId === service.id
                          ? 'border-pink-500 bg-pink-50'
                          : 'border-gray-200 hover:border-pink-300'
                      }`}
                      onClick={() => setFormData({ ...formData, serviceId: service.id, staffId: '' })}
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{service.name}</h3>
                          <p className="text-sm text-gray-600">{service.duration} min</p>
                          <p className="text-lg font-bold text-pink-600">${service.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Staff Selection */}
              {formData.serviceId && (
                <div>
                  <label className="flex items-center space-x-2 text-lg font-semibold text-gray-900 mb-4">
                    <User className="h-5 w-5 text-pink-600" />
                    <span>Choose Your Stylist</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredStaff.map((member) => (
                      <div
                        key={member.id}
                        className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                          formData.staffId === member.id
                            ? 'border-pink-500 bg-pink-50'
                            : 'border-gray-200 hover:border-pink-300'
                        }`}
                        onClick={() => setFormData({ ...formData, staffId: member.id })}
                      >
                        <div className="text-center">
                          <img
                            src={member.avatar || 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=400'}
                            alt={member.name}
                            className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                          />
                          <h3 className="font-semibold text-gray-900">{member.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{member.specialties?.join(', ')}</p>
                          <div className="flex items-center justify-center space-x-1">
                            <span className="text-yellow-400">★</span>
                            <span className="text-sm text-gray-600">{member.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Date and Time Selection */}
              {formData.staffId && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="flex items-center space-x-2 text-lg font-semibold text-gray-900 mb-4">
                      <Calendar className="h-5 w-5 text-pink-600" />
                      <span>Select Date</span>
                    </label>
                    <input
                      type="date"
                      min={minDate}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="flex items-center space-x-2 text-lg font-semibold text-gray-900 mb-4">
                      <Clock className="h-5 w-5 text-pink-600" />
                      <span>Select Time</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setFormData({ ...formData, time })}
                          className={`p-3 text-sm font-medium rounded-lg transition-all ${
                            formData.time === time
                              ? 'bg-pink-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-pink-100'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Notes */}
              {formData.time && (
                <div>
                  <label className="flex items-center space-x-2 text-lg font-semibold text-gray-900 mb-4">
                    <MessageSquare className="h-5 w-5 text-pink-600" />
                    <span>Additional Notes (Optional)</span>
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Any special requests or preferences..."
                    rows={4}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                  />
                </div>
              )}

              {/* Submit Button */}
              {formData.time && (
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-12 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                  >
                    {isLoading ? 'Booking...' : 'Confirm Appointment'}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};