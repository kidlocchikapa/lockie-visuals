import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const teamMembers = [
  { name: 'John Doe', role: 'CEO', image: 'https://api.placeholderimage.com/300x300?text=CEO' },
  { name: 'Jane Smith', role: 'Lead Developer', image: 'https://api.placeholderimage.com/300x300?text=Developer' },
  { name: 'Mike Johnson', role: 'Manager', image: 'https://api.placeholderimage.com/300x300?text=Manager' },
  { name: 'Sarah Brown', role: 'Lead Designer', image: 'https://api.placeholderimage.com/300x300?text=Designer' },
];

const ContactItem = ({ Icon, text, href }) => (
  <a href={href} className="flex items-center space-x-2 text-blue-800 hover:text-orange-500 transition-colors duration-300">
    <Icon size={20} />
    <span>{text}</span>
  </a>
);

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-orange-50 min-h-screen font-sans">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">About Lockie Visuals</h1>
        
        {/* Company Description */}
        <section className="mb-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Who We Are</h2>
          <p className="text-gray-700 leading-relaxed">
            Lockie Visuals is a dynamic company specializing in graphic design, web development, and marketing solutions. We blend creativity with technical expertise to deliver stunning visuals and powerful digital experiences that help our clients stand out in today's competitive market.
          </p>
        </section>
        
        {/* Vision and Goals */}
        <section className="mb-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Our Vision & Goals</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-orange-600 mb-2">Vision</h3>
              <p className="text-gray-700">To be the leading creative force in digital design and marketing, empowering businesses to thrive in the digital age.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-orange-600 mb-2">Goals</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Deliver innovative and impactful design solutions</li>
                <li>Provide cutting-edge web development services</li>
                <li>Offer strategic marketing campaigns that drive results</li>
                <li>Foster long-term partnerships with our clients</li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src={member.image} alt={member.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-blue-900">{member.name}</h3>
                  <p className="text-orange-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Get in Touch</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <ContactItem Icon={Mail} text="info@lockievisuals.com" href="mailto:info@lockievisuals.com" />
              <ContactItem Icon={Phone} text="+265 990 155 300" href="tel:+265990155300" />
              <ContactItem Icon={MapPin} text="Zomba, UNIMA - Malawi" href="#" />
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-orange-600 mb-2">Follow Us</h3>
              <div className="flex space-x-4">
                <ContactItem Icon={Instagram} text="Instagram" href="https://www.instagram.com/lockievisuals" />
                <ContactItem Icon={Facebook} text="Facebook" href="https://www.facebook.com/lockievisuals" />
                <ContactItem Icon={Twitter} text="Twitter" href="https://twitter.com/lockievisuals" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;