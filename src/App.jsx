// src/App.jsx
import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


const App = () => {
  return (
     <div>
      
        <Router>

          <Routes>
            
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            

          </Routes>

        </Router> 

        {/* <Sidebar />  */}
       {/* <Dashboard />  */}
    
    </div>
  );
};

export default App;
