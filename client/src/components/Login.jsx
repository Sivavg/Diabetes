import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import "./LoginSuccess.css";

const SuccessScreen = ({ onClose }) => {
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onClose]);

  return (
    <motion.div
    className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
      <motion.div
      className="text-center glassmorphic p-8 rounded-2xl max-w-md w-full border-2 border-white"
        style={{ perspective: "1000px" }}
        initial={{ scale: 0.8, rotateY: -20 }}
        animate={{ scale: 1, rotateY: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        whileHover={{ scale: 1.02, rotateY: 5 }}
      >
        <div className="icon-container">
          <motion.div
            className="success-tick text-green-500 text-8xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
          >
            <FaCheckCircle />
          </motion.div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Login Successful!</h2>
        <motion.div
          className="bg-gradient-to-r from-yellow-200 to-yellow-300 border-l-4 border-yellow-600 p-4 mb-6 text-left rounded-xl shadow-lg"
          whileHover={{ scale: 1.05, rotateY: 10 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">⚠️ Disclaimer</h3>
          <p className="text-sm text-gray-800">1. This result is based on entered health indicators.</p>
          <p className="text-sm text-gray-800">2. It is only a prediction, not a medical diagnosis.</p>
          <p className="text-sm text-gray-800">3. Always consult a certified doctor before making decisions.</p>
          <p className="text-sm text-gray-800">4. Do not rely solely on app results for treatment.</p>
          <p className="text-sm text-gray-800">5. This tool is for educational and awareness purposes.</p>
        </motion.div>
        <p className="text-gray-200 text-lg">Redirecting to Home in {seconds} seconds...</p>
        <motion.svg
          className="animate-spin h-4 w-4 mt-2 mx-auto text-white"
          viewBox="0 0 24 24"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </motion.svg>
      </motion.div>
    </motion.div>
  );
};

const FailureScreen = ({ onClose, errorMessage }) => (
  <motion.div
    className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <motion.div
      className="text-center glassmorphic p-8 rounded-2xl max-w-md w-full border-2 border-white"
      style={{ perspective: "1000px" }}
      initial={{ scale: 0.8, rotateY: 20 }}
      animate={{ scale: 1, rotateY: 0 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.02, rotateY: -5 }}
    >
      <div className="icon-container">
        <motion.div
          className="failure-cross text-red-500 text-8xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
        >
          <FaTimesCircle />
        </motion.div>
      </div>
      <h2 className="text-3xl font-bold text-white mb-2">Login Failed</h2>
      <p className="text-gray-200 mb-4">{errorMessage || "Something went wrong."}</p>
      <motion.button
        onClick={onClose}
        className="px-6 py-3 bg-purple-600 text-white rounded-lg text-lg font-semibold hover:bg-pink-600 transition duration-300"
        whileHover={{ scale: 1.1, rotateY: 10 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        Try Again
      </motion.button>
    </motion.div>
  </motion.div>
);

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email && !pwd) {
      setErrorMessage("Please enter both email and password.");
      setIsSuccess(false);
      return;
    }
    if (email && !pwd) {
      setErrorMessage("Please enter your password.");
      setIsSuccess(false);
      return;
    }
    if (!email && pwd) {
      setErrorMessage("Please enter your email.");
      setIsSuccess(false);
      return;
    }

    setIsLoading(true);
    try {
      console.log("Sending login request to http://localhost:8000/api/auth/login with:", {
        email,
        password: pwd,
      });
      const response = await axios.post("http://localhost:8000/api/auth/login", {
        email,
        password: pwd,
      });

      console.log("Login response:", response.data);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setIsSuccess(true);
      } else {
        setErrorMessage(response.data.message || "Login failed.");
        setIsSuccess(false);
      }
    } catch (err) {
      console.error("Login Error Details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      if (err.message === "Network Error") {
        setErrorMessage(
          "Network Error: Unable to connect to the server. Please check if the server is running on http://localhost:8000."
        );
      } else {
        setErrorMessage(err.response?.data?.message || err.message || "Something went wrong.");
      }
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSuccess = () => {
    setIsSuccess(null);
    navigate("/home");
  };

  const handleCloseFailure = () => {
    setIsSuccess(null);
    setErrorMessage("");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col px-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob top-0 left-0"></div>
        <div className="absolute w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob bottom-0 right-0 animation-delay-2000"></div>
        <div className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob top-1/2 left-1/2 animation-delay-4000"></div>
      </div>

      <motion.header
        className="bg-transparent py-4 px-6 flex justify-center items-center"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        <h1 className="text-2xl font-bold text-white mt-5">Diabetes Prediction</h1>
      </motion.header>

      <div className="flex flex-grow items-center justify-center">
        <motion.div
          className="glassmorphic shadow-2xl rounded-3xl p-8 w-full max-w-md text-center"
          style={{ perspective: "1000px" }}
          initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          whileHover={{ scale: 1.02, rotateY: 5 }}
        >
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-300 mb-6">Sign in to continue</p>

          <div className="mb-4 text-left">
            <label className="block text-gray-200 text-sm font-semibold mb-2">Email</label>
            <motion.input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
              disabled={isLoading}
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
          </div>

          <div className="mb-6 text-left relative">
            <label className="block text-gray-200 text-sm font-semibold mb-2">Password</label>
            <motion.input
              type={showPassword ? "text" : "password"}
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-400 "
              disabled={isLoading}
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
          <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-2 bottom-1 transform -translate-y-1/2 text-gray-400 hover:text-white transition flex items-center"
              disabled={isLoading}
            >
              {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
            </button>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition duration-300 disabled:bg-gray-600"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>

          <p className="mt-6 text-sm text-gray-300">
            Don’t have an account?{" "}
            <motion.span
              whileHover={{ scale: 1.1, color: "#F472B6" }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to="/signup"
                className="text-pink-400 font-semibold hover:underline hover:text-pink-500"
              >
                Register
              </Link>
            </motion.span>
          </p>
        </motion.div>
      </div>

      <motion.footer
        className="bg-transparent py-4 text-center"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        <p className="text-gray-300 text-sm">© 2025 Diabetes Prediction. All rights reserved.</p>
      </motion.footer>

      <AnimatePresence>
        {isSuccess === true && <SuccessScreen onClose={handleCloseSuccess} />}
        {isSuccess === false && <FailureScreen onClose={handleCloseFailure} errorMessage={errorMessage} />}
      </AnimatePresence>
    </div>
  );
};

export default Login;