import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './Components/AuthContext'; // Import AuthProvider
import { useAuth } from './Components/AuthContext'; // Import useAuth hook
import HomePage from './Components/HomePage';
import Navbar from './Components/Head';
import OurServices from './Components/Services';
import TeamSection from './Components/TeamSection';
import Footer from './Components/Footer';
import Maintainance from './Maintainance';
import ServiceBookingDashboard from './Dash';
import Login from './Login';
import Signup from './signup';
import PortfolioSections from './Components/Port';
import AboutUs from './Components/AboutUS';
import ContactUs from './Components/ContactUs';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Main Layout Component
const MainLayout = () => (
  <>
    <HomePage/> 
    <OurServices/>  
    <TeamSection/>
    <Footer/>
  </>
);

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className='font-space-grotesk'>
          <Navbar />
          <Routes>
            <Route path="/" element={<MainLayout />} />
            <Route path="/services" element={<OurServices/>} />
            
            {/* Protected Dashboard Route */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <ServiceBookingDashboard/>
                </ProtectedRoute>
              } 
            />
            
            <Route path="/portfolio" element={<PortfolioSections/>} />
            <Route path="/about" element={<AboutUs/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/contact" element={<ContactUs/>} />
            
            {/* Maintenance Routes */}
            <Route path="/Marketing" element={<Maintainance/>} />
            <Route path="/web-development" element={<Maintainance/>} />
            <Route path="/graphic-designing" element={<Maintainance/>} />
            <Route path="/website-designing" element={<Maintainance/>} />
            <Route path="/see-more" element={<Maintainance/>} />
            <Route path="/discover" element={<Maintainance/>} />
            <Route path="/events" element={<Maintainance/>} />
            <Route path="/news" element={<Maintainance/>} />
            <Route path="/demo" element={<Maintainance/>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;