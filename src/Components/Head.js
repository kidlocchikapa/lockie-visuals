import React, { useState } from 'react';
import LogoImage from './LogoImage.png';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function Head() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const solutions = [
    'Graphic Designing',
    'Website Designing',
    'Web Development',
    'Marketing'
  ];

  return (
    <nav className="bg-white font-medium text-black relative px-4 sm:px-6  sm:bg-transparent font-poppins lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 w-40">
            <Link to="/">
              <img src={LogoImage} alt="LockieVisuals" />
            </Link>
          </div>
          <div className="hidden md:block">
            <ul className="flex space-x-4 text-sm font-poppins font-medium">
              <li className="relative">
                <button
                  onClick={toggleDropdown}
                  className="px-4 py-2 flex items-center hover:bg-gray-100 rounded-md"
                >
                  Solutions <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {isDropdownOpen && (
                  <ul className="absolute z-10 left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg">
                    {solutions.map((solution, index) => (
                      <li key={index}>
                        <Link
                          to={`/${solution.toLowerCase().replace(/\s/g, '-')}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                          {solution}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li className="px-4 py-2">
                <Link to="/about">About Us</Link>
              </li>
              <li className="px-4 py-2">
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/signup">
                  <button className="px-4 py-2 ring-blue-900 bg-gray-100 ring-1 hover:bg-gray-200 rounded-md">
                    Sign Up
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <button className="px-4 py-2 text-white bg-blue-800 rounded-md hover:bg-blue-700">
                    Login
                  </button>
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:block">
            <button onClick={toggleMenu}>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <li className="relative">
              <button
                onClick={toggleDropdown}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 w-full text-left flex items-center justify-between"
              >
                Solutions
                <ChevronRight className="h-4 w-4" />
              </button>
              {isDropdownOpen && (
                <ul className="pl-4">
                  {solutions.map((solution, index) => (
                    <li key={index}>
                      <Link
                        to={`/${solution.toLowerCase().replace(/\s/g, '-')}`}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 cursor-pointer"
                      >
                        {solution}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/signup" className="block w-full text-left">
                <button className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                  Sign Up
                </button>
              </Link>
            </li>
            <li>
              <Link to="/login" className="block w-full text-left">
                <button className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-800 hover:bg-blue-700">
                  Login
                </button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Head;
