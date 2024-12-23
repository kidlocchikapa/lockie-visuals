import React from 'react';
import { FaPencilRuler, FaPalette, FaCode, FaBullhorn } from 'react-icons/fa';
import {Link} from "react-router-dom"

const DiscoveryItem = ({ title, description, icon, reverse }) => (
  <div className={`flex font-poppins flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center mb-16`}>
    <div className="w-full font-poppins md:w-1/3 flex justify-center mb-6 md:mb-0">
      <div className="animate-pulse">
        {icon}
      </div>
    </div>
    <div className="w-full md:w-2/3 font-poppins md:px-8">
      <div className="md:flex md:justify-start sm:flex sm:justify-center mb-4">
        <h2 className="text-2xl md:text-3xl text-center font-bold text-indigo-900">{title}</h2>
      </div>
      <p className="text-black mb-6">{description}</p>
      <div className="md:flex md:justify-start sm:flex sm:justify-center">
        <Link to = "/discover" ><button className="bg-orange-500 hover:bg-orange-600 font-poppins text-white font-bold py-2 px-6 rounded-md transition duration-300">
          Discover More
        </button></Link>
      </div>
    </div>
  </div>
);

const Discover = () => {
  const discoveries = [
    {
      title: "Website designing",
      description: "At Lockie Visuals, we specialize in creating stunning website designs that not only look great but also provide an exceptional user experience. Our team of talented designers is dedicated to bringing your vision to life with innovative and responsive designs.",
      icon: <FaPencilRuler className="text-8xl font-poppins text-indigo-900" />,
      reverse: false
    },
    {
      title: "Graphic designing solutions",
      description: "We offer comprehensive graphic design solutions that cater to all your branding needs. Our team of creative professionals is dedicated to delivering designs that not only look stunning but also effectively communicate your brand's message.",
      icon: <FaPalette className="text-8xl font-poppins text-indigo-900" />,
      reverse: true
    },
    {
      title: "Website development",
      description: "Specializing in transforming your vision into a dynamic online presence, our team of skilled developers and designers collaborates to create websites that are not only visually appealing but also highly functional and user-friendly.",
      icon: <FaCode className="text-8xl font-poppins text-indigo-900" />,
      reverse: false
    },
    {
      title: "Marketing",
      description: "Understanding that effective marketing is the key to business growth, our team of marketing experts is dedicated to creating and implementing strategies that not only increase your brand’s visibility but also drive engagement and conversions.",
      icon: <FaBullhorn className="text-8xl font-poppins text-indigo-900" />,
      reverse: true
    },
  ];

  return (
    <div className="container font-poppins mx-auto px-4 py-16">
      {discoveries.map((item, index) => (
        <DiscoveryItem key={index} {...item} />
      ))}
    </div>
  );
};

export default Discover;