import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from './Components/ui/card';
import { Code, Palette, PencilRuler, Megaphone, ArrowRight } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <Card className="relative h-full overflow-hidden bg-white hover:shadow-xl transition-all duration-300 border border-gray-100">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-300 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        
        <CardHeader className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center group-hover:bg-orange-100 transition-colors duration-300">
              <Icon className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-orange-500 transition-colors duration-300">
              {title}
            </h3>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            {description}
          </p>
          
          <div className="flex items-center gap-2 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-sm font-medium">Learn more</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
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
    <section className="py-6">
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Our Services
          </h2>
          <div className="h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-orange-500 to-orange-300" />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-gray-600 max-w-2xl mx-auto"
        >
          Elevate your digital presence with our comprehensive suite of professional services
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;