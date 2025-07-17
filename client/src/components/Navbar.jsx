import React, { useState } from "react";
import { FaBars, FaTimes, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo_final from "../assets/logo_final.png";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showMessage, setShowMessage] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => setShowConfirm(true);
  const confirmLogout = () => {
    setShowConfirm(false);
    setShowMessage("logout");
    setTimeout(() => {
      navigate("/");
      setShowMessage(null);
    }, 2000);
  };

  const cancelLogout = () => {
    setShowConfirm(false);
    setShowMessage("cancel");
    setTimeout(() => setShowMessage(null), 2000);
  };

  return (
    <nav className="bg-purple-800 sticky top-0 z-50 w-full h-20 shadow-md flex items-center justify-center">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-8">
          {/* Logo Section */}
          <Link to="/home" className="flex items-center text-white font-bold">
            <img
              src={logo_final}
              alt="Logo"
              className="h-12 w-12 sm:h-14 sm:w-14 rounded-full mr-2 sm:mr-4"
            />
            <span className="text-lg sm:text-xl text-center">
              DiaBetic Prediction ❤️
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex flex-wrap justify-center gap-3 lg:gap-5">
            {[
              { to: "/home", label: "Home" },
              { to: "/data-info", label: "Data Info" },
              { to: "/prediction", label: "Prediction" },
              { to: "/visualization", label: "Visualization" },
              { to: "/doctors", label: "Doctors" },
              { to: "/contact", label: "Contact Us" },
              { to: "/FAQ", label: "FAQ" },
              { to: "/tips-lifestyle", label: "Tips" },
            ].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm lg:text-base font-medium transition-colors duration-200 ${
                    isActive ? "bg-gray-700 text-white" : ""
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm lg:text-base font-medium transition-colors duration-200"
            >
              Logout
            </button>
          </div>

          {/* Hamburger Menu Button */}
          <div className="md:hidden absolute right-4 top-4">
            <button
              onClick={toggleMenu}
              className="bg-gray-800 p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
            >
              {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed top-20 right-0 w-3/4 sm:w-1/2 h-[calc(100vh-5rem)] bg-gray-800 bg-opacity-95 flex flex-col items-center justify-center space-y-4 py-6 shadow-lg transition-transform duration-300">
          {[
            { to: "/home", label: "Home" },
            { to: "/data-info", label: "Data Info" },
            { to: "/prediction", label: "Prediction" },
            { to: "/visualization", label: "Visualization" },
            { to: "/doctors", label: "Doctors" },
            { to: "/contact", label: "Contact Us" },
            { to: "/FAQ", label: "FAQ" },
            { to: "/tips-lifestyle", label: "Tips" },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={closeMenu}
              className={({ isActive }) =>
                `text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md text-base font-medium text-center w-full ${
                  isActive ? "bg-gray-700 text-white" : ""
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className="text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md text-base font-medium text-center w-full"
          >
            Logout
          </button>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
            <div className="text-3xl mb-4">⚠️</div>
            <p className="text-gray-800 text-lg mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmLogout}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium"
              >
                OK
              </button>
              <button
                onClick={cancelLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Message */}
      {showMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full flex flex-col items-center">
            <div className={`text-4xl mb-4 ${showMessage === "logout" ? "text-green-500" : "text-red-500"}`}>
              {showMessage === "logout" ? <FaCheckCircle /> : <FaTimesCircle />}
            </div>
            <p className="text-gray-800 text-lg">
              {showMessage === "logout" ? "Logout Successful!" : "Logout Cancelled!"}
            </p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
