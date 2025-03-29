import React, { createContext, useState, useEffect } from "react";
import * as axios from "axios";

// import axios from "axios";
import { toast } from "react-toastify";

// Create Context
export const AppContent = createContext();

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
      toast.error(error.message);
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <AppContent.Provider
      value={{ backendUrl, isLoggedIn, setIsLoggedIn, user, getUserData }}
    >
      {children}
    </AppContent.Provider>
  );
};

// ✅ FIX: Make sure we export this as default
export default AppProvider;
