import React, { useState } from 'react';
import { FaPencilRuler, FaPalette, FaCode, FaBullhorn } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import atsogo from './atsogo.jpg'
import diza from './diza.jpg'
import {Link} from 'react-router-dom';
import philemon from './philemonBonanza2.jpg'
import rocky from './Rocky.jpg'
import myShoe from './mySHOE.jpg'
import tri from './tri.jpg'
import week from './Week.jpg'
import final from './final.jpg'

const ServiceCard = ({ icon, title, description }) => (
  <div 
    className="bg-gray-200 p-6 rounded-lg text-center flex flex-col items-center font-poppins shadow-md hover:translate-y-[-10px] transition duration-300 ease-in-out"
  >
    {icon}
    <h3 className="text-blue-800 font-semibold mt-4 mb-2">{title}</h3>
    <p className="text-black text-sm mb-4">{description}</p>
    <Link to = '/see-more' ><button className="text-blue-800 font-semibold">See More</button> </Link>
  </div>
);

const RecentProjects = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 2; 

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="relative font-poppins">
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
              <img src={rocky} alt="Bus" className="w-[1080] h-[1080] object-cover" />
            </div>
          </div>
          <div className="w-full flex-shrink-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <img src={philemon} alt="Another Shoe"  className="w-[1080] h-[1080] object-cover " />
              <img src={tri} alt="Another Bus" className="w-[1080] h-[1080] object-cover" />
              <img src={final} alt="Another Hairstyle" className="w-[1080] h-[1080]  object-cover" />
              <img src={week} alt="Another Plans" className="w-[1080] h-[1080] object-cover" />
            </div>
          </div>
          {/* Add more slides here as needed */}
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg"
      >
        <IoIosArrowBack className="text-2xl text-black" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg"
      >
        <IoIosArrowForward className="text-2xl text-black " />
      </button>
    </div>
  );
};

const OurServices = () => {
  const services = [
    {
      icon: <FaCode className="text-5xl font-poppins text-black" />,
      title: "Website Development",
      description: "We tailor each website to reflect your brand’s unique identity and meet your specific business needs."
    },
    {
      icon: <FaPalette className="text-5xl font-poppins text-black" />,
      title: "Graphic Designing",
      description: "Our designs are crafted with precision and creativity, ensuring a professional look that stands out."
    },
    {
      icon: < FaPencilRuler className="text-5xl font-poppins text-black" />,
      title: "Website Designing",
      description: "We focus on creating intuitive and engaging user experiences that keep visitors coming back."
    },
    {
      icon: <FaBullhorn className="text-5xl font-poppins text-black" />,
      title: "Marketing",
      description: "We tailor our marketing efforts to target your specific audience, ensuring that your message reaches the right people at the right time."
    },
  ];

  return (
    <div className="container mx-auto font-poppins px-4 py-16">
      <h2 className="text-3xl font-bold text-center text-orange-500 mb-2">Our Services</h2>
      <p className="text-center text-black mb-8 max-w-2xl mx-auto">
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