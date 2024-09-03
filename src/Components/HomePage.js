import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HomeImage from './HomeImage.jpg';
import Market from './Market.jpg';
import Online from './Online.jpg';

const carouselData = [
  {
    title: "Welcome to Lockie Visuals",
    subtitle: "Your alternate partner for your professional online presence",
    image : HomeImage
  },
  {
    title: "Enhance Your Online Presence",
    subtitle: "Professional visuals for your digital success",
    image: Market
  },
  {
    title: "Cutting-Edge Visual Solutions",
    subtitle: "Bringing your vision to life",
    image: Online
  }
];

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselData.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {carouselData.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity h-full w-full duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900  opacity-80"></div>
        </div>
      ))}
      <div className="relative z-10 container mx-auto px-4 py-16 h-screen flex flex-col justify-center">
        <div className="text max-w-2xl">
          <h1 className="text-4xl font-sans md:text-6xl font-bold mb-4 transition-all duration-500">
            {carouselData[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-sans font-semibold transition-all duration-500">
            {carouselData[currentSlide].subtitle}
          </p>
          <div className="flex space-x-4">
            <Link to="/demo" className="bg-orange-500 hover:bg-orange-600 shadow-md text-white text-md font-bold py-2 px-6 rounded-md  transition duration-300">
              See Demo
            </Link>
            <Link to="/contact" className="bg-transparent shadow-md hover:bg-white hover:text-orange-500 text-white font-bold py-2 px-6 rounded-md text-md border-2 border-white transition duration-300">
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {carouselData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-gray-400'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HomePage;