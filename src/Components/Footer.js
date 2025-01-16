import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Facebook, MessageCircle, Video, Twitter, Mail } from 'lucide-react';
import yusuf from './Yusuf.png';
import LogoImage from '../asserts/LogoImage.png';
import kidloc from './lockie.png';
import Pasco from '../asserts/Pasco.png';

const API_URL = "https://lockievisualbackend.onrender.com";

// Alert Component
const Alert = ({ type, message }) => {
  const bgColor = type === 'error' ? 'bg-red-100' : 'bg-green-100';
  const textColor = type === 'error' ? 'text-red-800' : 'text-green-800';
  const borderColor = type === 'error' ? 'border-red-200' : 'border-green-200';

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`${bgColor} ${textColor} px-4 py-3 rounded-lg border ${borderColor} mb-4`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Default testimonials data
const defaultTestimonials = [
  {
    id: 1,
    image: Pasco,
    name: "Pasco",
    heading: "Exceptional Graphics",
    text: "Thank you for the exceptional experience! Your artistic designs surpassed my expectations, Speaking for themselves with their impeccable quality. I felt warmly welcomed, genuinely understood and valued throughout our interaction. Kudos to you.",
    company: "Student"
  },
  {
    id: 2,
    image: kidloc,
    name: "kidloc chikapa",
    heading: "Professional Service",
    text: "The team at Lockie Visuals delivered outstanding results for our corporate event. Their professionalism and quality of work was impressive.",
    company: "Tech Innovations Ltd"
  },
  {
    id: 3,
    image: yusuf,
    name: "Philemon Mwanganya",
    heading: "Amazing Event Coverage",
    text: "They captured every special moment of our wedding perfectly. The photos and videos are absolutely beautiful!",
    company: "Happy Client"
  }
];

// TestimonialCard Component
const TestimonialCard = ({ testimonial, isActive }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ 
      opacity: isActive ? 1 : 0,
      scale: isActive ? 1 : 0.8,
      rotateY: isActive ? 0 : 180
    }}
    transition={{ 
      duration: 0.8,
      type: "spring",
      stiffness: 100 
    }}
    className="absolute top-0 left-0 w-full"
    style={{ display: isActive ? 'block' : 'none' }}
  >
    <div className="rounded-2xl bg-white p-4 md:p-8 shadow-xl">
      <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-6">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="relative h-24 w-24 md:h-32 md:w-32 overflow-hidden rounded-full border-4 border-gray-200 shadow-lg mb-4 md:mb-0 flex-shrink-0"
        >
          <img src={testimonial.image} alt={testimonial.name} className="h-full w-full object-cover" />
        </motion.div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            {testimonial.heading}
          </h3>
          <p className="text-sm md:text-base text-gray-600 mb-4">{testimonial.text}</p>
          <p className="text-gray-700 font-bold">{testimonial.name}</p>
          <p className="text-sm text-gray-500">{testimonial.company}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

