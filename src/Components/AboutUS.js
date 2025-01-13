import React from 'react';
import { ArrowRight, Monitor, Smartphone, Code, PenTool, Megaphone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 ">
      {/* Hero Section */}
      <div className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">About Us</h1>
          <p className="text-xl text-gray-700 max-w-2xl">
            We are a full-service digital agency passionate about transforming ideas into powerful digital solutions. With expertise across multiple domains, we help businesses thrive in the digital landscape.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
          <p className="text-xl text-gray-700 max-w-3xl">
            To empower businesses with cutting-edge digital solutions that drive growth, enhance user experience, and create lasting impact in the digital world.
          </p>
        </div>
      </div>

      {/* Services Section */}
      <div className="px-6 py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              icon={<PenTool className="w-8 h-8 text-orange-500" />}
              title="Graphic Design"
              description="Creative designs that communicate your brand's story effectively and leave a lasting impression."
            />
            <ServiceCard 
              icon={<Megaphone className="w-8 h-8 text-orange-500" />}
              title="Marketing"
              description="Strategic digital marketing solutions to boost your online presence and drive meaningful engagement."
            />
            <ServiceCard 
              icon={<Monitor className="w-8 h-8 text-orange-500" />}
              title="Website Development"
              description="Custom, responsive websites that provide seamless user experience across all devices."
            />
            <ServiceCard 
              icon={<Code className="w-8 h-8 text-orange-500" />}
              title="Custom Software"
              description="Tailored software solutions that streamline your business processes and boost efficiency."
            />
            <ServiceCard 
              icon={<Smartphone className="w-8 h-8 text-orange-500" />}
              title="Mobile App Development"
              description="Native and cross-platform mobile applications that engage users and deliver value."
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Digital Presence?</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Let's collaborate to bring your vision to life with our comprehensive digital solutions.
          </p>
          <Link to="/signup"> <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg flex items-center gap-2 mx-auto transition-colors">
            Get Started
            <ArrowRight className="w-5 h-5" />
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="p-6 bg-white rounded-lg hover:shadow-lg transition-shadow">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}