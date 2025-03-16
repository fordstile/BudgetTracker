// src/pages/Dashboard.jsx
import React from "react";
import Sidebar from "../components/Sidebar";
import LineChartComponent from "../components/LineChartComponent";
import PieChartComponent from "../components/PieChartComponent";
import TransactionsTable from "../components/TransactionsTable";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <div className="charts">
          <LineChartComponent />
          <PieChartComponent />
        </div>
        <TransactionsTable />
      </div>
    </div>
  );
};

export default Dashboard;
