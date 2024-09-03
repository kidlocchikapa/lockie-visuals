import React, { useState } from 'react';
import LogoImage from './LogoImage.png';
import { Menu, X, ChevronDown } from 'lucide-react';
import {Link} from 'react-dom'

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
    <nav className="bg-white text-black relative px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 w-40">
            <img src={LogoImage} alt="LockieVisuals" />
          </div>
          <div className="hidden md:block">
            <ul className="flex space-x-4 text-sm font-medium">
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
                        <a href ="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {solution}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li className="px-4 py-2">About Us</li>
              <li className="px-4 py-2">Contact</li>
              <li>
                <button className="px-4 py-2 ring-blue-900 bg-gray-100 ring-1 hover:bg-gray-200 rounded-md">
                  Sign Up
                </button>
              </li>
              <li>
                <button className="px-4 py-2 text-white bg-blue-800 rounded-md hover:bg-blue-700">
                  Login
                </button>
              </li>
            </ul>
          </div>
          <div className="md:hidden">
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
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 w-full text-left"
              >
                Solutions
              </button>
              {isDropdownOpen && (
                <ul className="pl-4">
                  {solutions.map((solution, index) => (
                    <li key={index}>
                      <a href ="#"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      >
                        {solution}
                        </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <a href ="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                About Us
                </a>
            </li>
            <li>
              <a href ="#"
                className="block px-3 py-2  rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Contact
              </a>
            </li>
            <li>
              <button className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                Sign Up
              </button>
            </li>
            <li>
              <button className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-800 hover:bg-blue-700">
                Login
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Head;