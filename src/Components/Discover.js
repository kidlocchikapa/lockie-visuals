import React from 'react';
import { FaPencilRuler, FaPalette, FaCode, FaBullhorn } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';


const DiscoveryItem = ({ title, description, icon, reverse, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.2 }}
    className={`relative flex flex-col ${
      reverse ? 'md:flex-row-reverse' : 'md:flex-row'
    } items-center gap-12 mb-24 p-8 rounded-2xl bg-white hover:shadow-xl transition-shadow duration-300`}
  >
    {/* Decorative background element */}
    <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-transparent opacity-50 rounded-2xl" />
    
    {/* Icon Section */}
    <div className="relative w-full md:w-1/3 flex justify-center">
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="p-6 rounded-full bg-gradient-to-br from-indigo-100 to-white shadow-lg"
      >
        <div className="transform hover:rotate-12 transition-transform duration-300">
          {icon}
        </div>
      </motion.div>
    </div>

    {/* Content Section */}
    <div className="relative w-full md:w-2/3 space-y-6">
      <div className="space-y-2">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-900 to-indigo-700"
          whileHover={{ scale: 1.02 }}
        >
          {title}
        </motion.h2>
        <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-300 rounded-full" />
      </div>
      
      <p className="text-gray-700 text-lg leading-relaxed">
        {description}
      </p>

      <Link to="/discover">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-3 text-white shadow-md transition-all duration-300 hover:shadow-lg"
        >
          <span className="relative z-10 font-semibold">
            Discover More
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </motion.button>
      </Link>
    </div>
  </motion.div>
);

const Discover = () => {
  const discoveries = [
    {
      title: "Website Designing",
      description: "At Lockie Visuals, we specialize in creating stunning website designs that not only look great but also provide an exceptional user experience. Our team of talented designers is dedicated to bringing your vision to life with innovative and responsive designs.",
      icon: <FaPencilRuler className="text-7xl text-indigo-900" />,
      reverse: false
    },
    {
      title: "Graphic Designing Solutions",
      description: "We offer comprehensive graphic design solutions that cater to all your branding needs. Our team of creative professionals is dedicated to delivering designs that not only look stunning but also effectively communicate your brand's message.",
      icon: <FaPalette className="text-7xl text-indigo-900" />,
      reverse: true
    },
    {
      title: "Website Development",
      description: "Specializing in transforming your vision into a dynamic online presence, our team of skilled developers and designers collaborates to create websites that are not only visually appealing but also highly functional and user-friendly.",
      icon: <FaCode className="text-7xl text-indigo-900" />,
      reverse: false
    },
    {
      title: "Marketing",
      description: "Understanding that effective marketing is the key to business growth, our team of marketing experts is dedicated to creating and implementing strategies that not only increase your brand's visibility but also drive engagement and conversions.",
      icon: <FaBullhorn className="text-7xl text-indigo-900" />,
      reverse: true
    },
  ];

  return (
    <div className="relative min-h-screen bg-gray-50 ">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(79,_70,_229,_0.1),_transparent_50%)]" />
      
      <div className="container mx-auto px-4 py-24">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20 space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-900">
            Our Services
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our comprehensive range of digital solutions designed to elevate your brand and drive success
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="space-y-8">
          {discoveries.map((item, index) => (
            <DiscoveryItem key={index} {...item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discover;