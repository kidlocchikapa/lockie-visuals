import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HomeImage from '../asserts/HomeImage.jpg';
import Market from '../asserts/Market.jpg';
import Online from '../asserts/Online.jpg';

const carouselData = [
  {
    title: 'Welcome to Lockie Visuals',
    subtitle: 'Your alternate partner for your professional online presence',
    image: HomeImage,
  },
  {
    title: 'Enhance Your Online Presence',
    subtitle: 'Professional visuals for your digital success',
    image: Market,
  },
  {
    title: 'Cutting-Edge Visual Solutions',
    subtitle: 'Bringing your vision to life',
    image: Online,
  },
];

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselData.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="relative min-h-screen text-white font-poppins overflow-hidden">
      {/* Carousel Slides */}
      {carouselData.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 h-full w-full ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Enhanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-black opacity-70"></div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 h-screen flex flex-col justify-center text-center md:text-left">
        <div className="max-w-2xl mx-auto md:mx-0">
          <h1 className="text-3xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4 animate-fade-in">
            {carouselData[currentSlide].title}
          </h1>
          <p className="text-md md:text-2xl text-gray-300 font-medium mb-8 animate-fade-in-delayed">
            {carouselData[currentSlide].subtitle}
          </p>
          <div className="flex flex-col md:flex-row justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-4">
            <Link
              to="/demo"
              className="bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              See Demo
            </Link>
            <Link
              to="/contact"
              className="bg-white bg-opacity-20 hover:bg-opacity-40 text-white font-bold py-3 px-8 rounded-full border border-white shadow-lg transition-all transform hover:scale-105"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20">
        {carouselData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white scale-150 shadow-lg' : 'bg-gray-500'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HomePage;