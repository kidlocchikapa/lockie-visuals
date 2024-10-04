import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, MessageCircle, Video, Twitter, Mail } from 'lucide-react';
import LogoImage from './LogoImage.png';
import Phil from './mon.jpg';
import DanImage from './DanielKumwenda.jpg';
import KidImage from './team1.jpg';

const ProfileImage = ({ src, alt }) => (
  <img src={src} alt={alt} className="w-36 h-36 object-cover rounded-sm mx-auto md:mx-0" />
);

const testimonials = [
  {
    name: "Kidloc Chikapa",
    company: "GardenHoldings.com",
    heading: "Outstanding Website Design and Development",
    text: "Lockie Visuals created a stunning website for our business that perfectly captures our brand. The process was smooth and the results exceeded our expectations.",
    image: KidImage
  },
  {
    name: "Daniel Kumwenda",
    company: "Student",
    heading: "Incredibly talented team!",
    text: "The team at Lockie Visuals is incredibly talented. They delivered a top-notch design that has received rave reviews from my audience. I couldn't be happier!",
    image: DanImage
  },
  {
    name: "Philemon Mwanganya",
    company: "Student",
    heading: "Exceptional Service and Design",
    text: "Lockie Visuals exceeded my expectations with their outstanding creativity and professionalism. The design they delivered has been a huge hit with my audience, and I am absolutely thrilled with the results!",
    image: Phil
  },
];

const TestimonialSlider = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/Testmonials">
        <h2 className="text-3xl font-extrabold text-center text-orange-500 mb-4">Testimonials</h2>
      </Link>
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <div className="w-full md:w-auto mb-4 md:mb-0">
          <ProfileImage src={testimonials[currentTestimonial].image} alt={testimonials[currentTestimonial].name} />
        </div>
        <div className="md:ml-4 text-center md:text-left">
          <h3 className="text-2xl font-bold text-blue-900 mb-2">{testimonials[currentTestimonial].heading}</h3>
          <p className="mb-4">{testimonials[currentTestimonial].text}</p>
          <p className="text-orange-500 font-bold">{testimonials[currentTestimonial].name}</p>
          <p>{testimonials[currentTestimonial].company}</p>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {testimonials.map((_, index) => (
          <span 
            key={index}
            className={`h-2 w-2 rounded-full mx-1 cursor-pointer ${index === currentTestimonial ? 'bg-black' : 'bg-gray-300'}`}
            onClick={() => setCurrentTestimonial(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

const SocialIcon = ({ Icon, href, ariaLabel }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} className="text-white hover:text-orange-500 transition-colors duration-300">
    <Icon size={24} />
  </a>
);

const Footer = () => {
  return (
    <div className="flex flex-col min-h-screen font-poppins">
      <div className="bg-white text-black flex-grow font-medium py-8 md:py-16">
        <TestimonialSlider />
      </div>
      <footer className="bg-blue-900 text-white font-poppins py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <img src={LogoImage} alt="Lockie Visuals Logo" className="mb-4 h-10 w-auto filter invert" />
              <div className="flex space-x-4 mt-4">
                <SocialIcon Icon={Instagram} href="https://www.instagram.com/lockievisuals" ariaLabel="Instagram" />
                <SocialIcon Icon={Facebook} href="https://www.facebook.com/lockievisuals" ariaLabel="Facebook" />
                <SocialIcon Icon={MessageCircle} href="https://wa.me/265990155300" ariaLabel="WhatsApp" />
                <SocialIcon Icon={Video} href="https://www.tiktok.com/@lockievisuals" ariaLabel="TikTok" />
                <SocialIcon Icon={Twitter} href="https://x.com/lockievisuals" ariaLabel="X (Twitter)" />
                <SocialIcon Icon={Mail} href="mailto:kidloc24chikapa@gmail.com" ariaLabel="Email" />
              </div>
            </div>
            <div>
              <h4 className="font-bold text-2xl mb-2">Explore</h4>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/events">Events</Link></li>
                <li><Link to="/news">News</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-2xl mb-2">Quick Links</h4>
              <ul>
                <li><Link to="/contact">Contact Sales</Link></li>
                <li><Link to="/solutions">Solutions</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Create Account</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-2xl mb-2">Contact Info</h4>
              <p>Zomba, UNIMA - Malawi</p>
              <p>contacts : +265 (0) 990 155 300</p>
              <p>+265 (0) 888 777 332</p>
              <p>Email : Infoatlockievisuals@gmail.com</p>
            </div>
          </div>
          <div className="mt-8">
            <div className="flex flex-col sm:flex-row">
              <input type="text" placeholder="Send us your views" className="flex-grow p-2 sm:rounded-r-none text-black mb-2 sm:mb-0" />
              <button className="bg-orange-500 text-white px-4 py-2 sm:rounded-r-lg sm:rounded-l-none hover:bg-orange-600 transition-colors duration-300">Submit</button>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p>&copy; {new Date().getFullYear()} Lockie Visuals. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;