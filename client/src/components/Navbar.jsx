

import React, { useState } from "react";
import { FaGithub, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { CiStar } from "react-icons/ci";
import logo_final from "../assets/logo_final.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      navigate("/");
    }
  };

  const logoStyle = {
    height: "60px",
    width: "60px",
    borderRadius: "50%",
    marginRight: "10px",
  };

  return (
    <nav className="bg-purple-800 sticky z-50 top-0 w-full" style={{ height: "5rem" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-20 w-full">
          <div className="flex items-center">
            <Link to="/home" className="text-white font-bold flex items-center">
              <img src={logo_final} alt="Logo" style={logoStyle} />
              <span className="ml-4 text-lg">DiaBet Prediction ❤️</span>
            </Link>
          </div>
          <div className="hidden md:flex">
            <div className="ml-10 flex items-center space-x-6">
              <NavLink to="/home">Home</NavLink>
              <NavLink to="/data-info">Data Info</NavLink>
              <NavLink to="/prediction">Prediction</NavLink>
              {/* <NavLink to="/visualization">Visualization</NavLink> */}
              <NavLink to="/contact">Contact&nbsp;Us</NavLink>
              <NavLink to="/FAQ">FAQ</NavLink>
              <button onClick={handleLogout} className="text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md text-md font-medium">
                Logout
              </button>
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
            >
              {isOpen ? <FaTimes className="block h-6 w-6" /> : <FaBars className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <>
        <div className="md:hidden fixed top-0 right-0 w-1/4 h-full bg-gray-800 bg-opacity-95 flex flex-col items-center space-y-4 py-5 shadow-lg">
          
          <NavLink to="/home" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/data-info" onClick={closeMenu}>Data Info</NavLink>
          <NavLink to="/prediction" onClick={closeMenu}>Prediction</NavLink>
          <NavLink to="/visualization" onClick={closeMenu}>Visualization</NavLink>
          <NavLink to="/contact" onClick={closeMenu}>Contact&nbsp;Us</NavLink>
          <NavLink to="/FAQ" onClick={closeMenu}>FAQ</NavLink>
          <button onClick={handleLogout} className="text-gray-300 hover:bg-gray-700 hover:text-white  px-4 py-2 rounded-md text-md font-medium">
            Logout
          </button>
          
        </div>
        
        </>
        
      )}
    </nav>
  );
};

const NavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md text-base font-medium whitespace-nowrap"
  >
    {children}
  </Link>
);

export default Navbar;
