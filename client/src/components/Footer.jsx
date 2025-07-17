import { FaLinkedinIn, FaGithub, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../assets/tab-icon.png'; // Ensure logo is small (e.g., 50x50px)

const Footer = () => {
  return (
    <footer className="bg-purple-900 text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div className="space-y-4">
          <Link to="/home" className="flex items-center space-x-2">
            <img src={logo} alt="Diabetes Prediction Logo" className="w-10 h-10" />
            <span className="text-xl font-bold hover:text-gray-300">Diabetes Prediction</span>
          </Link>
          <p className="text-gray-400 text-xs max-w-[200px]">
            Predict your diabetes risk with ease.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/home" className="text-gray-300 hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/FAQ" className="text-gray-300 hover:text-white">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/prediction" className="text-gray-300 hover:text-white">
                Prediction
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-300 hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center">
              <FaMapMarkerAlt className="mr-2 text-base" />
              <a href="#" className="hover:text-white">
                Madurai, TN, India
              </a>
            </li>
            <li className="flex items-center">
              <FaEnvelope className="mr-2 text-base" />
              <a href="mailto:dhonisivanath007@gmail.com" className="hover:text-white">
                dhonisivanath007@gmail.com
              </a>
            </li>
            <li className="flex items-center">
              <FaPhone className="mr-2 text-base" />
              <a href="tel:+919994495686" className="hover:text-white">
                +91 99944 95686
              </a>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Stay Connected</h3>
          <div className="flex space-x-4">
            <a
              href="https://www.linkedin.com/in/sivanath-babu-v-g-7451b0252/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-300 hover:text-white"
            >
              <FaLinkedinIn className="text-xl" />
            </a>
            <a
              href="https://github.com/Sivavg"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-gray-300 hover:text-white"
            >
              <FaGithub className="text-xl" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 pt-4 border-t border-gray-700 text-center text-sm text-gray-400">
        <p>
          © {new Date().getFullYear()} Diabetes Prediction. All rights reserved. |{' '}
          <a
            href="https://github.com/Sivavg"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            Developed by Sivanath Babu
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;