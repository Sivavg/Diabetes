import React, { useState } from "react";
import diabetesImg from "../assets/diabetes.jpeg";
import dataInfoImg from "../assets/dataInfo.jpeg";
import predictionImg from "../assets/prediction.jpeg";
import visualizationImg from "../assets/Visualization.jpeg";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Testimonials from "./Testimonials/Testimonials.jsx";

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handlePredictionClick = () => {
    setModalVisible(false);
    // Programmatically navigate to /prediction
    window.location.href = "/prediction";
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <div
        className="flex flex-col items-center justify-center min-h-screen w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${diabetesImg})`,
          backgroundColor: "rgba(0,0,0,0.4)",
          backgroundBlendMode: "multiply",
        }}
      >
        <div className="p-4 sm:p-8 text-center space-y-4 sm:space-y-6 w-full max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -150 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 100,
              delay: 0.5,
            }}
            className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight"
            style={{ fontFamily: "'Abhaya Libre ExtraBold', serif" }}
          >
            Welcome to the Diabetes Predictor!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 150 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              delay: 1,
            }}
            className="text-white font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight"
            style={{ fontFamily: "'Abhaya Libre ExtraBold', serif" }}
          >
            Know your risk
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 150 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              delay: 1.2,
            }}
            className="text-white font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight"
            style={{ fontFamily: "'Abhaya Libre ExtraBold', serif" }}
          >
            Take control of your health.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 150 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.85,
              type: "spring",
              stiffness: 100,
              delay: 1.2,
            }}
            className="w-full max-w-xs mx-auto bg-[#FF9900] border border-[#5C3200] rounded-lg p-2 sm:p-3"
          >
            <button
              onClick={openModal}
              className="block w-full text-white font-extrabold text-base sm:text-lg md:text-xl text-center"
              style={{ fontFamily: "'Abhaya Libre ExtraBold', serif" }}
            >
              GET STARTED
            </button>
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
              className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
            >
              <h2 className="text-2xl font-bold text-purple-800 mb-4">
                Diabetes Tips
              </h2>
              <p className="text-gray-700 mb-2">
                1. Maintain a healthy diet.
              </p>
              <p className="text-gray-700 mb-2">
                2. Exercise regularly to help control your blood sugar.
              </p>
              <p className="text-gray-700 mb-2">
                3. Monitor your blood sugar levels regularly.
              </p>
              <p className="text-gray-700 mb-6">
                4. Manage stress, as it can affect blood sugar levels.
              </p>
              <div className="flex flex-col space-y-4">
                <button
                  onClick={handlePredictionClick}
                  className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                >
                  Know Your Prediction
                </button>
                <button
                  onClick={closeModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition-colors duration-300"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Features Section */}
      <div className="container mx-auto my-8 px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 150 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 100,
            delay: 0.3,
          }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-purple-800 text-center"
        >
          Features
        </motion.h2>

        {/* Data Info */}
        <div className="flex flex-col md:flex-row gap-6 sm:gap-10 bg-purple-100 justify-center items-center mb-6 sm:mb-8 mx-0 sm:mx-4 md:mx-10 border p-4 rounded-md">
          <motion.div
            initial={{ opacity: 0, x: -150 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 100,
              delay: 0.5,
            }}
            className="w-full md:w-2/5 mb-4 md:mb-0"
          >
            <img
              src={dataInfoImg}
              alt="Data Info"
              className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-md"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 150 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 100,
              delay: 0.5,
            }}
            className="w-full md:w-2/3 bg-purple-100 p-4 rounded-md"
          >
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-purple-800">
              Data Info
            </h3>
            <p className="text-gray-700 text-sm sm:text-base md:text-lg mb-4">
              Explore and understand the data used for diabetes prediction. Get
              insights into the various features and their impact on the
              prediction model.
            </p>
            <Link
              to="/data-info"
              className="inline-block bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded text-sm sm:text-base transition-colors duration-300"
            >
              Learn More
            </Link>
          </motion.div>
        </div>

        {/* Prediction */}
        <div className="flex flex-col md:flex-row-reverse gap-6 sm:gap-10 bg-purple-100 justify-center items-center mb-6 sm:mb-8 mx-0 sm:mx-4 md:mx-10 border p-4 rounded-md">
          <motion.div
            initial={{ opacity: 0, x: -150 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 100,
              delay: 0.5,
            }}
            className="w-full md:w-2/5 mb-4 md:mb-0"
          >
            <img
              src={predictionImg}
              alt="Prediction"
              className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-md"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 150 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 100,
              delay: 0.5,
            }}
            className="w-full md:w-1/2 bg-purple-100 p-4 rounded-md"
          >
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-purple-800">
              Prediction
            </h3>
            <p className="text-gray-700 text-sm sm:text-base md:text-lg mb-4">
              Predict your likelihood of developing diabetes using our advanced
              algorithm. Enter your health data and get an accurate prediction.
            </p>
            <Link
              to="/prediction"
              className="inline-block bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded text-sm sm:text-base transition-colors duration-300"
            >
              Get Prediction
            </Link>
          </motion.div>
        </div>

        {/* Visualization */}
        <div className="flex flex-col md:flex-row gap-6 sm:gap-10 bg-purple-100 justify-center items-center mb-6 sm:mb-8 mx-0 sm:mx-4 md:mx-10 border p-4 rounded-md">
          <motion.div
            initial={{ opacity: 0, x: -150 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 100,
              delay: 0.5,
            }}
            className="w-full md:w-2/5 mb-4 md:mb-0"
          >
            <img
              src={visualizationImg}
              alt="Visualization"
              className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-md"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 150 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 100,
              delay: 0.5,
            }}
            className="w-full md:w-1/2 bg-purple-100 p-4 rounded-md"
          >
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-purple-800">
              Visualization
            </h3>
            <p className="text-gray-700 text-sm sm:text-base md:text-lg mb-4">
              Visualize the data and predictions with interactive charts and
              graphs. Gain deeper insights into the relationship between various
              features and diabetes.
            </p>
            <Link
              to="/visualization"
              className="inline-block bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded text-sm sm:text-base transition-colors duration-300"
            >
              Visualize Data
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Testimonials */}
      <motion.div
        initial={{ opacity: 0, x: -150 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 100,
          delay: 1,
        }}
        className="px-4 sm:px-6 lg:px-8"
      >
        <Testimonials />
      </motion.div>
    </div>
  );
};

export default Home;