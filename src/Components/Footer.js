import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Facebook, MessageCircle, Video, Twitter, Mail } from 'lucide-react';
import yusuf from './Yusuf.png';
import LogoImage from '../asserts/LogoImage.png';
import kidloc from './lockie.png';
import Pasco from '../asserts/Pasco.png'

const API_URL = "https://lockievisualbackend.onrender.com";

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
    style={{ display: isActive ? 'block' : 'none' }} // Add this line to prevent overlap
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

const Footer = ({ testimonials = defaultTestimonials }) => {
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState({ type: '', message: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('accessToken');
    setIsAuthenticated(!!token);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials]);

  useEffect(() => {
    if (feedbackStatus.message) {
      const timer = setTimeout(() => {
        setFeedbackStatus({ type: '', message: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [feedbackStatus]);

  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate('/login', { state: { returnUrl: window.location.pathname } });
  };

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

      const response = await fetch(`${API_URL}/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({ content: feedback }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('accessToken');
          setIsAuthenticated(false);
          throw new Error('Session expired. Please login again.');
        }
        throw new Error('Failed to submit feedback');
      }

      const data = await response.json();

      setFeedback('');
      setFeedbackStatus({
        type: 'success',
        message: 'Thank you for your feedback!'
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
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
            className="mb-8 md:mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              What Our Clients Say
            </h2>
            <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-orange-500 to-orange-300 mb-2" />
          </motion.div>

          <div className="relative h-[400px] md:h-[300px] mb-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                isActive={currentTestimonial === index}
              />
            ))}
          </div>
        </div>
      </div>

      <footer className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-12 md:py-16 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <FooterSection>
              <motion.img
                src={LogoImage}
                alt="Lockie Visuals Logo"
                className="h-12 w-auto mb-6 filter brightness-0 invert"
                whileHover={{ scale: 1.05 }}
              />
              <div className="flex flex-wrap gap-4">
                <SocialIcon Icon={Instagram} href="https://instagram.com/lockievisuals" label="Instagram" />
                <SocialIcon Icon={Facebook} href="https://facebook.com/lockievisuals" label="Facebook" />
                <SocialIcon Icon={MessageCircle} href="https://wa.me/265990155300" label="WhatsApp" />
                <SocialIcon Icon={Video} href="https://tiktok.com/@lockievisuals" label="TikTok" />
                <SocialIcon Icon={Mail} href="mailto:kidloc24chikapa@gmail.com" label="Email" />
              </div>
            </FooterSection>

            <FooterSection title="Quick Links">
              <motion.ul className="space-y-3">
                {['About Us', 'Events', 'News'].map((item) => (
                  <motion.li
                    key={item}
                    whileHover={{ x: 5 }}
                    className="transition-colors duration-300"
                  >
                    <Link to={`/${item.toLowerCase().replace(' ')}`} className="hover:text-gray-300">
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </FooterSection>

            <FooterSection title="Services">
              <motion.ul className="space-y-3">
                {['Contact', 'Solutions', 'Login', 'signup'].map((item) => (
                  <motion.li
                    key={item}
                    whileHover={{ x: 5 }}
                    className="transition-colors duration-300"
                  >
                    <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-gray-300">
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </FooterSection>

            <FooterSection title="Contact Info">
              <motion.div className="space-y-3 text-sm md:text-base">
                <p>Zomba, UNIMA - Malawi</p>
                <p>contacts : +265 (0) 990 155 300</p>
                <p>+265 (0) 888 777 332</p>
                <p>Email : Infoatlockievisuals@gmail.com</p>
              </motion.div>
            </FooterSection>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="mt-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Alert type={feedbackStatus.type} message={feedbackStatus.message} />
            
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder={isAuthenticated ? "Share your thoughts with us" : "Please login to share feedback"}
                className="flex-grow p-3 rounded-lg text-black focus:ring-2 focus:ring-gray-500 outline-none"
                disabled={isSubmitting || !isAuthenticated}
              />
              {isAuthenticated ? (
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`bg-gray-700 text-white px-8 py-3 rounded-lg transition-colors duration-300 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600'
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </motion.button>
              ) : (
                <motion.button
                  type="button"
                  onClick={handleLoginClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-700 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300"
                >
                  Login to Submit
                </motion.button>
              )}
            </div>
          </motion.form>

          <motion.div
            className="mt-12 text-center text-gray-400 text-sm md:text-base"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p>&copy; {new Date().getFullYear()} Lockie Visuals. All Rights Reserved.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;