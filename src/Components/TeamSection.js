// Import necessary dependencies
import React from "react";
import { motion } from "framer-motion";
import yusuf from './Yusuf.png';
import kidloc from './lockie.png';
import sydney from './Sydney.png';
// Social Media Icons
import {
  FaPhoneAlt as PhoneIcon,
  FaFacebook as FacebookIcon,
  FaInstagram as InstagramIcon,
  FaTwitter as TwitterIcon,
} from "react-icons/fa";

// Reusable SocialIcon Component
const SocialIcon = ({ Icon, href, color }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    <Icon className={`w-5 h-5 hover:text-${color}`} />
  </a>
);

// TeamMember Component with card styles
const TeamMember = ({ name, roles, image, phone, facebook, instagram, twitter, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="group"
  >
    <div className="relative h-full overflow-hidden bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 rounded-lg">
      {/* Top Border Gradient */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-300 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

      <div className="space-y-3 p-6">
        {/* Member Image */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center group-hover:bg-orange-100 transition-colors duration-300 overflow-hidden shadow-lg">
            <img src={image} alt={name} className="h-full w-full object-cover rounded-full" />
          </div>
        </div>

        {/* Member Name */}
        <h3 className="text-xl font-semibold text-center text-gray-900 group-hover:text-orange-500 transition-colors duration-300">
          {name}
        </h3>

        {/* Member Roles */}
        <div className="text-center text-gray-600">
          {roles.map((role, index) => (
            <p key={index}>{role}</p>
          ))}
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Social Links */}
        <div className="flex justify-center space-x-4 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <SocialIcon Icon={PhoneIcon} href={`tel:${phone}`} color="gray-600" />
          <SocialIcon Icon={FacebookIcon} href={facebook} color="blue-600" />
          <SocialIcon Icon={InstagramIcon} href={instagram} color="pink-600" />
          <SocialIcon Icon={TwitterIcon} href={twitter} color="blue-400" />
        </div>
      </div>
    </div>
  </motion.div>
);

// TeamSection Component
const TeamSection = () => {
  const teamMembers = [
    {
      name: "Sydney Mtima",
      roles: ["Project Manager", "Team Leader"],
      image: sydney,
      phone: "123-456-7890",
      facebook: "https://facebook.com/alicejohnson",
      instagram: "https://instagram.com/alicejohnson",
      twitter: "https://twitter.com/alicejohnson",
    },
    {
      name: "Kidloc Chikapa",
      roles: ["Developer", "UI/UX Designer"],
      image: kidloc,
      phone: "123-456-7890",
      facebook: "https://facebook.com/bobsmith",
      instagram: "https://instagram.com/bobsmith",
      twitter: "https://twitter.com/bobsmith",
    },
    {
      name: "Yusuf Mussa",
      roles: ["Backend Developer", "Database Administrator"],
      image: yusuf,
      phone: "123-456-7890",
      facebook: "https://facebook.com/carollee",
      instagram: "https://instagram.com/carollee",
      twitter: "https://twitter.com/carollee",
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Section Title with Gradient Underline */}
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Meet Our Team
        </h2>
        <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-orange-500 to-orange-300 mb-2" />
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
