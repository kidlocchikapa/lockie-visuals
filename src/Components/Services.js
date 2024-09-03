import React, { useState } from 'react';
import { IoCodeSlash, IoBrush, IoDesktop, IoMegaphone } from 'react-icons/io5';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import atsogo from './atsogo.jpg'
import diza from './diza.jpg'
import myShoe from './mySHOE.jpg'
import Online from './Online.jpg'

const ServiceCard = ({ icon, title, description }) => (
  <div className="bg-gray-200 p-6 rounded-lg text-center flex flex-col items-center shadow-md">
    {icon}
    <h3 className="text-blue-800 font-semibold mt-4 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm mb-4">{description}</p>
    <button className="text-blue-800 font-semibold">See More</button>
  </div>
);

const RecentProjects = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 2; // Update this number based on how many slides you have

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="relative">
      <h2 className="text-3xl font-bold text-center text-orange-500 mb-8">Recent Projects</h2>
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          <div className="w-full flex-shrink-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <img src={atsogo} alt="Shoe" className="w-[1080] h-[1080] object-cover " />
              <img src={diza} alt="Bus" className="w-[1080] h-[1080] object-cover" />
              <img src={myShoe} alt="Hairstyle" className="w-[1080] h-[1080] object-cover" />
              <img src={diza} alt="Bus" className="w-[1080] h-[1080] object-cover" />
            </div>
          </div>
          <div className="w-full flex-shrink-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <img src="/path/to/another-shoe-image.jpg" alt="Another Shoe" className="w-full h-40 object-cover rounded-lg" />
              <img src="/path/to/another-bus-image.jpg" alt="Another Bus" className="w-full h-40 object-cover rounded-lg" />
              <img src="/path/to/another-hairstyle-image.jpg" alt="Another Hairstyle" className="w-full h-40 object-cover rounded-lg" />
              <img src="/path/to/another-plans-image.jpg" alt="Another Plans" className="w-full h-40 object-cover rounded-lg" />
            </div>
          </div>
          {/* Add more slides here as needed */}
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg"
      >
        <IoIosArrowBack className="text-2xl text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg"
      >
        <IoIosArrowForward className="text-2xl text-gray-800 " />
      </button>
    </div>
  );
};

const OurServices = () => {
  const services = [
    {
      icon: <IoCodeSlash className="text-5xl text-black" />,
      title: "Website Development",
      description: "hvsxchvshshshdh-fjfjfjhfgcfdtsdwf-dufdjiyguefeygwuetu wcgjfeguegfiu"
    },
    {
      icon: <IoBrush className="text-5xl text-black" />,
      title: "Graphic Designing",
      description: "hvsxchvshshshdh-fjfjfjhfgcfdtsdwf-dufdjiyguefeygwuetu wcgjfeguegfiu"
    },
    {
      icon: <IoDesktop className="text-5xl text-black" />,
      title: "Website Designing",
      description: "hvsxchvshshshdh-fjfjfjhfgcfdtsdwf-dufdjiyguefeygwuetu wcgjfeguegfiu"
    },
    {
      icon: <IoMegaphone className="text-5xl text-black" />,
      title: "Marketing",
      description: "hvsxchvshshshdh-fjfjfjhfgcfdtsdwf-dufdjiyguefeygwuetu wcgjfeguegfiu"
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center text-orange-500 mb-2">Our Services</h2>
      <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">
        At lockie visuals we provide a range of services made to make your online presence exceptional
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
      <RecentProjects />
    </div>
  );
};

export default OurServices;