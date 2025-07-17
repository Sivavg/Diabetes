
//last

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Prediction = () => {
  const [userInput, setUserInput] = useState({
    Age: "",
    Glucose: "",
    BloodPressure: "",
    Insulin: "",
    BMI: "",
    SkinThickness: "",
    DPF: "",
    // PhoneNumber: "", // Added phone number field
  });

  const [prediction, setPrediction] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [showDosDonts, setShowDosDonts] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
          "http://127.0.0.1:8000/predict",
        //"https://server-7j9i.onrender.com/predict",

        {
          Age: userInput.Age,
          Glucose: userInput.Glucose,
          BloodPressure: userInput.BloodPressure,
          Insulin: userInput.Insulin,
          BMI: userInput.BMI,
          SkinThickness: userInput.SkinThickness,
          DPF: userInput.DPF,
        },
        { timeout: 100000 }
      );
      setPrediction(response.data);
    } catch (error) {
      console.error("Error:", error);
      setError("Prediction is taking longer than expected. Please try again later.");
    } finally {
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  const sendToWhatsApp = () => {
    const phoneNumber = userInput.PhoneNumber.replace(/\D/g, ""); // Remove non-digits
    if (!phoneNumber) {
      alert("Please enter a valid phone number.");
      return;
    }

    const message = `
Diabetes Prediction Result:
- Age: ${userInput.Age}
- Glucose: ${userInput.Glucose}
- Blood Pressure: ${userInput.BloodPressure}
- Insulin: ${userInput.Insulin}
- BMI: ${userInput.BMI}
- Skin Thickness: ${userInput.SkinThickness}
- DPF: ${userInput.DPF}
- Prediction: ${prediction ? prediction.prediction : "Not available yet"}
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const chartData = {
    labels: ["Age", "Glucose", "Blood Pressure", "Insulin", "BMI", "Skin Thickness", "DPF"],
    datasets: [
      {
        label: "User Input Values",
        data: [
          userInput.Age,
          userInput.Glucose,
          userInput.BloodPressure,
          userInput.Insulin,
          userInput.BMI,
          userInput.SkinThickness,
          userInput.DPF,
        ],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "User Input Values" },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 flex flex-col items-center justify-center pb-3 md:pb-0">
      <div className="flex flex-col sm:flex-row items-center justify-center w-full px-4">
        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, x: -150 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", stiffness: 100, delay: 0.5 }}
          className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-10"
        >
          <h1 className="text-3xl font-bold mb-6 text-center text-purple-800">Enter all details</h1>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.keys(userInput).map((key) => (
                <div key={key} className="mb-4">
                  <label htmlFor={key} className="block text-gray-700 font-bold mb-2">
                    {key}
                  </label>
                  <input
                    type={key === "PhoneNumber" ? "tel" : "number"}
                    name={key}
                    value={userInput[key]}
                    onChange={handleChange}
                    required
                    placeholder={key === "PhoneNumber" ? "e.g., +1234567890" : ""}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className={`py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 ${
                  buttonDisabled
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-purple-500 hover:bg-purple-700 text-white font-bold"
                }`}
                disabled={buttonDisabled}
              >
                Predict
              </button>
            </div>
          </form>
        </motion.div>

        {/* Prediction Display Section */}
        <motion.div
          initial={{ opacity: 0, x: 150 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", stiffness: 100, delay: 0.5 }}
          className="w-full sm:w-auto mx-auto mt-8 sm:mt-0 sm:ml-8"
        >
          {loading && (
            <div className="text-center text-white text-lg font-bold flex items-center justify-center">
              <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-4 border-white" role="status">
                {/* <span className="visually-hidden">Processing...</span> */}
              </div>
              <span className="ml-2">Processing... This might take a few moments.</span>
            </div>
          )}

          {error && (
            <div className="text-center text-white-500 text-lg font-bold">
              {error}
            </div>
          )}

          {prediction && (
            <div className="bg-green-100 border mx-auto flex flex-col gap-5 border-green-400 text-green-700 py-2 rounded text-center max-w-3xl">
              <p className="font-bold text-2xl px-3 mx-2">{prediction.prediction}</p>
              <div className="flex justify-center space-x-4 mt-4">
                <button
                  onClick={() => {
                    setShowChart(true);
                    setShowDosDonts(false);
                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Show Bar Chart
                </button>
                <button
                  onClick={() => {
                    setShowChart(false);
                    setShowDosDonts(true);
                  }}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Diabetes Do's and Don'ts
                </button>
                {/* <button
                  onClick={sendToWhatsApp}
                  className="bg-[#25D366] hover:bg-[#20b356] text-white font-bold py-2 px-4 rounded"
                >
                  Send to WhatsApp
                </button> */}
              </div>
            </div>
          )}

          {!prediction && !loading && !error && (
            <div className="bg-white p-6 rounded-lg shadow-lg mx-4 sm:mx-0 mt-4 sm:mt-0 w-full max-w-3xl">
              <h2 className="text-2xl font-bold mb-4 text-purple-800 text-center">
                About the Parameters
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li><strong>Age:</strong> The age of the patient. Age is a risk factor because the likelihood of developing diabetes increases as you get older.</li>
                <li><strong>Glucose:</strong> Plasma glucose concentration after a 2-hour oral glucose tolerance test. High glucose levels are a primary indicator of diabetes.</li>
                <li><strong>Blood Pressure:</strong> Diastolic blood pressure (mm Hg). High blood pressure is associated with an increased risk of diabetes and its complications.</li>
                <li><strong>Insulin:</strong> 2-Hour serum insulin (mu U/ml). Abnormal insulin levels can be a sign of insulin resistance, a condition often associated with diabetes.</li>
                <li><strong>BMI:</strong> Body Mass Index (weight in kg/(height in m)^2). Higher BMI values indicate obesity, which is a major risk factor for diabetes.</li>
                <li><strong>Skin Thickness:</strong> Triceps skin fold thickness (mm). This measure can indicate body fat distribution, which is related to diabetes risk.</li>
                <li><strong>DPF:</strong> Diabetes Pedigree Function. This function estimates the genetic impact on diabetes by considering family history, helping to understand hereditary risk.</li>
          
              </ul>
            </div>
          )}
          <br />

          {showChart && (
            <div className="bg-white p-6 rounded-lg shadow-lg mx-4 sm:mx-0 mt-4 sm:mt-0 w-full max-w-3xl">
              <h2 className="text-2xl font-bold mb-4 text-purple-800 text-center">User Input Values</h2>
              <div style={{ height: "200px", width: "100%" }}>
                <Bar data={chartData} options={options} />
              </div>
            </div>
          )}

          {showDosDonts && (
            <div className="bg-white p-6 rounded-lg shadow-lg mx-4 sm:mx-0 mt-4 sm:mt-0 w-full max-w-3xl">
              <h2 className="text-2xl font-bold mb-4 text-purple-800 text-center">Diabetes Do's and Don'ts</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li><strong>Do:</strong> Maintain a healthy diet rich in fruits, vegetables, and whole grains.</li>
                <li><strong>Do:</strong> Exercise regularly to manage weight and improve insulin sensitivity.</li>
                <li><strong>Do:</strong> Monitor blood sugar levels regularly.</li>
                <li><strong>Don't:</strong> Consume excessive amounts of sugar and processed foods.</li>
                <li><strong>Don't:</strong> Skip meals or overeat.</li>
                <li><strong>Don't:</strong> Ignore symptoms of high or low blood sugar.</li>
              </ul>
            </div>
          )}
          <br />
        </motion.div>
      </div>
    </div>
  );
};

export default Prediction;


// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const Prediction = () => {
//   const [userInput, setUserInput] = useState({
//     Age: "",
//     Glucose: "",
//     BloodPressure: "",
//     Insulin: "",
//     BMI: "",
//     SkinThickness: "",
//     DPF: "",
//     PhoneNumber: "", // Added phone number field
//   });

//   const [prediction, setPrediction] = useState(null);
//   const [buttonDisabled, setButtonDisabled] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [showChart, setShowChart] = useState(false);
//   const [showDosDonts, setShowDosDonts] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserInput((prevInput) => ({
//       ...prevInput,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setButtonDisabled(true);
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.post(
//          "http://127.0.0.1:8000/predict",
//         {
//           Age: userInput.Age,
//           Glucose: userInput.Glucose,
//           BloodPressure: userInput.BloodPressure,
//           Insulin: userInput.Insulin,
//           BMI: userInput.BMI,
//           SkinThickness: userInput.SkinThickness,
//           DPF: userInput.DPF,
//         },
//         { timeout: 100000 }
//       );
//       setPrediction(response.data);
//     } catch (error) {
//       console.error("Error:", error);
//       setError("Prediction is taking longer than expected. Please try again later.");
//     } finally {
//       setLoading(false);
//       setButtonDisabled(false);
//     }
//   };

//   const sendToWhatsApp = async () => {
//     const phoneNumber = userInput.PhoneNumber.replace(/\D/g, ""); // Remove non-digits
//     if (!phoneNumber) {
//       alert("Please enter a valid phone number.");
//       return;
//     }

//     const message = `
// Diabetes Prediction Result:
// - Age: ${userInput.Age}
// - Glucose: ${userInput.Glucose}
// - Blood Pressure: ${userInput.BloodPressure}
// - Insulin: ${userInput.Insulin}
// - BMI: ${userInput.BMI}
// - Skin Thickness: ${userInput.SkinThickness}
// - DPF: ${userInput.DPF}
// - Prediction: ${prediction ? prediction.prediction : "Not available yet"}
//     `.trim();

//     try {
//       const response = await axios.post("http://localhost:3000/send-whatsapp", {
//         to: phoneNumber,
//         message: message,
//       });
//       alert("Message sent successfully!");
//     } catch (error) {
//       console.error("Error sending message:", error);
//       alert("Failed to send message. Please try again later.");
//     }
//   };

//   const chartData = {
//     labels: ["Age", "Glucose", "Blood Pressure", "Insulin", "BMI", "Skin Thickness", "DPF"],
//     datasets: [
//       {
//         label: "User Input Values",
//         data: [
//           userInput.Age,
//           userInput.Glucose,
//           userInput.BloodPressure,
//           userInput.Insulin,
//           userInput.BMI,
//           userInput.SkinThickness,
//           userInput.DPF,
//         ],
//         backgroundColor: "rgba(75, 192, 192, 0.6)",
//         borderColor: "rgba(75, 192, 192, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: "top" },
//       title: { display: true, text: "User Input Values" },
//     },
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 flex flex-col items-center justify-center pb-3 md:pb-0">
//       <div className="flex flex-col sm:flex-row items-center justify-center w-full px-4">
//         {/* Form Section */}
//         <motion.div
//           initial={{ opacity: 0, x: -150 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 1, type: "spring", stiffness: 100, delay: 0.5 }}
//           className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-10"
//         >
//           <h1 className="text-3xl font-bold mb-6 text-center text-purple-800">Enter all details</h1>
//           <form onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {Object.keys(userInput).map((key) => (
//                 <div key={key} className="mb-4">
//                   <label htmlFor={key} className="block text-gray-700 font-bold mb-2">
//                     {key}
//                   </label>
//                   <input
//                     type={key === "PhoneNumber" ? "tel" : "number"}
//                     name={key}
//                     value={userInput[key]}
//                     onChange={handleChange}
//                     required
//                     placeholder={key === "PhoneNumber" ? "e.g., +1234567890" : ""}
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-purple-500"
//                   />
//                 </div>
//               ))}
//             </div>
//             <div className="flex justify-center mt-6">
//               <button
//                 type="submit"
//                 className={`py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 ${
//                   buttonDisabled
//                     ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                     : "bg-purple-500 hover:bg-purple-700 text-white font-bold"
//                 }`}
//                 disabled={buttonDisabled}
//               >
//                 Predict
//               </button>
//             </div>
//           </form>
//         </motion.div>

//         {/* Prediction Display Section */}
//         <motion.div
//           initial={{ opacity: 0, x: 150 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 1, type: "spring", stiffness: 100, delay: 0.5 }}
//           className="w-full sm:w-auto mx-auto mt-8 sm:mt-0 sm:ml-8"
//         >
//           {loading && (
//             <div className="text-center text-white text-lg font-bold flex items-center justify-center">
//               <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-4 border-white" role="status">
//                 {/* <span className="visually-hidden">Processing...</span> */}
//               </div>
//               <span className="ml-2">Processing... This might take a few moments.</span>
//             </div>
//           )}

//           {error && (
//             <div className="text-center text-white-500 text-lg font-bold">
//               {error}
//             </div>
//           )}

//           {prediction && (
//             <div className="bg-green-100 border mx-auto flex flex-col gap-5 border-green-400 text-green-700 py-2 rounded text-center max-w-3xl">
//               <p className="font-bold text-2xl px-3 mx-2">{prediction.prediction}</p>
//               <div className="flex justify-center space-x-4 mt-4">
//                 <button
//                   onClick={() => {
//                     setShowChart(true);
//                     setShowDosDonts(false);
//                   }}
//                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 >
//                   Show Bar Chart
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowChart(false);
//                     setShowDosDonts(true);
//                   }}
//                   className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//                 >
//                   Diabetes Do's and Don'ts
//                 </button>
//                 <button
//                   onClick={sendToWhatsApp}
//                   className="bg-[#25D366] hover:bg-[#20b356] text-white font-bold py-2 px-4 rounded"
//                 >
//                   Send to WhatsApp
//                 </button>
//               </div>
//             </div>
//           )}

//           {!prediction && !loading && !error && (
//             <div className="bg-white p-6 rounded-lg shadow-lg mx-4 sm:mx-0 mt-4 sm:mt-0 w-full max-w-3xl">
//               <h2 className="text-2xl font-bold mb-4 text-purple-800 text-center">
//                 About the Parameters
//               </h2>
//               <ul className="list-disc pl-5 space-y-2 text-gray-700">
//                 <li><strong>Age:</strong> The age of the patient. Age is a risk factor because the likelihood of developing diabetes increases as you get older.</li>
//                 <li><strong>Glucose:</strong> Plasma glucose concentration after a 2-hour oral glucose tolerance test. High glucose levels are a primary indicator of diabetes.</li>
//                 <li><strong>Blood Pressure:</strong> Diastolic blood pressure (mm Hg). High blood pressure is associated with an increased risk of diabetes and its complications.</li>
//                 <li><strong>Insulin:</strong> 2-Hour serum insulin (mu U/ml). Abnormal insulin levels can be a sign of insulin resistance, a condition often associated with diabetes.</li>
//                 <li><strong>BMI:</strong> Body Mass Index (weight in kg/(height in m)^2). Higher BMI values indicate obesity, which is a major risk factor for diabetes.</li>
//                 <li><strong>Skin Thickness:</strong> Triceps skin fold thickness (mm). This measure can indicate body fat distribution, which is related to diabetes risk.</li>
//                 <li><strong>DPF:</strong> Diabetes Pedigree Function. This function estimates the genetic impact on diabetes by considering family history, helping to understand hereditary risk.</li>

//               </ul>
//             </div>
//           )}
//           <br />

//           {showChart && (
//             <div className="bg-white p-6 rounded-lg shadow-lg mx-4 sm:mx-0 mt-4 sm:mt-0 w-full max-w-3xl">
//               <h2 className="text-2xl font-bold mb-4 text-purple-800 text-center">User Input Values</h2>
//               <div style={{ height: "200px", width: "100%" }}>
//                 <Bar data={chartData} options={options} />
//               </div>
//             </div>
//           )}

//           {showDosDonts && (
//             <div className="bg-white p-6 rounded-lg shadow-lg mx-4 sm:mx-0 mt-4 sm:mt-0 w-full max-w-3xl">
//               <h2 className="text-2xl font-bold mb-4 text-purple-800 text-center">Diabetes Do's and Don'ts</h2>
//               <ul className="list-disc pl-5 space-y-2 text-gray-700">
//                 <li><strong>Do:</strong> Maintain a healthy diet rich in fruits, vegetables, and whole grains.</li>
//                 <li><strong>Do:</strong> Exercise regularly to manage weight and improve insulin sensitivity.</li>
//                 <li><strong>Do:</strong> Monitor blood sugar levels regularly.</li>
//                 <li><strong>Don't:</strong> Consume excessive amounts of sugar and processed foods.</li>
//                 <li><strong>Don't:</strong> Skip meals or overeat.</li>
//                 <li><strong>Don't:</strong> Ignore symptoms of high or low blood sugar.</li>
//               </ul>
//             </div>
//           )}
//           <br />
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Prediction;
