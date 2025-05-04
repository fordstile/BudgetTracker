// import { createContext, useState, useEffect } from "react";

// //import * as axios from "axios"; // ✅ FIXED HERE
// // import axios from "axios";
// //import axios from "../api/axiosInstance"; // Make sure the path is correct
// import axios from "../../api/axiosInstance";

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const [userData, setUserData] = useState(null);
//   const [isAuthLoading, setIsAuthLoading] = useState(true);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const backendUrl = "http://localhost:5000"; // Or your actual backend URL

//   const getUserData = async () => {
//     setIsAuthLoading(true); // Start loading
//     try {
//       axios.defaults.withCredentials = true;
//       const { data } = await axios.get(`${backendUrl}/api/user`);
//       if (data.success) {
//         setUserData(data.user);
//         console.log("User fetched: ", data.user);
//       }
//     } catch (error) {
//       console.error("Error fetching user data", error.message);
//     } finally {
//       setIsAuthLoading(false); // ✅ Done loading
//     }
//   };
//   // ✅ Auto-run on page load to check login
//   useEffect(() => {
//     getUserData();
//   }, []);

//   return (
//     <AppContext.Provider
//       value={{
//         backendUrl,
//         userData,
//         isLoggedIn,
//         setIsLoggedIn,
//         getUserData,
//         isAuthLoading,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

// // import { createContext, useState, useEffect } from "react";
// // import axiosInstance from "../../api/axiosInstance"; // Import the axiosInstance

// // export const AppContext = createContext();

// // export const AppProvider = ({ children }) => {
// //   const [userData, setUserData] = useState(null);
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);

// //   const backendUrl = "http://localhost:5000"; // Or your actual backend URL

// //   const getUserData = async () => {
// //     try {
// //       // Send a request to get user data using axiosInstance
// //       const { data } = await axiosInstance.get("/user"); // `/user` is the endpoint for fetching user data
// //       if (data.success) {
// //         setUserData(data.user); // Store the user data in state
// //         setIsLoggedIn(true); // Mark user as logged in
// //       }
// //     } catch (error) {
// //       console.error("Error fetching user data", error.message);
// //       setIsLoggedIn(false); // If error occurs, ensure user is not marked as logged in
// //     }
// //   };

// //   // Fetch user data on initial load if the user is logged in
// //   // useEffect(() => {
// //   //   const token = localStorage.getItem("token");
// //   //   if (token) {
// //   //     setIsLoggedIn(true); // If token exists, the user is logged in
// //   //     getUserData(); // Fetch user data if logged in
// //   //   }
// //   // }, [isLoggedIn]); // Trigger when isLoggedIn state changes
// //   useEffect(() => {
// //     const token = localStorage.getItem("token");
// //     if (token) {
// //       setIsLoggedIn(true);
// //       getUserData(); // Fetch user data only if token exists
// //     } else {
// //       setIsLoggedIn(false);
// //     }
// //   }, []);

// //   return (
// //     <AppContext.Provider
// //       value={{
// //         backendUrl,
// //         userData,
// //         isLoggedIn,
// //         setIsLoggedIn,
// //         getUserData,
// //       }}
// //     >
// //       {children}
// //     </AppContext.Provider>
// //   );
// // };

// // import { createContext, useState, useEffect } from "react";
// // import axiosInstance from "../../api/axiosInstance"; // Import the axiosInstance

// // export const AppContext = createContext();

// // export const AppProvider = ({ children }) => {
// //   const [userData, setUserData] = useState(null);
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);

// //   const backendUrl = "http://localhost:5000"; // Or your actual backend URL

// //   const getUserData = async () => {
// //     try {
// //       const { data } = await axiosInstance.get("/user"); // `/user` is the endpoint for fetching user data
// //       if (data.success) {
// //         setUserData(data.user); // Store the user data in state
// //         setIsLoggedIn(true); // Mark user as logged in
// //       } else {
// //         // Handle the case where user data isn't valid
// //         setIsLoggedIn(false);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching user data", error.message);
// //       setIsLoggedIn(false); // If error occurs, ensure user is not marked as logged in
// //     }
// //   };

