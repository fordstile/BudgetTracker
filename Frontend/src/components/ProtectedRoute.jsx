// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// // import { AppContext } from "../context/AppContext";
// import { AppContext } from "../components/context/AppContext";
// const ProtectedRoute = ({ children }) => {
//   const { isLoggedIn } = useContext(AppContext);

//   return isLoggedIn ? children : <Navigate to="/login" />;
// };

// export default ProtectedRoute;

// import { useContext } from "react";
// import { AppContext } from "../components/context/AppContext";

// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const { isLoggedIn, userData } = useContext(AppContext);

//   // 👀 If login is still being determined
//   if (userData === null && !isLoggedIn) {
//     return <div>Loading...</div>; // Or a spinner
//   }

//   // ❌ Not logged in
//   if (!isLoggedIn) {
//     return <Navigate to="/login" replace />;
//   }

//   // ✅ Logged in
//   return children;
// };

// export default ProtectedRoute;

import { useContext } from "react";
//import { AppContext } from "../context/AppContext";
import { AppContext } from "../components/context/AppContext";

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isAuthLoading } = useContext(AppContext);

  if (isAuthLoading) {
    return <div>Loading...</div>; // Spinner or fallback while checking auth
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
