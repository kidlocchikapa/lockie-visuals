import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Facebook, MessageCircle, Video, Twitter, Mail } from 'lucide-react';
import LogoImage from '../asserts/LogoImage.png';
import Philimage from '../asserts/Philimage.png'
import Danimage from '../asserts/DanImage.png'
import Pasco from '../asserts/Pasco.png';

const defaultTestimonials = [
  {
    id: 1,
    image: Pasco,
    name: "Yunusu Kadango",
    heading: "Exceptional Graphics",
    text: "Thank you for an amazing experience! Your artistic designs exceeded my expectations, showcasing impeccable quality and creativity. I truly felt warmly welcomed, genuinely understood, and valued throughout our interaction. Kudos to you for such outstanding work!",
    company: "Student ..MUBAS",
    bgColor: "from-gray-800 to-gray-800"
  },
  {
    id: 2,
    image: Danimage,
    name: "Daniel Kumwenda",
    heading: "Outstanding Creativity",
    text: "The design exceeded our expectations! It perfectly captures the essence of our business and has already started drawing attention to our brand. Thank you for your professionalism and creativity. Highly recommended!",
    company: "DK suppliers",
    bgColor: "from-gray-800 to-gray-800"
  },
  {
    id: 3,
    image: Philimage,
    name: "Philip Mwanganya",
    heading: "Designs That Inspire",
    text: "As a society focused on mathematical sciences education, we wanted designs that reflect our passion and professionalism. You delivered beyond our expectations, and your work has become an integral part of our branding.",
    company: "SOMASE vice president",
    bgColor: "from-gray-800 to-gray-800"
  }
];

const TestimonialCard = ({ testimonial, isActive }) => (
  <motion.div
    initial={{ opacity: 0, x: 100 }}
    animate={{
      opacity: isActive ? 1 : 0,
      x: isActive ? 0 : 100,
      display: isActive ? 'block' : 'none'
    }}
    transition={{
      duration: 0.5,
      ease: "easeInOut"
    }}
    className="w-full h-full"
  >
    <div className="flex flex-col md:flex-row h-full">
      {/* Left color gradient section - Enlarged image container */}
      <div className={`w-full md:w-1/3 bg-gradient-to-br ${testimonial.bgColor} p-4 md:p-8 rounded-t-lg md:rounded-l-lg md:rounded-tr-none`}>
        <div className="h-full flex items-center justify-center">
          <div className="relative h-40 w-40 md:h-48 md:w-48 lg:h-56 lg:w-56 overflow-hidden rounded-full border-4 border-white shadow-lg">
            <img 
              src={testimonial.image} 
              alt={testimonial.name} 
              className="h-full w-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/200';
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Right content section */}
      <div className="w-full md:w-2/3 bg-white p-6 md:p-8 rounded-b-lg md:rounded-r-lg md:rounded-bl-none flex flex-col justify-between">
        <div className="mb-4 md:mb-6">
          <h4 className="text-lg md:text-xl font-semibold text-orange-500 mb-2">{testimonial.heading}</h4>
          <p className="text-base md:text-lg lg:text-xl text-gray-700 italic mb-4">"{testimonial.text}"</p>
        </div>
        <div>
          <h3 className="text-lg md:text-xl font-bold text-gray-800">{testimonial.name}</h3>
          <p className="text-gray-600">{testimonial.company}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

const TestimonialDots = ({ total, active, setActive }) => (
  <div className="flex justify-center space-x-2 mt-6">
    {Array.from({ length: total }).map((_, index) => (
      <button
        key={index}
        onClick={() => setActive(index)}
        className={`h-3 w-3 rounded-full transition-all duration-300 ${
          active === index ? 'bg-orange-500 w-6' : 'bg-gray-300'
        }`}
        aria-label={`Go to testimonial ${index + 1}`}
      />
    ))}
  </div>
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
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Dynamic height based on screen size
  const getTestimonialHeight = () => {
    if (windowWidth < 640) return "500px";
    if (windowWidth < 768) return "450px";
    if (windowWidth < 1024) return "350px";
    return "320px";
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [testimonials]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-gray-50 py-12 md:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 md:mb-16 text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              What client says about Lockie Visuals
            </h2>
            <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-orange-500 to-orange-300 mb-2" />
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div 
              className="relative mb-8 overflow-hidden rounded-lg shadow-xl" 
              style={{ height: getTestimonialHeight() }}
            >
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  isActive={currentTestimonial === index}
                />
              ))}
            </div>
            
            <TestimonialDots 
              total={testimonials.length}
              active={currentTestimonial}
              setActive={setCurrentTestimonial}
            />
          </div>
        </div>
      </div>

      <footer className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-10 md:py-16 mt-auto">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <FooterSection>
              <motion.img
                src={LogoImage}
                alt="Lockie Visuals Logo"
                className="h-12 w-auto mb-6 filter brightness-0 invert"
                whileHover={{ scale: 1.05 }}
              />
              <div className="flex flex-wrap gap-3 md:gap-4">
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
                    <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-gray-300">
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
        </div>
      </footer>
    </div>
  );
};

export default Footer;
