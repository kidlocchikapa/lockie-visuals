import React, { useState, useEffect } from 'react';
import LogoImage from '../asserts/LogoImage.png';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function Head() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll event listener to detect when user is scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  
  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const solutions = [
    'Graphic Designing',
    'Mobile App Development',
    'Web Development',
    'Digital Marketing',
  ];

  return (
    <nav 
  className={`fixed w-full font-medium font-poppins z-40 px-4 sm:px-6 lg:px-8 transition-all duration-300 ease-in-out ${
    isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
  }`}
>

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 w-40">
            <Link to="/">
              <img 
                src={LogoImage} 
                alt="LockieVisuals" 
                className=""  
              />
            </Link>
          </div>
          <div className="hidden md:block">
            <ul className="flex space-x-6 text-sm">
              <li className="relative group">
                <button
                  onClick={toggleDropdown}
                  className={`px-4 py-2 flex items-center hover:text-orange-500 transition-colors ${
                    isScrolled ? 'text-gray-900' : 'text-white'
                  }`}
                >
                  Solutions <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <ul
                  className={`absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 shadow-lg z-50 rounded-lg transition-all duration-300 ease-in-out ${
                    isDropdownOpen
                      ? 'opacity-100 scale-100 visible'
                      : 'opacity-0 scale-95 invisible'
                  } group-hover:opacity-100 group-hover:scale-100 group-hover:visible`}
                >
                  {solutions.map((solution, index) => (
                    <li key={index}>
                      <Link
                        to={`/${solution.toLowerCase().replace(/\s/g, '-')}`}
                        onClick={handleMenuItemClick}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500 rounded-lg transition-colors"
                      >
                        {solution}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {isLoggedIn && (
                <li className={`px-4 py-2 hover:text-orange-500 transition-colors ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}>
                  <Link to="/dashboard" onClick={handleMenuItemClick}>Dashboard</Link>
                </li>
              )}
              <li className={`px-4 py-2 hover:text-orange-500 transition-colors ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}>
                <Link to="/about" onClick={handleMenuItemClick}>About Us</Link>
              </li>
              <li className={`px-4 py-2 hover:text-orange-500 transition-colors ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}>
                <Link to="/contact" onClick={handleMenuItemClick}>Contact</Link>
              </li>
              {!isLoggedIn ? (
                <>
                  <li>
                    <Link to="/signup" onClick={handleMenuItemClick}>
                      <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors">
                        Sign Up
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" onClick={handleMenuItemClick}>
                      <button className="px-4 py-2 text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors">
                        Login
                      </button>
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <button 
                    onClick={() => {
                      setIsLoggedIn(false);
                      handleMenuItemClick();
                    }}
                    className="px-4 py-2 text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className={isScrolled ? 'text-gray-900' : 'text-white'}>
              {isMenuOpen ? (
                <X className="h-6 w-6 transition-transform duration-300 rotate-90" />
              ) : (
                <Menu className="h-6 w-6 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-white transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out shadow-lg`}
      >
        <div className="p-4">
          <button onClick={toggleMenu} className="mb-4">
            <X className="h-6 w-6 text-gray-900" />
          </button>
          <ul className="space-y-4">
            <li className="relative group">
              <button
                onClick={toggleDropdown}
                className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-orange-500 hover:bg-gray-100 w-full text-left flex items-center justify-between transition-colors"
              >
                Solutions
                <ChevronRight className={`h-4 w-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-90' : ''}`} />
              </button>
              {isDropdownOpen && (
                <ul className="pl-4 space-y-2">
                  {solutions.map((solution, index) => (
                    <li key={index}>
                      <Link
                        to={`/${solution.toLowerCase().replace(/\s/g, '-')}`}
                        onClick={handleMenuItemClick}
                        className="block px-3 py-2 rounded-lg text-gray-700 hover:text-orange-500 hover:bg-gray-100 transition-colors"
                      >
                        {solution}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            {isLoggedIn && (
              <li>
                <Link
                  to="/dashboard"
                  onClick={handleMenuItemClick}
                  className="block px-3 py-2 rounded-lg text-gray-700 hover:text-orange-500 hover:bg-gray-100 transition-colors"
                >
                  Dashboard
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/about"
                onClick={handleMenuItemClick}
                className="block px-3 py-2 rounded-lg text-gray-700 hover:text-orange-500 hover:bg-gray-100 transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={handleMenuItemClick}
                className="block px-3 py-2 rounded-lg text-gray-700 hover:text-orange-500 hover:bg-gray-100 transition-colors"
              >
                Contact
              </Link>
            </li>
            {!isLoggedIn ? (
              <>
                <li>
                  <Link to="/signup" onClick={handleMenuItemClick}>
                    <button className="w-full text-left block px-3 py-2 rounded-lg text-gray-700 hover:text-orange-500 hover:bg-gray-100 transition-colors">
                      Sign Up
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/login" onClick={handleMenuItemClick}>
                    <button className="w-full text-left block px-3 py-2 rounded-lg text-white bg-orange-500 hover:bg-orange-600 transition-colors">
                      Login
                    </button>
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button 
                  onClick={() => {
                    setIsLoggedIn(false);
                    handleMenuItemClick();
                  }}
                  className="w-full text-left block px-3 py-2 rounded-lg text-white bg-orange-500 hover:bg-orange-600 transition-colors"
                >
                  Logout
                </button>
              </li>
            )}
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