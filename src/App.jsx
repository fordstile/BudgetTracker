// src/App.jsx
import React from "react";
// import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import "./index.css";

const App = () => {
  return (
    <div className="dashboard-container">
      {/* <Sidebar /> */}
      <Dashboard />
    </div>
  );
};

export default App;
