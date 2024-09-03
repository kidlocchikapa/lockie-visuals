import React from 'react';
import { FaPhone, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import KidlocImage from './KidlocImage.jpg'

const TeamMember = ({ name, roles, image }) => (
  <div className="flex flex-col items-center">
    <img src={image} alt={name} className="w-32 h-32 rounded-full mb-4" />
    <h3 className="text-xl font-bold text-blue-800">{name}</h3>
    {roles.map((role, index) => (
      <p key={index} className="text-gray-600">{role}</p>
    ))}
    <div className="flex mt-2 space-x-2">
      <FaPhone className="text-gray-500" />
      <FaFacebook className="text-blue-600" />
      <FaInstagram className="text-pink-600" />
      <FaTwitter className="text-blue-400" />
    </div>
  </div>
);

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Kidloc Chikapa",
      roles: ["Designer", "Developer"],
      image: KidlocImage
    },
    {
      name: "Yusuf Mussa",
      roles: ["Developer", "Researcher"],
      image: KidlocImage
    },
    {
      name: "Sydney Mtima",
      roles: ["Developer", "Marketer"],
      image: KidlocImage
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-2">
      <h2 className="text-3xl font-bold text-center text-orange-500 mb-8">Our Team</h2>
      <p className="text-center text-xl mb-12">Meet the team Behind lockie visuals</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <TeamMember key={index} {...member} />
        ))}
      </div>
    </div>
  );
};

export default TeamSection;