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
    'Marketing',
  ];

  return (
    <nav className="bg-white font-medium text-black relative px-4 sm:px-6 sm:bg-transparent font-poppins lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 w-40">
            <Link to="/">
              <img src={LogoImage} alt="LockieVisuals" />
            </Link>
          </div>
          <div className="hidden md:block">
            <ul className="flex space-x-4 text-sm font-poppins font-medium">
              <li className="relative group">
                <button
                  onClick={toggleDropdown}
                  className="px-4 py-2 flex items-center hover:bg-gray-100 rounded-md"
                >
                  Solutions <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <ul
                  className={`absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 shadow-lg z-50 transform transition-all duration-300 ease-in-out ${
                    isDropdownOpen
                      ? 'opacity-100 scale-100 visible'
                      : 'opacity-0 scale-95 invisible'
                  } group-hover:opacity-100 group-hover:scale-100 group-hover:visible`}
                >
                  {solutions.map((solution, index) => (
                    <li key={index}>
                      <Link
                        to={`/${solution.toLowerCase().replace(/\s/g, '-')}`}
                        className="block px-6 py-4 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                      >
                        {solution}
                      </Link>
                    </li>
                  ))}
                </ul>
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
      <div
        className={`fixed inset-y-0 right-0 z-40 w-64 bg-white transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4">
          <button onClick={toggleMenu} className="mb-4">
            <X className="h-6 w-6" />
          </button>
          <ul className="space-y-4">
            <li className="relative group">
              <button
                onClick={toggleDropdown}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 w-full text-left flex items-center justify-between"
              >
                Solutions
                <ChevronRight className="h-4 w-4" />
              </button>
              {isDropdownOpen && (
                <ul className="pl-4 space-y-2">
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
      </div>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleMenu}
        ></div>
      )}
    </nav>
  );
}

export default Head;
