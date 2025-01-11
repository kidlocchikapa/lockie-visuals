import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MousePointer2 } from 'lucide-react';
import online from '../asserts/Online.jpg';
import market from '../asserts/Market.jpg';
import HomeImage from '../asserts/HomeImage.jpg';

const carouselData = [
  {
    title: 'Welcome to Lockie Visuals',
    subtitle: 'Your alternate partner for your professional online presence',
    image: online,
    cta: {
      primary: 'Explore Our Work',
      secondary: 'Get Started'
    }
  },
  {
    title: 'Enhance Your Online Presence',
    subtitle: 'Professional visuals for your digital success',
    image: market,
    cta: {
      primary: 'View Portfolio',
      secondary: 'Contact Us'
    }
  },
  {
    title: 'Cutting-Edge Visual Solutions',
    subtitle: 'Bringing your vision to life',
    image: HomeImage,
    cta: {
      primary: 'See Demo',
      secondary: 'Learn More'
    }
  }
];

// Image preloader component
const ImagePreloader = ({ src, onLoad }) => {
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = onLoad;
  }, [src, onLoad]);
  return null;
};

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const NavigationButton = ({ direction, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="hidden md:block absolute top-1/2 transform -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-colors"
    onClick={onClick}
    style={{ [direction === 'left' ? 'left' : 'right']: '2rem' }}
  >
    {direction === 'left' ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
  </motion.button>
);

const HomePage = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const slideIndex = Math.abs(page % carouselData.length);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  // Preload all images on component mount
  useEffect(() => {
    carouselData.forEach((slide, index) => {
      const img = new Image();
      img.src = slide.image;
      img.onload = () => {
        setLoadedImages(prev => new Set([...prev, index]));
        if (index === 0) setIsInitialLoad(false);
      };
    });
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const slideInterval = setInterval(() => {
      if (loadedImages.size === carouselData.length) {
        paginate(1);
      }
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [isAutoPlaying, page, loadedImages]);

  // Loading state component
  const LoadingState = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      <div className="space-y-4 text-center">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-white text-lg">Loading visuals...</p>
      </div>
    </div>
  );

  if (isInitialLoad) {
    return <LoadingState />;
  }

  return (
    <motion.div 
      className="relative min-h-screen text-white font-space-grotesk overflow-hidden"
      onHoverStart={() => setIsAutoPlaying(false)}
      onHoverEnd={() => setIsAutoPlaying(true)}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="absolute inset-0 w-full h-full"
        >
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url(${carouselData[slideIndex].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: loadedImages.has(slideIndex) ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-black/80">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)] opacity-60" />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Preload next image */}
      <ImagePreloader 
        src={carouselData[(slideIndex + 1) % carouselData.length].image} 
        onLoad={() => setLoadedImages(prev => new Set([...prev, (slideIndex + 1) % carouselData.length]))}
      />

      {/* Navigation Controls */}
      <NavigationButton direction="left" onClick={() => paginate(-1)} />
      <NavigationButton direction="right" onClick={() => paginate(1)} />

      {/* Content Section */}
      <div className="relative z-10 container mx-auto px-6 h-screen flex items-center">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1 
                key={slideIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-7xl font-bold leading-tight"
              >
                {carouselData[slideIndex].title}
              </motion.h1>
              
              <motion.p 
                key={`subtitle-${slideIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-300"
              >
                {carouselData[slideIndex].subtitle}
              </motion.p>
            </div>

            <motion.div 
              key={`cta-${slideIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/demo">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 w-full sm:w-auto bg-gradient-to-r from-orange-500 to-orange-600 rounded-full font-semibold text-white overflow-hidden shadow-xl transition-all hover:shadow-orange-500/30"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {carouselData[slideIndex].cta.primary}
                    <MousePointer2 size={18} className="inline" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 translate-y-full group-hover:translate-y-0 transition-transform" />
                </motion.button>
              </Link>

              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 w-full sm:w-auto border-2 border-white rounded-full font-semibold text-white overflow-hidden transition-all hover:bg-white hover:text-black"
                >
                  {carouselData[slideIndex].cta.secondary}
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex gap-3">
          {carouselData.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setPage([index, index - slideIndex])}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === slideIndex
                  ? 'bg-orange-500 w-12'
                  : 'bg-white/50 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 right-8 z-20 text-white/60"
      >
        <div className="flex flex-col items-center gap-2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </motion.div>
          <span className="text-sm font-light">Scroll</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HomePage;