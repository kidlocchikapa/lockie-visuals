import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ServiceSection from '../servicessection';
import { ArrowRight } from 'lucide-react';
import atsogo from '../asserts/atsogo.jpg';
import diza from '../asserts/diza.jpg';
import philemon from '../asserts/philemonBonanza2.jpg';
import rocky from '../asserts/Rocky.jpg';
import MyShoe from '../asserts/mySHOE.jpg';
import tri from '../asserts/tri.jpg';
import week from '../asserts/Week.jpg';
import final from '../asserts/final.jpg';
import maggie from '../asserts/updatedMaggie.jpg';
import rise from '../asserts/Soulrise.jpg';
import one from '../asserts/designOne.jpg';
import dk from '../asserts/DK SUPPLIERS01.jpg';
import flearning from '../asserts/flearning.jpg';
import fishan from '../asserts/fishan.jpg';
import focus from '../asserts/focus.jpg';
import infinity from '../asserts/infinity-1.jpg';
import joe from '../asserts/JOE.jpg';
import madalo from '../asserts/madalo.jpg';
import puli from '../asserts/pulli.jpg';
import online from '../asserts/Online.jpg';
import somase from '../asserts/SomaseP.jpg';
import unt from '../asserts/Untitled-1.jpg';

const PortfolioSection = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [currentFilter, setCurrentFilter] = useState(null);

  const designImages = [
    atsogo, diza, philemon, rocky, MyShoe, tri, week, final,
    maggie, rise, one, dk, flearning, fishan, focus, infinity,
    joe, madalo, puli, online, somase, unt,
  ];

  const shouldShowImages = () => currentFilter === 'design' || activeTab === 'designing';

  const getFilteredImages = () => {
    if (!shouldShowImages()) return [];
    return designImages;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 font-poppins">
      <section className="mb-16">
        <ServiceSection />
      </section>
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          Our Portfolio
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 text-lg"
        >
          Explore our diverse collection of successful projects
        </motion.p>
      </div>

      {/* Navigation Tabs */}
      <div className="relative mb-12">
        <div className="flex justify-center space-x-8">
          {['all', 'designing', 'development'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                if (tab !== 'designing') setCurrentFilter(null);
              }}
              className={`relative px-4 py-2 text-lg ${activeTab === tab ? 'text-blue-600' : 'text-gray-600'}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 right-0 h-0.5 bg-blue-600 bottom-0"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      {activeTab === 'all' && (
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          <button
            onClick={() => setCurrentFilter('design')}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 hover:border-blue-500 transition-colors mb-4 sm:mb-0"
          >
            Recent design projects
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentFilter('development')}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 hover:border-blue-500 transition-colors"
          >
            Recent development projects
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Portfolio Grid or Empty State */}
      {currentFilter === 'development' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <p className="text-gray-500 text-lg">
            No recent projects available in this category yet.
          </p>
        </motion.div>
      ) : getFilteredImages().length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {getFilteredImages().map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative aspect-square overflow-hidden rounded-lg"
            >
              <img
                src={img}
                alt={`Portfolio item ${index + 1}`}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
          ))}
        </motion.div>
      ) : activeTab !== 'all' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <p className="text-gray-500 text-lg">No projects available.</p>
        </motion.div>
      ) : null}
    </div>
  );
};

export default PortfolioSection;
