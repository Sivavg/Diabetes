
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Prediction from "./components/Prediction";
import DataInfo from "./components/DataInfo";
import Visualization from "./components/Visualization";
import Footer from "./components/Footer";
import ContactUs from "./components/contact";
import FloatBtn from "./components/FloatBtn";
import FAQ from "./components/FAQ";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Doctors from "./components/Doctors"; 
import TipsLifestyle from "./components/TipsLifestyleScreen";
// Added Doctors import
import { Helmet } from "react-helmet";

// Layout wrapper
const Layout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/" || location.pathname === "/signup";

  return (
    <div className="min-h-screen flex flex-col">
      {!isAuthPage && <Navbar />}
      <div className="flex-grow">{children}</div>
      {!isAuthPage && <Footer />}
      {!isAuthPage && <FloatBtn />}
    </div>
  );
};

const App = () => {
  return (
    <>
      <Helmet>
        <script src="https://cdn.botpress.cloud/webchat/v2/inject.js"></script>
        <script src="https://mediafiles.botpress.cloud/308f960c-95e7-4cc1-aa6a-f1c653965b80/webchat/v2/config.js"></script>
      </Helmet>

      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/data-info" element={<DataInfo />} />
            <Route path="/prediction" element={<Prediction />} />
            <Route path="/visualization" element={<Visualization />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/FAQ" element={<FAQ />} />
            <Route path="/doctors" element={<Doctors />} /> {/* Added Doctors route */}
            <Route path="/tips-lifestyle" element={<TipsLifestyle />} />

          </Routes>
        </Layout>
      </Router>
    </>
  );
};

export default App;