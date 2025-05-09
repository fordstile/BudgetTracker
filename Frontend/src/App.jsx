

import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Sidebar from "./components/Sidebar";
import Chatbot from "./components/Chatbot";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { TransactionsProvider } from "./context/TransactionsContext";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <TransactionsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chatbot"
            element={
              <ProtectedRoute>
                <Chatbot />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </TransactionsProvider>
  );
};

export default App;
