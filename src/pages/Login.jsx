import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../components/context/AppContext";
// import { AppContent } from "../components/context/AppContext";
// import axios from "axios";
import * as axios from "axios";

import { toast } from "react-toastify";
//import "../styles/login.css"; // Importing the CSS file
import "./Login.css";
import { assets } from "../assets/assets";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContent);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/login`, {
        email,
        password,
      });

      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="login-container">
      <img
        onClick={() => navigate("/")}
        src={assets.logo} // Update this to your actual logo path
        alt="Logo"
        className="logo"
      />

      <div className="login-box">
        <h2 className="title">Login</h2>
        <p className="subtitle">Login to your account</p>

        <form onSubmit={onSubmitHandler}>
          <div className="input-group">
            <img src={assets.mail_icon} alt="Email Icon" className="icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <img src={assets.lock_icon} alt="Lock Icon" className="icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <p
            onClick={() => navigate("/reset-password")}
            className="forgot-password"
          >
            Forgot Password?
          </p>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <p className="switch-auth">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")} className="switch-link">
            Sign Up Now
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