// //   // Fetch user data on initial load only if the user has a token
// //   useEffect(() => {
// //     const token = localStorage.getItem("token");
// //     if (token) {
// //       setIsLoggedIn(true); // Mark user as logged in
// //       getUserData(); // Fetch user data if token exists
// //     } else {
// //       setIsLoggedIn(false); // If no token, mark user as logged out
// //     }
// //   }, []); // Empty dependency array ensures this runs once after component mounts

// //   return (
// //     <AppContext.Provider
// //       value={{
// //         backendUrl,
// //         userData,
// //         isLoggedIn,
// //         setIsLoggedIn,
// //         getUserData,
// //       }}
// //     >
// //       {children}
// //     </AppContext.Provider>
// //   );
// // };

// src/context/AppContext.jsx
// import { createContext, useState, useEffect } from "react";
// import axios from "../../api/axiosInstance";

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const [userData, setUserData] = useState(null);
//   const [isAuthLoading, setIsAuthLoading] = useState(true);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const backendUrl = "http://localhost:5000"; // Your backend URL

//   const getUserData = async () => {
//     setIsAuthLoading(true); // Start loading
//     try {
//       axios.defaults.withCredentials = true;
//       const { data } = await axios.get(`${backendUrl}/api/user`);

//       // ✅ Check for actual user data
//       if (data && data._id) {
//         setUserData(data);
//         setIsLoggedIn(true); // ✅ Important!
//         console.log("✅ User session found:", data);
//       } else {
//         setIsLoggedIn(false);
//         setUserData(null);
//       }
//     } catch (error) {
//       console.error("❌ Error fetching user data:", error.message);
//       setIsLoggedIn(false);
//       setUserData(null);
//     } finally {
//       setIsAuthLoading(false); // ✅ Done loading
//     }
//   };

//   useEffect(() => {
//     getUserData(); // Check session on mount
//   }, []);

//   return (
//     <AppContext.Provider
//       value={{
//         backendUrl,
//         userData,
//         isLoggedIn,
//         setIsLoggedIn,
//         getUserData,
//         isAuthLoading,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

import { createContext, useState, useEffect } from "react";
import axios from "../../api/axiosInstance"; // Assumes axiosInstance has withCredentials: true

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const backendUrl = "http://localhost:5000"; // ✅ Keep this in case you need full URLs

  // ✅ Fetch the logged-in user's data
  const getUserData = async () => {
    setIsAuthLoading(true);
    try {
      const { data } = await axios.get("/user"); // uses axiosInstance with baseURL + withCredentials

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

  // const getUserData = async () => {
  //   setIsAuthLoading(true);
  //   try {
  //     const { data } = await axios.get("/user");

  //     if (data && data.user && data.user._id) {
  //       setUserData(data.user);
  //       setIsLoggedIn(true);
  //       console.log("✅ User session found:", data.user);
  //     } else {
  //       setUserData(null);
  //       setIsLoggedIn(false);
  //     }
  //   } catch (error) {
  //     console.error("❌ Error fetching user data:", error.message);
  //     setUserData(null);
  //     setIsLoggedIn(false);
  //   } finally {
  //     setIsAuthLoading(false);
  //   }
  // };

  //   const getUserData = async () => {
  //   setIsAuthLoading(true);
  //   try {
  //     const { data } = await axios.get("/user");

  //     if (data && data.user && data.user._id) {
  //       setUserData(data.user);
  //       setIsLoggedIn(true);
  //       console.log("✅ User session found:", data.user);
  //     } else {
  //       setUserData(null);
  //       setIsLoggedIn(false);
  //     }
  //   } catch (error) {
  //     console.error("❌ Error fetching user data:", error.message);
  //     setUserData(null);
  //     setIsLoggedIn(false);
  //   } finally {
  //     setIsAuthLoading(false);
  //   }
  // };

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
