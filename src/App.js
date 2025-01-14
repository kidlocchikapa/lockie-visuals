import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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


const App = () => {
  return (
    <Router>
      <div className='font-space-grotesk'>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <> <HomePage/> 
               <OurServices/>  
               
               <TeamSection/>
               <Footer/></>} />
          <Route path="/services" element={<OurServices/>} />
          <Route path="/dashboard" element={<ServiceBookingDashboard/>} />
          <Route path="/portfolio" element={<PortfolioSections/>} />
          <Route path="/about" element={<AboutUs/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path ="/contact" element={<ContactUs/>} />
          <Route path ="/Marketing" element={<Maintainance/>} />
          <Route path ="/web-development" element={<Maintainance/>} />
          <Route path ="/graphic-designing" element={<Maintainance/>} />
          <Route path ="/website-designing" element={<Maintainance/>} />
          <Route path ="/see-more" element={<Maintainance/>} />
          <Route path ="/discover" element={<Maintainance/>} />
          <Route path ="/events" element={<Maintainance/>} />
          <Route path ="/news" element={<Maintainance/>} />
          <Route path ="/demo" element={<Maintainance/>} />
        </Routes>
      </div>
      
    </Router>
  );
};

export default App;