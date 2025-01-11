import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import yusuf from './Yusuf.png';
import LogoImage from '../asserts/LogoImage.png';
import kidloc from './lockie.png';
import sydney from './Sydney.png';
import { Instagram, Facebook, MessageCircle, Video, Twitter, Mail } from 'lucide-react';

// Custom Alert Component
const Alert = ({ type, message }) => {
  const bgColor = type === 'error' ? 'bg-red-100' : 'bg-green-100';
  const textColor = type === 'error' ? 'text-red-800' : 'text-green-800';
  const borderColor = type === 'error' ? 'border-red-200' : 'border-green-200';

  return message ? (
    <div className={`${bgColor} ${textColor} px-4 py-3 rounded-lg border ${borderColor} mb-4`}>
      {message}
    </div>
  ) : null;
};

// Rest of the code remains the same until the testimonials data
const defaultTestimonials = [
  {
    id: 1,
    image: sydney,
    name: "John Doe",
    heading: "Exceptional Photography",
    text: "Working with Lockie Visuals was an absolute pleasure. Their attention to detail and creativity exceeded our expectations.",
    company: "Creative Studios"
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
    name: "Mike Johnson",
    heading: "Amazing Event Coverage",
    text: "They captured every special moment of our wedding perfectly. The photos and videos are absolutely beautiful!",
    company: "Happy Client"
  }
];

// Component definitions for TestimonialCard, SocialIcon, and FooterSection remain the same
const TestimonialCard = ({ testimonial, isActive }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
    transition={{ duration: 0.5 }}
    className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-blue-50 to-white p-8 shadow-xl"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-orange-100/20 to-blue-100/20 opacity-50" />
    <div className="relative z-10 flex flex-col md:flex-row items-center space-x-0 md:space-x-6">
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-lg mb-4 md:mb-0"
      >
        <img src={testimonial.image} alt={testimonial.name} className="h-full w-full object-cover" />
      </motion.div>
      <div className="flex-1 text-center md:text-left">
        <h3 className="bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-2xl font-bold text-black mb-2">
          {testimonial.heading}
        </h3>
        <p className="text-gray-600 mb-4">{testimonial.text}</p>
        <p className="text-orange-500 font-bold">{testimonial.name}</p>
        <p className="text-gray-500">{testimonial.company}</p>
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
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
    className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md text-blue-900 hover:text-orange-500 hover:shadow-lg transition-all duration-300"
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
    <h4 className="text-2xl font-bold text-white mb-4">{title}</h4>
    {children}
  </motion.div>
);

const Footer = ({ testimonials = defaultTestimonials }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
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
      const response = await fetch('sql8.freemysqlhosting.net', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: feedback }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      setFeedback('');
      setFeedbackStatus({
        type: 'success',
        message: 'Thank you for your feedback!'
      });
    } catch (error) {
      setFeedbackStatus({
        type: 'error',
        message: 'Failed to submit feedback. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-gray-20 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-4xl font-bold text-black mb-4">
              What Our Clients Say
            </h2>
            <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-orange-500 to-orange-300 mb-4" />
          </motion.div>

          <div className="relative">
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

      <footer className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <FooterSection>
              <motion.img
                src={LogoImage}
                alt="Lockie Visuals Logo"
                className="h-12 w-auto mb-6 filter invert"
                whileHover={{ scale: 1.05 }}
              />
              <div className="flex space-x-4">
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
                    <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-orange-500">
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </FooterSection>

            <FooterSection title="Services">
              <motion.ul className="space-y-3">
                {['Contact Sales', 'Solutions', 'Login', 'Create Account'].map((item) => (
                  <motion.li
                    key={item}
                    whileHover={{ x: 5 }}
                    className="transition-colors duration-300"
                  >
                    <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-orange-500">
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </FooterSection>

            <FooterSection title="Contact Info">
              <motion.div className="space-y-3">
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
            {feedbackStatus.message && (
              <Alert type={feedbackStatus.type} message={feedbackStatus.message} />
            )}
            
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your thoughts with us"
                className="flex-grow p-3 rounded-lg text-black focus:ring-2 focus:ring-orange-500 outline-none"
                disabled={isSubmitting}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`bg-orange-500 text-white px-8 py-3 rounded-lg transition-colors duration-300 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </motion.button>
            </div>
          </motion.form>

          <motion.div
            className="mt-12 text-center text-gray-300"
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