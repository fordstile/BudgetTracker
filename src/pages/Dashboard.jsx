import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import LineChartComponent from "../components/LineChartComponent";
import PieChartComponent from "../components/PieChartComponent";
import TransactionsTable from "../components/TransactionsTable";
import Accounts from "../components/Accounts";
import Budgets from "../pages/Budgets";
import Transactions from "../pages/Transactions";
import Settings from "../pages/Settings";
import Calculators from "../pages/Calculators";
import Chatbot from "../components/Chatbot";
import { FaArrowUp, FaArrowDown, FaFileExport, FaPlus, FaRobot } from "react-icons/fa";
import "./Dashboard.css";

const DashboardHome = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-inner">
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <div className="dashboard-actions">
          <button
            className="action-btn"
            aria-label="Export report"
          >
            <FaFileExport /> Export Report
          </button>
          <button
            className="action-btn primary"
            onClick={() => navigate("/dashboard/transactions")}
            aria-label="Add new transaction"
          >
            <FaPlus /> Add Transaction
          </button>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-header">
              <h3>Total Balance</h3>
              <div className="trend positive">
                <FaArrowUp /> 12.5%
              </div>
            </div>
            <div className="stat-value">$12,450.00</div>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <h3>Monthly Income</h3>
              <div className="trend positive">
                <FaArrowUp /> 8.2%
              </div>
            </div>
            <div className="stat-value">$5,200.00</div>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <h3>Monthly Expenses</h3>
              <div className="trend negative">
                <FaArrowDown /> 4.1%
              </div>
            </div>
            <div className="stat-value">$3,750.00</div>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <h3>Savings Rate</h3>
              <div className="trend positive">
                <FaArrowUp /> 2.3%
              </div>
            </div>
            <div className="stat-value">27.9%</div>
          </div>
        </div>

        <div className="dashboard-charts">
          <LineChartComponent />
          <PieChartComponent />
        </div>

        <div className="recent-transactions">
          <div className="transactions-header">
            <h2>Recent Transactions</h2>
            <a
              href="/dashboard/transactions"
              className="view-all"
              aria-label="View all transactions"
            >
              See all transactions <FaArrowUp />
            </a>
          </div>
          <TransactionsTable />
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isChatbotFullscreen, setIsChatbotFullscreen] = useState(false);

  return (
    <div className="dashboard-container">
      <Sidebar onCollapse={setIsSidebarCollapsed} />
      <div className={`dashboard-content ${isSidebarCollapsed ? "sidebar-collapsed" : ""}`}>
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="budgets" element={<Budgets />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="calculators" element={<Calculators />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
        {!isChatbotFullscreen && (
          <div
            className="chatbot-toggle"
            onClick={() => setIsChatbotOpen(true)}
            aria-label="Open chatbot"
          >
            <FaRobot />
          </div>
        )}
        <Chatbot
          isOpen={isChatbotOpen}
          onClose={() => {
            setIsChatbotOpen(false);
            setIsChatbotFullscreen(false);
          }}
          onFullscreenChange={setIsChatbotFullscreen}
        />
      </div>
    </div>
  );
};

export default Dashboard;