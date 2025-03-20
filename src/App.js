import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Head';
import EmailVerification from './Components/EmailVerification';
import AdminLogin from './Components/Adminlogin';

// Lazy load components
const HomePage = lazy(() => import('./Components/HomePage'));
const OurServices = lazy(() => import('./Components/Services'));
const TeamSection = lazy(() => import('./Components/TeamSection'));
const Footer = lazy(() => import('./Components/Footer'));
const Maintainance = lazy(() => import('./Maintainance'));
const ServiceBookingDashboard = lazy(() => import('./Dash'));
const AdminDashboard = lazy(() => import('./Components/AdminDashboard'));
const Login = lazy(() => import('./Login'));
const Signup = lazy(() => import('./signup'));
const PortfolioSections = lazy(() => import('./Components/Port'));
const AboutUs = lazy(() => import('./Components/AboutUS'));
const ContactUs = lazy(() => import('./Components/ContactUs'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  </div>
);

// Group related routes
const maintainanceRoutes = [
  '/Marketing',
  '/web-development',
  '/graphic-designing',
  '/website-designing',
  '/see-more',
  '/mobileapp development-development',
  '/discover',
  '/events',
  '/news',
  '/demo'
];

const App = () => {
  return (
    <Router>
      <div className='font-space-grotesk'>
        <Navbar />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <Suspense fallback={<LoadingSpinner />}>
                <HomePage />
                <OurServices />
                <TeamSection />
                <Footer />
              </Suspense>
            } />
            <Route path="/services" element={<OurServices />} />
            <Route path="/portfolio" element={<PortfolioSections />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            
            {/* Auth Routes */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-email" element={<EmailVerification />} />
            <Route path="/blogs" element={<Maintainance />} />
            <Route path="/brand-assets" element={<Maintainance />} />
            
            {/* User Dashboard Routes */}
            <Route path="/dashboard" element={<ServiceBookingDashboard />} />
            <Route path="/bookings/:id" element={<ServiceBookingDashboard />} />
            
            {/* Admin Routes */}
            <Route path="/admin">
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/login" element={<AdminLogin />} />
              {/* Remove these routes as they're handled by the API, not separate pages */}
              {/* <Route path="bookings/confirm/:id" element={<AdminDashboard />} />
              <Route path="bookings/reject/:id" element={<AdminDashboard />} />
              <Route path="bookings/deliver/:id" element={<AdminDashboard />} /> */}
            </Route>

            {/* Maintenance Routes */}
            {maintainanceRoutes.map(path => (
              <Route key={path} path={path} element={<Maintainance />} />
            ))}

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;