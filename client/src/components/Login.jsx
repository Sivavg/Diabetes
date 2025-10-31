// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const navigate = useNavigate();
//   const [uname, setUname] = useState("");
//   const [pwd, setPwd] = useState("");

//   const handleLogin = () => {
//     if (uname === "admin" && pwd === "siva") {
//       alert("Login Successful!");
//       navigate("/home");
//     } else {
//       alert("Invalid Credentials!");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 px-4">
//       {/* Header */}
//       <header className="bg-white shadow-md py-4 px-6 flex justify-center items-center rounded-b-3xl">
//         <h1 className="text-2xl font-bold text-gray-800">Diabetes Prediction</h1>
//       </header>
      
//       {/* Login Section */}
//       <div className="flex items-center justify-center min-h-[80vh]">
//         <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-md text-center">
//           <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
//           <p className="text-gray-500 mb-6">Sign in to continue</p>
          
//           <div className="mb-4 text-left">
//             <label className="block text-gray-700 text-sm font-semibold mb-2">Username</label>
//             <input 
//               type="text" 
//               value={uname} 
//               onChange={(e) => setUname(e.target.value)} 
//               placeholder="Enter your username"
//               className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
//             />
//           </div>
          
//           <div className="mb-6 text-left">
//             <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
//             <input 
//               type="password" 
//               value={pwd} 
//               onChange={(e) => setPwd(e.target.value)} 
//               placeholder="Enter your password"
//               className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
//             />
//           </div>
          
//           <button 
//             onClick={handleLogin} 
//             className="w-full bg-purple-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-pink-600 transition duration-300"
//           >
//             Login
//           </button>
          
//           {/* <p className="text-sm text-gray-500 mt-4">Forgot password? <span className="text-pink-500 cursor-pointer hover:underline">Reset here</span></p> */}
//         </div>
//       </div>
//     </div>
//   );
// };

//export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [uname, setUname] = useState("");
  const [pwd, setPwd] = useState("");

  const handleLogin = () => {
    if (uname === "admin" && pwd === "siva") {
      alert("Login Successful!");
      navigate("/home");
    } else {
      alert("Invalid Credentials!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 px-4">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-6 flex justify-center items-center rounded-b-3xl">
        <h1 className="text-2xl font-bold text-gray-800">Diabetes Prediction</h1>
      </header>
      
      {/* Login Section */}
      <div className="flex flex-grow items-center justify-center">
        <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-md text-center">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 mb-6">Sign in to continue</p>
          
          <div className="mb-4 text-left">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Username</label>
            <input 
              type="text" 
              value={uname} 
              onChange={(e) => setUname(e.target.value)} 
              placeholder="Enter your username"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
          
          <div className="mb-6 text-left">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
            <input 
              type="password" 
              value={pwd} 
              onChange={(e) => setPwd(e.target.value)} 
              placeholder="Enter your password"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
          
          <button 
            onClick={handleLogin} 
            className="w-full bg-purple-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-pink-600 transition duration-300"
          >
            Login
          </button>
          
          {/* <p className="text-sm text-gray-500 mt-4">Forgot password? <span className="text-pink-500 cursor-pointer hover:underline">Reset here</span></p> */}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-white shadow-md py-4 text-center rounded-t-3xl">
        <p className="text-gray-600 text-sm">© 2025 Diabetes Prediction. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Login;
