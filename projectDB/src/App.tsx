import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { BookingForm } from './components/BookingForm';
import { AppointmentsList } from './components/AppointmentsList';
import { AuthForm } from './components/AuthForm';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { AuthProvider } from './context/AuthContext';
import { motion } from 'framer-motion';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onNavigate={setCurrentPage} />
            {/* <Services onNavigate={setCurrentPage} /> */}
          </>
        );
      case 'services':
        return <Services onNavigate={setCurrentPage} />;
      case 'booking':
        return <BookingForm onNavigate={setCurrentPage} />;
      case 'appointments':
        return <AppointmentsList onNavigate={setCurrentPage} />;
      case 'login':
        return <AuthForm mode="login" onNavigate={setCurrentPage} />;
      case 'register':
        return <AuthForm mode="register" onNavigate={setCurrentPage} />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return (
          <>
            <Hero onNavigate={setCurrentPage} />
            {/* <Services onNavigate={setCurrentPage} /> */}
          </>
        );
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <motion.div
          initial={{ y: -70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
        >
          <Header onNavigate={setCurrentPage} currentPage={currentPage} />
        </motion.div>
        <motion.main
          className="flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {renderPage()}
        </motion.main>

        {/* Footer */}
        <motion.footer
          className="bg-gray-900 text-white py-12"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Luxe Beauty</h3>
                <p className="text-gray-400 mb-4">
                  Your premier destination for luxury beauty treatments and exceptional service.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Hair Styling</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Facial Treatments</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Nail Care</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Massage Therapy</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><button onClick={() => setCurrentPage('about')} className="hover:text-white transition-colors">About Us</button></li>
                  <li><button onClick={() => setCurrentPage('contact')} className="hover:text-white transition-colors">Contact</button></li>
                  <li><button onClick={() => setCurrentPage('booking')} className="hover:text-white transition-colors">Book Appointment</button></li>
                  <li><a href="#" className="hover:text-white transition-colors">Gift Cards</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Contact Info</h4>
                <div className="space-y-2 text-gray-400">
                  <p>123 Beauty Street</p>
                  <p>City, State 12345</p>
                  <p>+1 (555) 123-4567</p>
                  <p>info@luxebeauty.com</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 Luxe Beauty Salon. All rights reserved.</p>
            </div>
          </div>
        </motion.footer>
      </div>
    </AuthProvider>
  );
}

export default App;