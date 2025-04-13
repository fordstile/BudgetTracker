import React, { createContext, useState, useEffect } from "react";
// Use local axios module instead of npm package
import axios from "../../axios.js";
import { toast } from "react-toastify";

// Create Context
export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const backendUrl = "http://localhost:5000"; // Change this if needed

  // Fetch user data
  const getUserData = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.get(`${backendUrl}/api/auth/me`);
      if (data.success) {
        setUser(data.user);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <AppContext.Provider
      value={{ backendUrl, isLoggedIn, setIsLoggedIn, user, getUserData }}
    >
      {children}
    </AppContext.Provider>
  );
};

// ✅ FIX: Make sure we export this as default
export default AppProvider;
