import React, { useState } from 'react';
import logo from '../assets/logo.avif';
import { BsCart4 } from 'react-icons/bs';
import { GiCrossedAirFlows, GiHamburgerMenu } from 'react-icons/gi';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../redux/searchSlice';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const cartLength = useSelector((state) => state.cart.items.length);

  const navLinkStyle = ({ isActive }) =>
    isActive ? 'text-blue-600 dark:text-blue-400 font-bold' : '';

  return (
    <nav className="fixed top-0 z-50 w-full bg-white dark:bg-gray-900 text-black dark:text-white flex items-center justify-between px-4 md:px-20 py-5 shadow-md dark:shadow-lg transition-colors duration-300">

      {/* Logo */}
      <div>
        <img
          className="rounded-lg w-14 h-14 object-cover cursor-pointer"
          src={logo}
          alt="Logo"
        />
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-7">
        {/* Search Bar */}
        {location.pathname === '/' && (
          <li className="relative hidden lg:block">
            <input
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              type="search"
              placeholder="Search"
              className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white p-2 rounded-lg focus:outline focus:outline-blue-500 focus:bg-white dark:focus:bg-gray-800"
            />
          </li>
        )}
        {/* Home */}
        <li className="font-semibold">
          <NavLink to="/" className={navLinkStyle}>Home</NavLink>
        </li>
        {/* About */}
        <li className="font-semibold">
          <NavLink to="/about" className={navLinkStyle}>About</NavLink>
        </li>
        {/* Contact us */}
        <li className="font-semibold">
          <NavLink to="/contactUs" className={navLinkStyle}>Contact Us</NavLink>
        </li>
        {/* light or darkMode */}
        <li>
          <ThemeToggle />
        </li>
        {/* cart */}
        <li className="relative font-semibold">
          <NavLink to="/cart" className={navLinkStyle}>
            <BsCart4 className="text-xl" />
          </NavLink>
          <span className="absolute -top-3.5 -right-1 text-green-500 text-xs font-bold">
            {cartLength}
          </span>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden p-2 focus:outline-none text-black dark:text-white"
      >
        {menuOpen ? <GiCrossedAirFlows /> : <GiHamburgerMenu />}
      </button>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white dark:bg-gray-900 shadow-md dark:shadow-lg rounded-b-lg py-4 px-6 flex flex-col gap-4 md:hidden transition-colors duration-300">
          <NavLink to="/" onClick={() => setMenuOpen(false)} className={navLinkStyle}>Home</NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)} className={navLinkStyle}>About</NavLink>
          <NavLink to="/contactUs" onClick={() => setMenuOpen(false)} className={navLinkStyle}>Contact Us</NavLink>
          <div className="flex items-center justify-between">
            <NavLink to="/cart" onClick={() => setMenuOpen(false)} className={navLinkStyle}>
              <div className="relative flex items-center gap-2">
                <BsCart4 className="text-xl" />
                <span className="absolute -top-3.5 left-4 text-green-500 text-xs font-bold">
                  {cartLength}
                </span>
              </div>
            </NavLink>
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
