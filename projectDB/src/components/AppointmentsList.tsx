import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, MapPin, Phone, X, CheckCircle } from 'lucide-react';
import { Appointment } from '../types';
import { useAuth } from '../context/AuthContext';

interface AppointmentsListProps {
  onNavigate: (page: string) => void;
}

export const AppointmentsList: React.FC<AppointmentsListProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      fetchAppointments();
    }
  }, [user]);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(`/api/appointments?clientId=${user?.id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      const response = await fetch(`/api/appointments/${appointmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: 'cancelled' })
      });

      if (response.ok) {
        setMessage('Appointment cancelled successfully');
        fetchAppointments();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('Error cancelling appointment');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!user) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Please Login
          </h2>
          <p className="text-gray-600 mb-8">
            You need to be logged in to view your appointments.
          </p>
          <button
            onClick={() => onNavigate('login')}
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all"
          >
            Login Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            My Appointments
          </h2>
          <p className="text-xl text-gray-600">
            Manage your upcoming and past appointments
          </p>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg text-center ${
            message.includes('successfully') 
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        {isLoading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Appointments Yet
            </h3>
            <p className="text-gray-600 mb-8">
              You haven't booked any appointments. Start by booking your first service!
            </p>
            <button
              onClick={() => onNavigate('booking')}
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all"
            >
              Book Appointment
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Calendar className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {appointment.serviceName}
                        </h3>
                        <p className="text-gray-600">
                          with {appointment.staffName}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-pink-600" />
                      <div>
                        <p className="text-sm text-gray-600">Date</p>
                        <p className="font-semibold text-gray-900">
                          {formatDate(appointment.date)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-pink-600" />
                      <div>
                        <p className="text-sm text-gray-600">Time</p>
                        <p className="font-semibold text-gray-900">
                          {appointment.startTime} - {appointment.endTime}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-pink-600" />
                      <div>
                        <p className="text-sm text-gray-600">Stylist</p>
                        <p className="font-semibold text-gray-900">
                          {appointment.staffName}
                        </p>
                      </div>
                    </div>
                  </div>

                  {appointment.notes && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Notes:</p>
                      <p className="text-gray-900">{appointment.notes}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-gray-900">
                      ${appointment.totalPrice}
                    </div>
                    
                    {appointment.status === 'scheduled' && (
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleCancelAppointment(appointment.id)}
                          className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center space-x-2"
                        >
                          <X className="h-4 w-4" />
                          <span>Cancel</span>
                        </button>
                        <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4" />
                          <span>Confirm</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contact Information */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Need to Make Changes?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-pink-600" />
              <div>
                <p className="text-sm text-gray-600">Call us</p>
                <p className="font-semibold text-gray-900">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-pink-600" />
              <div>
                <p className="text-sm text-gray-600">Visit us</p>
                <p className="font-semibold text-gray-900">123 Beauty Street, City</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};