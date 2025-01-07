import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardHeader, CardContent } from './ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../Components/ui/tabs';
import { Code, Palette, PencilRuler, Megaphone } from 'lucide-react';

import atsogo from '../asserts/atsogo.jpg'
import diza from '../asserts/diza.jpg'
import philemon from '../asserts/philemonBonanza2.jpg'
import rocky from '../asserts/Rocky.jpg'
import MyShoe from '../asserts/mySHOE.jpg'
import tri from '../asserts/tri.jpg'
import week from '../asserts/Week.jpg'
import final from '../asserts/final.jpg'
import maggie from '../asserts/updatedMaggie.jpg'
import rise from '../asserts/Soulrise.jpg'
import one from '../asserts/designOne.jpg'
import dk from '../asserts/DK SUPPLIERS01.jpg'
import flearning from '../asserts/flearning.jpg'
import fishan from '../asserts/fishan.jpg'
import focus from '../asserts/focus.jpg'
import infinity from '../asserts/infinity-1.jpg'
import joe from '../asserts/JOE.jpg'
import madalo from '../asserts/madalo.jpg'
import puli from '../asserts/pulli.jpg'
import online from '../asserts/Online.jpg'
import somase from '../asserts/SomaseP.jpg'
import unt from '../asserts/Untitled-1.jpg'

const ServiceCard = ({ icon: Icon, title, description }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="space-y-1 text-center">
          <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
            <Icon className="w-8 h-8 text-orange-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const PortfolioGrid = ({ images }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      {images.map((img, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="relative group"
        >
          <div className="aspect-square overflow-hidden rounded-lg">
            <img
              src={img}
              alt={`Portfolio item ${index + 1}`}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

const OurServices = () => {
  const services = [
    {
      icon: Code,
      title: "Website Development",
      description: "Custom-built websites that perfectly align with your brand identity and business objectives, featuring modern technology stacks and responsive design."
    },
    {
      icon: Palette,
      title: "Graphic Design",
      description: "Professional visual designs that capture your brand's essence, from logos and marketing materials to complete brand identity systems."
    },
    {
      icon: PencilRuler,
      title: "UI/UX Design",
      description: "User-centered design solutions that enhance engagement and conversion through intuitive interfaces and seamless user experiences."
    },
    {
      icon: Megaphone,
      title: "Digital Marketing",
      description: "Strategic marketing campaigns that drive results, combining data-driven insights with creative execution to reach and engage your target audience."
    }
  ];

  // Ensure all your images are imported and added to this array
  const allImages = [
    atsogo, diza, online, puli, madalo, fishan, somase, joe, infinity, maggie, flearning, dk, rise, week, unt, focus, one,
    final, rocky, MyShoe, tri, philemon /* ... add all your other images here */
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
      {/* Services Section */}
      <section>
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900"
          >
            Our Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-gray-600 max-w-2xl mx-auto"
          >
            Elevate your digital presence with our comprehensive suite of professional services
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </section>

      {/* Portfolio Section */}
      <section>
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900"
          >
            Our Portfolio
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-gray-600 max-w-2xl mx-auto"
          >
            Explore our diverse collection of successful projects
          </motion.p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="development">Development</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <PortfolioGrid images={allImages} />
          </TabsContent>
          <TabsContent value="design">
            <PortfolioGrid images={allImages.slice(0, 8)} />
          </TabsContent>
          <TabsContent value="development">
            <PortfolioGrid images={allImages.slice(8)} />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default OurServices;