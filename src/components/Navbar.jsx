import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const menuItems = ['Dashboard', 'About', 'Features', 'Contact', 'Login'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 py-3 w-full z-50 transition-shadow duration-300 bg-gradient-to-r from-blue-600 via-blue-400 to-red-500
 text-white ${
        isScrolled ? 'shadow-lg' : 'shadow-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white">
          Inv<span className="text-red-400">Track</span>
        </Link>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Menu Links */}
        <div className="hidden md:flex space-x-6 text-sm md:text-base">
          {menuItems.map((item) => (
            <NavLink
              key={item}
              to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              className={({ isActive }) =>
                isActive
                  ? 'underline text-white font-semibold'
                  : 'hover:text-blue-200 transition'
              }
            >
              {item}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden px-4 pb-4 flex flex-col gap-2 transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        {menuItems.map((item) => (
          <NavLink
            key={item}
            to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive
                ? 'block text-white font-semibold underline'
                : 'block hover:text-blue-200 transition'
            }
          >
            {item}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
