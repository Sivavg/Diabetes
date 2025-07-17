import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import axios from "axios";
import "./Doctors.css";

// Import local images from assets
import doctor1 from "../assets/doctor1.jpg";
import doctor2 from "../assets/doctor2.jpg";
import doctor3 from "../assets/doctor3.jpg";

// Static doctor data (all diabetes-related)
const doctors = [
  {
    id: 1,
    name: "Dr. Emily Carter",
    specialty: "Diabetes",
    description: "Expert in diabetes management, insulin therapy with 15+ years of experience.",
    contact: "emily.carter@diabetclinic.com",
    image: doctor1,
  },
  {
    id: 2,
    name: "Dr. Michael Lee",
    specialty: "Diabetes",
    description: "Specializes in diabetes, offering personalized treatment plans.",
    contact: "michael.lee@diabetclinic.com",
    image: doctor2,
  },
  {
    id: 3,
    name: "Dr. Sarah Patel",
    specialty: "Diabetes",
    description: "Guides patients on diet and lifestyle to manage blood sugar effectively.",
    contact: "sarah.patel@diabetclinic.com",
    image: doctor3,
  },
  {
    id: 4,
    name: "Dr. Rajesh Kumar",
    specialty: "Diabetes",
    description: "Renowned endocrinologist with focus on type 1 and type 2 diabetes care.",
    contact: "rajesh.kumar@diabetclinic.com",
    image: doctor1,
  },
  {
    id: 5,
    name: "Dr. Olivia Smith",
    specialty: "Diabetes",
    description: "Helps patients manage diabetes through a holistic health approach.",
    contact: "olivia.smith@diabetclinic.com",
    image: doctor2,
  },
  {
    id: 6,
    name: "Dr. David Kim",
    specialty: "Diabetes",
    description: "Focuses on advanced diabetes technologies and insulin pumps.",
    contact: "david.kim@diabetclinic.com",
    image: doctor3,
  },
  {
    id: 7,
    name: "Dr. Aisha Rahman",
    specialty: "Diabetes",
    description: "Experienced in pediatric diabetes and adolescent care.",
    contact: "aisha.rahman@diabetclinic.com",
    image: doctor1,
  },
  {
    id: 8,
    name: "Dr. James Thompson",
    specialty: "Diabetes",
    description: "Promotes lifestyle changes and continuous glucose monitoring.",
    contact: "james.thompson@diabetclinic.com",
    image: doctor2,
  },
  {
    id: 9,
    name: "Dr. Linda Zhang",
    specialty: "Diabetes",
    description: "Integrates traditional and modern treatments for diabetes.",
    contact: "linda.zhang@diabetclinic.com",
    image: doctor3,
  },
  {
    id: 10,
    name: "Dr. Carlos Rivera",
    specialty: "Diabetes",
    description: "Specialist in diabetic neuropathy and chronic complications.",
    contact: "carlos.rivera@diabetclinic.com",
    image: doctor1,
  },
];

const Doctors = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [showMessage, setShowMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showForm]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, date, time } = formData;

    // Check for required fields
    if (!name || !email || !phone || !date || !time) {
      setShowMessage({ type: "error", text: "Please fill in all required fields!" });
      setTimeout(() => setShowMessage(null), 2000);
      return;
    }

    // Email validation: must end with @gmail.com
    if (!email.toLowerCase().endsWith("@gmail.com")) {
      setShowMessage({ type: "error", text: "Email must be a valid Gmail address (ending with @gmail.com)!" });
      setTimeout(() => setShowMessage(null), 2000);
      return;
    }

    // Phone validation: exactly 10 digits
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      setShowMessage({ type: "error", text: "Phone number must be exactly 10 digits!" });
      setTimeout(() => setShowMessage(null), 2000);
      return;
    }

    setIsSubmitting(true);

    try {
      const appointmentData = {
        doctorName: selectedDoctor.name,
        specialty: selectedDoctor.specialty,
        patientName: name,
        email,
        phone,
        date,
        time,
      };

      const response = await axios.post("http://localhost:8000/api/appointments", appointmentData);

      setShowForm(false);
      setShowMessage({
        type: "success",
        text: `Appointment booked with ${selectedDoctor.name} on ${date} at ${time}!`,
      });
      setFormData({ name: "", email: "", phone: "", date: "", time: "" });
      setTimeout(() => setShowMessage(null), 3000);
    } catch (error) {
      console.error("Error booking appointment:", error);
      setShowMessage({
        type: "error",
        text: "Failed to book appointment. Please try again.",
      });
      setTimeout(() => setShowMessage(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setFormData({ name: "", email: "", phone: "", date: "", time: "" });
  };

  return (
    <div className="relative bg-gray-100 min-h-screen overflow-hidden">
      <div className="parallax-bg fixed inset-0 z-0"></div>
      <div className="relative z-10">
        <div className="bg-pink-800 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Our Diabetes Care Experts
            </h1>
            <p className="text-lg sm:text-xl max-w-3xl mx-auto">
              Meet our specialists dedicated to helping you manage diabetes through
              advanced treatments, nutrition, and lifestyle guidance.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-green-200 rounded-lg shadow-md p-6 mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Diabetes Management Tips
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Monitor blood sugar regularly to stay in control.</li>
              <li>Eat a balanced diet rich in fiber and low in processed sugars.</li>
              <li>Stay active with at least 30 minutes of exercise most days.</li>
              <li>Work closely with your doctor for personalized care.</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="doctor-card bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800">{doctor.name}</h2>
                  <p className="text-purple-600 font-medium mb-2">{doctor.specialty}</p>
                  <p className="text-gray-600 mb-4">{doctor.description}</p>
                  <p className="text-gray-700 font-medium mb-4">
                    Contact:{" "}
                    <a href={`mailto:${doctor.contact}`} className="text-purple-600 hover:underline">
                      {doctor.contact}
                    </a>
                  </p>
                  <button
                    onClick={() => handleBookAppointment(doctor)}
                    className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-200"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="dialogue-box mt-16 p-5 rounded-2xl shadow-xl w-full max-w-sm transform transition-all duration-300">
              <h2 className="text-xl font-semibold text-white mb-4 text-center">
                Book with {selectedDoctor.name}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-1" htmlFor="name">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white text-gray-800 transition-all duration-200"
                      placeholder="Full Name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-1" htmlFor="email">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white text-gray-800 transition-all duration-200"
                      placeholder="example@gmail.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-1" htmlFor="phone">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white text-gray-800 transition-all duration-200"
                      placeholder="1234567890"
                      pattern="\d{10}"
                      title="Phone number must be exactly 10 digits"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-1" htmlFor="date">
                      Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white text-gray-800 transition-all duration-200"
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-1" htmlFor="time">
                      Time *
                    </label>
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full p-2 text-sm border attorno-md focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white text-gray-800 transition-all duration-200"
                      required
                    >
                      <option value="">Select Time</option>
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-5">
                  <button
                    type="button"
                    onClick={closeForm}
                    className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 transition-colors duration-200 text-sm"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-700 text-white px-3 py-1 rounded-md hover:bg-blue-800 transition-colors duration-200 text-sm flex items-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 mr-1" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z" />
                        </svg>
                        Booking
                      </>
                    ) : (
                      "Book"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {showMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full flex flex-col items-center">
              <div
                className={`text-4xl mb-4 ${
                  showMessage.type === "success" ? "text-green-500" : "text-red-500"
                }`}
              >
                {showMessage.type === "success" ? <FaCheckCircle /> : <FaTimesCircle />}
              </div>
              <p className="text-gray-800 text-lg">{showMessage.text}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;