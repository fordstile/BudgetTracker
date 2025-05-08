

import React, { useEffect, useState, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AppContext } from "../components/context/AppContext";

import axios from "../api/axiosInstance"; // ✅ uses baseURL + credentials
import {
  FaArrowUp,
  FaArrowDown,
  FaFileExport,
  FaPlus,
  FaRobot,
} from "react-icons/fa";
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
import "./Dashboard.css";
import { useTransactions } from "../context/TransactionsContext";



const DashboardHome = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AppContext);
  const [setupData, setSetupData] = useState({
    income: 0,
    expenses: {}, // actual object, not number
    savings: 0,
  });
  const { transactions } = useTransactions();

  useEffect(() => {
    const fetchSetupData = async () => {
      try {
        const { data } = await axios.get("/setup");
        setSetupData(data); // { income, expenses (object), savings }
      } catch (error) {
        console.error("❌ Error fetching setup data:", error);
      }
    };

    if (isLoggedIn) {
      fetchSetupData();
    }
  }, [isLoggedIn]);

  // ✅ New: Calculate total expenses safely
  const calculateTotalExpenses = (expensesObj) => {
    if (!expensesObj || typeof expensesObj !== "object") return 0;

    let total = 0;
    for (const category in expensesObj) {
      const categoryItems = expensesObj[category]?.items;
      if (categoryItems && typeof categoryItems === "object") {
        for (const key in categoryItems) {
          const value = categoryItems[key];
          if (typeof value === "number" && !isNaN(value)) {
            total += value;
          }
        }
      }
    }

    return total;
  };

  const calculateTransactionExpenses = (transactions) => {
    if (!transactions || !Array.isArray(transactions)) return 0;

    return transactions.reduce((acc, tx) => acc + (tx.amount || 0), 0);
  };

  const { income, expenses, savings } = setupData;
  //const totalExpenses = calculateTotalExpenses(expenses);
  const budgetExpenses = calculateTotalExpenses(expenses);
  const transactionExpenses = calculateTransactionExpenses(transactions);
  const totalExpenses = budgetExpenses + transactionExpenses;

  const totalBalance = income - totalExpenses;

  return (
    <div className="dashboard-inner">
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <div className="dashboard-actions">
          <button className="action-btn">
            <FaFileExport /> Export Report
          </button>
          <button
            className="action-btn primary"
            onClick={() => navigate("/dashboard/transactions")}
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
                <FaArrowUp /> {income > totalExpenses ? "12.5%" : "0%"}
              </div>
            </div>
            <div className="stat-value">${totalBalance.toFixed(2)}</div>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <h3>Monthly Income</h3>
              <div className="trend positive">
                <FaArrowUp /> 8.2%
              </div>
            </div>
            <div className="stat-value">${income.toFixed(2)}</div>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <h3>Monthly Expenses</h3>
              <div className="trend negative">
                <FaArrowDown /> 4.1%
              </div>
            </div>
            <div className="stat-value">${totalExpenses.toFixed(2)}</div>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <h3>Savings Rate</h3>
              <div className="trend positive">
                <FaArrowUp /> 2.3%
              </div>
            </div>
            <div className="stat-value">
              {income > 0 ? ((savings / income) * 100).toFixed(1) : 0}%
            </div>
          </div>
        </div>

        <div className="dashboard-charts">
          {/* <LineChartComponent />
          <PieChartComponent /> */}

          <LineChartComponent
            income={income}
            savings={savings}
            expenses={totalExpenses}
          />
          {/* <PieChartComponent expensesBreakdown={expenses} /> */}

          <PieChartComponent
            expensesBreakdown={expenses}
            income={income}
            savings={savings}
          />
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
      <div
        className={`dashboard-content ${
          isSidebarCollapsed ? "sidebar-collapsed" : ""
        }`}
      >
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
