import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Head';
import EmailVerification from './Components/EmailVerification';

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
            <Route path="/" element={
              <Suspense fallback={<LoadingSpinner />}>
                <HomePage />
                <OurServices />
                <TeamSection />
                <Footer />
              </Suspense>
            } />
            <Route path="/services" element={<OurServices />} />
            <Route path="/dashboard" element={<ServiceBookingDashboard />} />
            <Route path="/portfolio" element={<PortfolioSections />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/verify-email" element={<EmailVerification />} />
            <Route path="/admin/bookings/confirm/:id" element={<AdminDashboard />} />
            <Route path="/admin/bookings/reject/:id" element={<AdminDashboard />} />
            <Route path="/admin/bookings/deliver/:id" element={<AdminDashboard />} />
            
            {/* Group all maintenance routes */}
            {maintainanceRoutes.map(path => (
              <Route key={path} path={path} element={<Maintainance />} />
            ))}
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;