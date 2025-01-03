import React from 'react';
import KidImage from './lockie.png';
import Yusuf from "./Yusuf.png";
import SydneyImage from './Sydney.png';

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M20 10.999h2C22 5.869 18.127 2 12.99 2v2C17.052 4 20 6.943 20 10.999z"/>
    <path d="M13 8c2.103 0 3 .897 3 3h2c0-3.225-1.775-5-5-5v2zm3.422 5.443a1.001 1.001 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 0 0 .648-.291l1.86-2.171a1 1 0 0 0-.086-1.391l-4.064-3.696z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const SocialIcon = ({ Icon, href, color }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
    <span className={`text-${color}`}>
      <Icon />
    </span>
  </a>
);

const TeamMember = ({ name, roles, image, phone, facebook, instagram, twitter }) => (
  <div className="flex flex-col items-center p-6 bg-white rounded-lg  shadow-md transition-all hover:shadow-lg">
    <img src={image} alt={name} className="w-36 h-36 mb-4 object-cover" />
    <h3 className="text-xl font-bold text-blue-800 mb-2">{name}</h3>
    {roles.map((role, index) => (
      <p key={index} className="text-gray-600">{role}</p>
    ))}
    <div className="flex mt-4 space-x-4">
      <SocialIcon Icon={PhoneIcon} href={`tel:${phone}`} color="gray-600" />
      <SocialIcon Icon={FacebookIcon} href={facebook} color="blue-600" />
      <SocialIcon Icon={InstagramIcon} href={instagram} color="pink-600" />
      <SocialIcon Icon={TwitterIcon} href={twitter} color="blue-400" />
    </div>
  </div>
);

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Kidloc Chikapa",
      roles: ["Founder", "CTO", "Designer", "Developer"],
      image: KidImage,
      phone: "+265990155300",
      facebook: "https://www.facebook.com/lockie.bergwin",
      instagram: "https://instagram.com/kidloc",
      twitter: "https://twitter.com/kidloc"
    },
    {
      name: "Yusuf Mussa",
      roles: ["Developer", "Researcher"],
      image: Yusuf,
      phone: "+1234567891",
      facebook: "https://facebook.com/yusuf",
      instagram: "https://instagram.com/yusuf",
      twitter: "https://twitter.com/yusuf"
    },
    {
      name: "Sydney Mtima",
      roles: ["Developer", "Marketer"],
      image: SydneyImage,
      phone: "+1234567892",
      facebook: "https://facebook.com/sydney",
      instagram: "https://instagram.com/sydney",
      twitter: "https://twitter.com/sydney"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 font-poppins">
      <h2 className="text-3xl font-bold text-center text-orange-500 mb-4">Our Team</h2>
      <p className="text-center text-xl mb-12 text-gray-700">Meet the team behind Lockie Visuals</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <TeamMember key={index} {...member} />
        ))}
      </div>
    </div>
  );
};

export default TeamSection;