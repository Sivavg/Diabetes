import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

// Note: Add the following CSS to a global stylesheet or Signup.css for blob animations, glassmorphism, and animations
/*
@keyframes blob {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(20px, -30px) scale(1.1); }
  50% { transform: translate(-20px, 30px) scale(0.9); }
  75% { transform: translate(30px, 20px) scale(1.05); }
}
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }
.glassmorphic {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.success-tick {
  animation: pop 0.8s ease-in-out;
}
.failure-cross {
  animation: shake 0.8s ease-in-out;
}
@keyframes pop {
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}
*/

// ✅ Inline Success Component
const InlineSuccess = ({ message }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "http://localhost:5173/"; // Redirect to home
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center mt-4"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="success-tick text-green-500 text-6xl mb-2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
      >
        <FaCheckCircle />
      </motion.div>
      <h2 className="text-xl font-bold text-white mb-1">{message}</h2>
      <p className="text-sm text-gray-300">Redirecting to login page...</p>
    </motion.div>
  );
};

// ❌ Inline Failure Component
const InlineFailure = ({ message, onClose }) => (
  <motion.div
    className="flex flex-col items-center justify-center text-center mt-4"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <motion.div
      className="failure-cross text-red-500 text-6xl mb-2"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
    >
      <FaTimesCircle />
    </motion.div>
    <h2 className="text-xl font-bold text-white mb-1">Signup Failed</h2>
    <p className="text-sm text-gray-300 mb-4">{message}</p>
    <motion.button
      onClick={onClose}
      className="px-6 py-2 bg-purple-600 text-white rounded-xl text-base font-semibold hover:bg-pink-600 transition duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      Try Again
    </motion.button>
  </motion.div>
);

// 🔐 Signup Component
const Signup = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    return email.toLowerCase().endsWith("@gmail.com");
  };

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasMinLength = password.length >= 6;
    return hasUppercase && hasSpecialChar && hasNumber && hasMinLength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Client-side validation
    if (!formData.username || !formData.email || !formData.password) {
      setSuccess(false);
      setMessage("All fields are required.");
      return;
    }

    if (!validateEmail(formData.email)) {
      setSuccess(false);
      setMessage("Please provide correct email format (must end with @gmail.com).");
      return;
    }

    if (!validatePassword(formData.password)) {
      setSuccess(false);
      setMessage(
        "Password must contain at least one uppercase letter, one special character, one number, and be at least 6 characters long."
      );
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/auth/signup", formData);
      if (res.data.success) {
        setSuccess(true);
        setMessage("Signup successful!");
      }
    } catch (err) {
      console.error("Error response:", err.response?.data); // Log the error response for debugging
      setSuccess(false);
      const errorMessage = err.response?.data?.message?.toLowerCase();
      if (errorMessage?.includes("email")) {
        setMessage("Email already registered, please use a different email.");
      } else if (
        errorMessage?.includes("username") ||
        errorMessage?.includes("user") ||
        errorMessage?.includes("duplicate") ||
        errorMessage?.includes("taken") ||
        errorMessage?.includes("exists")
      ) {
        setMessage("Username already taken, please choose a different username.");
      } else {
        setMessage(errorMessage || "Server error during signup. Try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFailureClose = () => {
    setSuccess(null);
    setMessage("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden px-4">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob top-0 left-0"></div>
        <div className="absolute w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob bottom-0 right-0 animation-delay-2000"></div>
        <div className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob top-1/2 left-1/2 animation-delay-4000"></div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-10 glassmorphic p-10 rounded-3xl shadow-2xl w-full max-w-md text-center border border-gray-100"
      >
        <AnimatePresence>
          {success === true ? (
            <InlineSuccess message={message} />
          ) : success === false ? (
            <InlineFailure message={message} onClose={handleFailureClose} />
          ) : (
            <>
              <h2 className="text-4xl font-extrabold text-white mb-3">Create Your Account</h2>
              <p className="text-gray-300 mb-6 text-sm">Join us and start your wellness journey today!</p>

              <motion.input
                type="text"
                name="username"
                placeholder="👤 Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full mb-4 px-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                disabled={isLoading}
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
              <motion.input
                type="email"
                name="email"
                placeholder="📧 Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mb-4 px-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                disabled={isLoading}
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
              <div className="relative w-full mb-6">
                <motion.input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="🔒 Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                  disabled={isLoading}
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
                  disabled={isLoading}
                >
                  {showPassword ? <FaEye size={20} /> : <FaEyeSlash  size={20} />}
                </button>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl text-lg font-semibold transition duration-300 shadow-md ${
                  isLoading ? "opacity-60 cursor-not-allowed" : "hover:from-purple-700 hover:to-pink-700"
                }`}
                whileHover={{ scale: isLoading ? 1 : 1.1, rotateY: isLoading ? 0 : 10 }}
                whileTap={{ scale: isLoading ? 1 : 0.95 }}
                transition={{ duration: 0.2 }}
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
                    Creating...
                  </span>
                ) : (
                  "Sign Up"
                )}
              </motion.button>

              <p className="mt-6 text-sm text-gray-300">
                Already have an account?{" "}
                <motion.span
                  whileHover={{ scale: 1.1, color: "#F472B6" }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to="/"
                    className="text-pink-400 font-medium hover:underline hover:text-pink-500"
                  >
                    Log in
                  </Link>
                </motion.span>
              </p>
            </>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};

export default Signup;