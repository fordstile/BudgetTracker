

import { createContext, useState, useEffect } from "react";
import axios from "../../api/axiosInstance"; 

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const backendUrl = "http://localhost:5000"; 


  const getUserData = async () => {
    setIsAuthLoading(true);
    try {
      const { data } = await axios.get("/user"); 

      if (data && data._id) {
        setUserData(data);
        setIsLoggedIn(true);
        console.log("✅ User session found:", data);
      } else {
        setUserData(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("❌ Error fetching user data:", error.message);
      setUserData(null);
      setIsLoggedIn(false);
    } finally {
      setIsAuthLoading(false);
    }
  };

  

  const logoutUser = async () => {
    try {
      await axios.post("/auth/logout");
      setUserData(null);
      setIsLoggedIn(false);
    } catch (err) {
      console.error("❌ Logout failed", err);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        backendUrl,
        userData,
        isLoggedIn,
        isAuthLoading,
        setIsLoggedIn,
        getUserData,
        logoutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
