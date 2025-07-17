import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import "./ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for the field being edited
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSubmitError("");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!formData.email.toLowerCase().endsWith("@gmail.com")) {
      newErrors.email = "Email must end with @gmail.com";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/messages", formData);
      if (response.data.success) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        setSubmitError(response.data.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(error.response?.data?.message || "Server error");
    }
  };

  // Animation variants for 3D effect
  const cardVariants = {
    initial: { opacity: 0, y: -50, rotateX: -15, rotateY: 15 },
    animate: { opacity: 1, y: 0, rotateX: 0, rotateY: 0 },
    hover: { rotateX: 10, rotateY: -10, scale: 1.05, transition: { duration: 0.3 } },
  };

  const inputVariants = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    focus: { scale: 1.02, boxShadow: "0 0 8px rgba(93, 215, 253, 0.5)", transition: { duration: 0.2 } },
  };

  const dialogVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-100 via-indigo-200 to-pink-100 p-6">
      <motion.div
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-md bg-gradient-to-r from-purple-200 to-blue-200 rounded-2xl shadow-2xl p-6 border border-purple-600 transform perspective-1000 animate-3d-card"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div
            variants={inputVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-3 border border-purple-500 rounded-lg bg-white bg-opacity-50"
          >
            <label className="block text-base font-semibold text-gray-800 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-800 text-sm"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </motion.div>
          <motion.div
            variants={inputVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, delay: 0.6 }}
            className="p-3 border border-purple-500 rounded-lg bg-white bg-opacity-50"
          >
            <label className="block text-base font-semibold text-gray-800 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your Gmail address"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-800 text-sm"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </motion.div>
          <motion.div
            variants={inputVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, delay: 0.8 }}
            className="p-3 border border-purple-500 rounded-lg bg-white bg-opacity-50"
          >
            <label className="block text-base font-semibold text-gray-800 mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Enter your message"
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-800 text-sm resize-none"
            />
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
          </motion.div>
          {submitError && (
            <p className="text-red-500 text-sm text-center">{submitError}</p>
          )}
          <motion.button
            type="submit"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            whileHover={{ scale: 1.05, backgroundColor: "#1e3a8a" }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-600 text-white py-2 rounded-lg text-base font-semibold hover:bg-blue-700 transition duration-300"
          >
            Submit
          </motion.button>
        </form>
      </motion.div>

      {isSubmitted && (
        <motion.div
          variants={dialogVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div className="bg-gradient-to-r from-green-100 to-green-200 p-6 rounded-2xl shadow-2xl text-center max-w-sm w-full flex flex-col items-center">
            <div className="text-green-600 text-4xl mb-4">
              <FaCheckCircle />
            </div>
            <p className="text-gray-800 text-lg font-semibold">Message sent successfully!</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ContactUs;