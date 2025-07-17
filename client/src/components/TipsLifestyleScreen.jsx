// client/src/components/TipsLifestyle.jsx

import React, { useState } from 'react';
import { FaCheckCircle, FaDumbbell } from 'react-icons/fa';
import { motion } from 'framer-motion';

const TipsLifestyle = () => {
  const [tipType, setTipType] = useState('daily');

  const tips = {
    daily: [
      "Drink plenty of water – aim for 8 glasses daily.",
      "Walk for 30 minutes a day to help control blood sugar.",
      "Avoid sugary snacks – choose fruits or nuts instead.",
      "Check your blood sugar at the same time every day.",
      "Add leafy greens like spinach or kale to your meals."
    ],
    weekly: [
      "Meal prep healthy foods to avoid last-minute unhealthy choices.",
      "Try a new healthy recipe with whole grains and lean proteins.",
      "Join a yoga or light fitness class to stay active.",
      "Review your glucose readings and identify patterns.",
      "Cut out sugary drinks like soda and sweetened tea for a week."
    ]
  };

  const recipes = [
    {
      title: "Oats & Berries Breakfast Bowl",
      description: "Oats with almond milk, chia seeds, and fresh berries."
    },
    {
      title: "Grilled Salmon & Veggies",
      description: "High-protein, low-carb lunch with broccoli and carrots."
    },
    {
      title: "Quinoa Salad",
      description: "With cucumbers, tomatoes, olive oil, and lemon juice."
    }
  ];

  const exercises = [
    "30-minute brisk walking",
    "15-minute bodyweight workout",
    "Yoga or stretching routine",
    "Cycling or swimming",
    "Deep breathing or meditation"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 py-12 px-4 flex justify-center items-start">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl p-8"
      >
        <h2 className="text-4xl font-bold text-center text-blue-800 mb-8 drop-shadow">Tips & Lifestyle</h2>

        {/* Toggle */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setTipType('daily')}
            className={`px-6 py-2 rounded-l-full shadow transition-all duration-300 ${
              tipType === 'daily' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            Daily Tips
          </button>
          <button
            onClick={() => setTipType('weekly')}
            className={`px-6 py-2 rounded-r-full shadow transition-all duration-300 ${
              tipType === 'weekly' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            Weekly Tips
          </button>
        </div>

        {/* Tips List */}
        <div className="space-y-4 mb-10">
          {tips[tipType].map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start bg-blue-50 rounded-xl p-4 shadow-md hover:scale-[1.02] transition-transform"
            >
              <FaCheckCircle className="text-green-500 mr-3 mt-1" />
              <p className="text-gray-800">{tip}</p>
            </motion.div>
          ))}
        </div>

        {/* Healthy Recipes */}
        <h3 className="text-2xl font-semibold text-purple-800 mb-4">🍲 Healthy Recipes</h3>
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {recipes.map((recipe, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 * index }}
              className="bg-white border border-purple-200 p-4 rounded-2xl shadow-lg hover:shadow-2xl transition"
            >
              <h4 className="text-lg font-bold text-purple-900 mb-1">{recipe.title}</h4>
              <p className="text-gray-700 text-sm">{recipe.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Exercise Tips */}
        <h3 className="text-2xl font-semibold text-orange-700 mb-4">💪 Exercise Tips</h3>
        <div className="space-y-3">
          {exercises.map((exercise, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start bg-orange-50 p-3 rounded-xl shadow hover:scale-[1.01] transition-transform"
            >
              <FaDumbbell className="text-orange-500 mr-3 mt-1" />
              <p className="text-gray-800">{exercise}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TipsLifestyle;
