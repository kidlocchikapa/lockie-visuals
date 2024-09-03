import React from 'react';
import { FaClock, FaInfinity } from 'react-icons/fa';

const DiscoveryItem = ({ title, description, icon, reverse }) => (
  <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center mb-16`}>
    <div className="w-full md:w-1/3 flex justify-center mb-6 md:mb-0">
      {icon}
    </div>
    <div className="w-full md:w-2/3 md:px-8">
      <h2 className="text-2xl md:text-3xl font-bold text-indigo-900 mb-4">{title}</h2>
      <p className="text-gray-700 mb-6">{description}</p>
      <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-md transition duration-300">
        Discover More
      </button>
    </div>
  </div>
);

const Discover = () => {
  const discoveries = [
    {
      title: "Website designing",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
      icon: <FaClock className="text-9xl text-black" />,
      reverse: false
    },
    {
      title: "Graphic designing solutions",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
      icon: <FaInfinity className="text-9xl text-black" />,
      reverse: true
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      {discoveries.map((item, index) => (
        <DiscoveryItem key={index} {...item} />
      ))}
    </div>
  );
};

export default Discover;