

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
