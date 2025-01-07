import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, MessageCircle, Video, Twitter, Mail } from 'lucide-react';

// Sample testimonials data
const sampleTestimonials = [
  {
    id: 1,
    image: "/api/placeholder/150/150",
    name: "John Doe",
    heading: "Exceptional Photography",
    text: "Working with Lockie Visuals was an absolute pleasure. Their attention to detail and creativity exceeded our expectations.",
    company: "Creative Studios"
  },
  {
    id: 2,
    image: "/api/placeholder/150/150",
    name: "Sarah Smith",
    heading: "Professional Service",
    text: "The team at Lockie Visuals delivered outstanding results for our corporate event. Their professionalism and quality of work was impressive.",
    company: "Tech Innovations Ltd"
  },
  {
    id: 3,
    image: "/api/placeholder/150/150",
    name: "Mike Johnson",
    heading: "Amazing Event Coverage",
    text: "They captured every special moment of our wedding perfectly. The photos and videos are absolutely beautiful!",
    company: "Happy Client"
  }
];

const ProfileImage = ({ src, alt }) => (
  <img 
    src={src} 
    alt={alt} 
    className="w-36 h-36 object-cover rounded-sm mx-auto md:mx-0" 
  />
);

const CustomAlert = ({ type, message }) => (
  <div 
    className={`p-4 rounded-lg mt-2 ${
      type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
    }`}
  >
    {message}
  </div>
);

const TestimonialSlider = ({ testimonials = sampleTestimonials }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    if (!testimonials || testimonials.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentTestimonial((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials]);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/testimonials">
        <h2 className="text-3xl font-extrabold text-center text-orange-500 mb-4">
          Testimonials
        </h2>
      </Link>
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <div className="w-full md:w-auto mb-4 md:mb-0">
          <ProfileImage 
            src={testimonials[currentTestimonial].image} 
            alt={testimonials[currentTestimonial].name} 
          />
        </div>
        <div className="md:ml-4 text-center md:text-left">
          <h3 className="text-2xl font-bold text-blue-900 mb-2">
            {testimonials[currentTestimonial].heading}
          </h3>
          <p className="mb-4">{testimonials[currentTestimonial].text}</p>
          <p className="text-orange-500 font-bold">
            {testimonials[currentTestimonial].name}
          </p>
          <p>{testimonials[currentTestimonial].company}</p>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {testimonials.map((_, index) => (
          <span 
            key={index}
            className={`h-2 w-2 rounded-full mx-1 cursor-pointer ${
              index === currentTestimonial ? 'bg-black' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentTestimonial(index)}
          />
        ))}
      </div>
    </div>
  );
};

const SocialIcon = ({ Icon, href, ariaLabel }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    aria-label={ariaLabel} 
    className="text-white hover:text-orange-500 transition-colors duration-300"
  >
    <Icon size={24} />
  </a>
);

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) {
      setStatus({ type: 'error', message: 'Please enter your feedback' });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:3000/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          content: feedback, 
          timestamp: new Date().toISOString(),
          source: 'website_footer'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit feedback');
      }

      setStatus({ type: 'success', message: 'Thank you for your feedback!' });
      setFeedback('');
    } catch (error) {
      console.error('Feedback submission error:', error);
      setStatus({ 
        type: 'error', 
        message: error.message || 'Failed to submit feedback. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <div className="flex flex-col sm:flex-row">
          <input
            type="text"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Send us your views"
            className="flex-grow p-2 sm:rounded-r-none text-black mb-2 sm:mb-0"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-orange-500 text-white px-4 py-2 sm:rounded-r-lg sm:rounded-l-none hover:bg-orange-600 transition-colors duration-300 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
        {status.message && (
          <CustomAlert type={status.type} message={status.message} />
        )}
      </form>
    </div>
  );
};

const Footer = ({ testimonials = sampleTestimonials }) => {
  return (
    <div className="flex flex-col min-h-screen font-poppins">
      <div className="bg-white text-black flex-grow font-medium py-8 md:py-16">
        <TestimonialSlider testimonials={testimonials} />
      </div>
      <footer className="bg-blue-900 text-white font-poppins py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <img 
                src="/logo.png" 
                alt="Lockie Visuals Logo" 
                className="mb-4 h-10 w-auto filter invert" 
              />
              <div className="flex space-x-4 mt-4">
                <SocialIcon 
                  Icon={Instagram} 
                  href="https://www.instagram.com/lockievisuals" 
                  ariaLabel="Instagram" 
                />
                <SocialIcon 
                  Icon={Facebook} 
                  href="https://www.facebook.com/lockievisuals" 
                  ariaLabel="Facebook" 
                />
                <SocialIcon 
                  Icon={MessageCircle} 
                  href="https://wa.me/265990155300" 
                  ariaLabel="WhatsApp" 
                />
                <SocialIcon 
                  Icon={Video} 
                  href="https://www.tiktok.com/@lockievisuals" 
                  ariaLabel="TikTok" 
                />
                <SocialIcon 
                  Icon={Twitter} 
                  href="https://x.com/lockievisuals" 
                  ariaLabel="X (Twitter)" 
                />
                <SocialIcon 
                  Icon={Mail} 
                  href="mailto:kidloc24chikapa@gmail.com" 
                  ariaLabel="Email" 
                />
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
          <FeedbackForm />
          <div className="mt-4 text-center">
            <p>&copy; {new Date().getFullYear()} Lockie Visuals. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;