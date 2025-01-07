import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from './Components/ui/card';
import { Code, Palette, PencilRuler, Megaphone } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
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

const ServiceSection = () => {
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

  return (
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
  );
};

export default ServiceSection;