// SocialIcon Component
const SocialIcon = ({ Icon, href, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    whileHover={{ scale: 1.2, rotate: 360 }}
    whileTap={{ scale: 0.9 }}
    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 shadow-md text-gray-700 hover:text-gray-900 hover:shadow-lg transition-all duration-300"
  >
    <Icon size={20} />
  </motion.a>
);

// FooterSection Component
const FooterSection = ({ title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="relative"
  >
    <h4 className="text-xl md:text-2xl font-bold text-gray-100 mb-4">{title}</h4>
    {children}
  </motion.div>
);

// Main Footer Component
const Footer = ({ testimonials = defaultTestimonials }) => {
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState({ type: '', message: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Authentication check on component mount
  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const response = await fetch(`${API_URL}/verify-token`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          });

          if (response.ok) {
            setIsAuthenticated(true);
            console.log('Authentication verified successfully');
          } else {
            throw new Error('Token verification failed');
          }
        } catch (error) {
          console.error('Auth verification error:', error);
          localStorage.removeItem('accessToken');
          setIsAuthenticated(false);
        }
      }
    };

    verifyAuth();
  }, []);

  // Testimonial rotation effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials]);

  // Clear feedback status after 3 seconds
  useEffect(() => {
    if (feedbackStatus.message) {
      const timer = setTimeout(() => {
        setFeedbackStatus({ type: '', message: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [feedbackStatus]);

  // Handle login redirect
  const handleLoginClick = (e) => {
    e.preventDefault();
    const currentPath = window.location.pathname;
    navigate('/login', { state: { returnUrl: currentPath } });
  };

  // Handle feedback submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      handleLoginClick(e);
      return;
    }

    if (!feedback.trim()) {
      setFeedbackStatus({
        type: 'error',
        message: 'Please enter your feedback before submitting'
      });
      return;
    }

    setIsSubmitting(true);
    setFeedbackStatus({ type: '', message: '' });

    try {
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      console.log('Submitting feedback with token:', token); // Debug log

      const response = await fetch(`${API_URL}/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({ content: feedback }),
      });

      console.log('Response status:', response.status); // Debug log

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error response:', errorData);
        
        if (response.status === 401) {
          localStorage.removeItem('accessToken');
          setIsAuthenticated(false);
          throw new Error('Session expired. Please login again.');
        }
        throw new Error(errorData.message || 'Failed to submit feedback');
      }

      const data = await response.json();
      console.log('Success response:', data);

      setFeedback('');
      setFeedbackStatus({
        type: 'success',
        message: 'Thank you for your feedback!'
      });
    } catch (error) {
      console.error('Feedback submission error:', error);
      setFeedbackStatus({
        type: 'error',
        message: error.message || 'Failed to submit feedback. Please try again later.'
      });
      
      if (error.message.includes('Session expired')) {
        setTimeout(() => {
          navigate('/login', { state: { returnUrl: window.location.pathname } });
        }, 2000);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-gray-25 py-8 md:py-16 mb-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
              Welcome to Lockie Visuals!
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              Your go-to platform for all things creative and visual.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Section */}
            <div className="flex flex-col items-center space-y-8">
              {/* Testimonial Carousel */}
              <div className="relative w-full h-80">
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                    isActive={currentTestimonial === index}
                  />
                ))}
              </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col items-center space-y-4">
              {/* Feedback Form */}
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onSubmit={handleSubmit}
                className="w-full max-w-lg p-4 md:p-8 rounded-lg bg-gray-50 shadow-md"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Share Your Feedback</h2>
                <Alert type={feedbackStatus.type} message={feedbackStatus.message} />
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 resize-none"
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Your feedback here..."
                />
                <button
                  type="submit"
                  className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </motion.form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-800 text-gray-100 py-10 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <FooterSection title="About Us">
              <img
                src={LogoImage}
                alt="Company Logo"
                className="h-20 w-30 object-contain mb-4"
              />
              <p className="text-sm">
                Lockie Visuals is your ultimate solution for creative visuals. Let's turn your ideas into stunning graphics!
              </p>
            </FooterSection>
            <FooterSection title="Quick Links">
              <ul className="space-y-2">
                <li><Link to="/" className="hover:underline">Home</Link></li>
                <li><Link to="/about" className="hover:underline">About</Link></li>
                <li><Link to="/services" className="hover:underline">Services</Link></li>
                <li><Link to="/contact" className="hover:underline">Contact</Link></li>
              </ul>
            </FooterSection>
            <FooterSection title="Follow Us">
              <div className="flex space-x-4">
                <SocialIcon Icon={Facebook} href="https://facebook.com" label="Facebook" />
                <SocialIcon Icon={Twitter} href="https://twitter.com" label="Twitter" />
                <SocialIcon Icon={Instagram} href="https://instagram.com" label="Instagram" />
                <SocialIcon Icon={MessageCircle} href="https://tiktok.com" label="MessageCircle" />
                <SocialIcon Icon={Video} href="https://youtube.com" label="Video" />
                <SocialIcon Icon={Mail} href="mailto:lockievisual@gmail.com" label="Mail" />
              </div>
            </FooterSection>
            <FooterSection title="Feedback Form">
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onSubmit={handleSubmit}
              >
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 resize-none"
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Your feedback here..."
                />
                <button
                  type="submit"
                  className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </motion.form>
            </FooterSection>
          </div>
          <p className="text-center text-sm text-gray-400 mt-8">&copy; {new Date().getFullYear()} Lockie Visuals. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
