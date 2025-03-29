import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../components/context/AppContext";
// import axios from "axios";
import * as axios from "axios";

import { toast } from "react-toastify";
import "./Signup.css"; // Importing the CSS file
import { assets } from "../assets/assets";

const Signup = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContent);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/register`, {
        name,
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
    <div className="signup-container">
      <img
        onClick={() => navigate("/")}
        src={assets.logo} // Update this to your actual logo path
        alt="Logo"
        className="logo"
      />

      <div className="signup-box">
        <h2 className="title">Create Account</h2>
        <p className="subtitle">Create Your Account</p>

        <form onSubmit={onSubmitHandler}>
          <div className="input-group">
            <img src={assets.person_icon} alt="Person Icon" className="icon" />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>

        <p className="switch-auth">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="switch-link">
            Login Now
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
