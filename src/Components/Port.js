import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {  Code, Palette } from 'lucide-react';


// Import images
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
import somase from '../asserts/SomaseP.jpg';
import unt from '../asserts/Untitled-1.jpg';

const PortfolioSections = () => {
  const [selectedTab, setSelectedTab] = useState(null);
  const [hoveredImage, setHoveredImage] = useState(null);

  const designImages = [
    { src: atsogo, alt: 'Atsogo' },
    { src: diza, alt: 'Diza' },
    { src: philemon, alt: 'Philemon' },
    { src: rocky, alt: 'Rocky' },
    { src: MyShoe, alt: 'My Shoe' },
    { src: tri, alt: 'Tri' },
    { src: week, alt: 'Week' },
    { src: final, alt: 'Final' },
    { src: maggie, alt: 'Maggie' },
    { src: rise, alt: 'Soul Rise' },
    { src: one, alt: 'Design One' },
    { src: dk, alt: 'DK Suppliers' },
    { src: flearning, alt: 'F Learning' },
    { src: fishan, alt: 'Fishan' },
    { src: focus, alt: 'Focus' },
    { src: infinity, alt: 'Infinity' },
    { src: joe, alt: 'Joe' },
    { src: madalo, alt: 'Madalo' },
    { src: puli, alt: 'Puli' },
    { src: somase, alt: 'Somase' },
    { src: unt, alt: 'Untitled' }
  ];

  const tabs = [
    { id: 'designing', label: 'Design', icon: Palette },
    { id: 'development', label: 'Development', icon: Code }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Services Section */}
   

        {/* Portfolio Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Portfolio</h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-orange-500 to-orange-300 mb-2" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our journey through innovative designs and creative solutions that have helped our clients succeed
          </p>
        </div>

        {/* Navigation Tabs */}
        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col sm:flex-row justify-center gap-3 mb-8"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setSelectedTab(selectedTab === tab.id ? null : tab.id)}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all w-full sm:w-auto
                ${selectedTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </motion.nav>

        {/* Portfolio Content */}
        <AnimatePresence mode="wait">
          {selectedTab && (
            <motion.div 
              layout 
              className="min-h-[400px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {selectedTab === 'development' ? (
                <motion.div
                  className="flex flex-col items-center justify-center py-12 bg-white rounded-2xl shadow-md"
                >
                  <Code size={48} className="text-gray-400 mb-3" />
                  <p className="text-gray-500 text-lg">
                    No recent development projects available yet.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {designImages.map((img, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group relative aspect-square  overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300"
                      onHoverStart={() => setHoveredImage(index)}
                      onHoverEnd={() => setHoveredImage(null)}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover transition-transform duration-500
                          group-hover:scale-110"
                      />
                      {hoveredImage === index && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent
                            flex items-end p-6"
                        >
                          <p className="text-white font-medium">{img.alt}</p>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PortfolioSections;