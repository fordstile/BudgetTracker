// src/components/Sidebar.jsx
import React from "react";
import { FaHome, FaWallet, FaChartPie, FaExchangeAlt, FaCalculator, FaCog } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="side">      <div className="sidebar-header">
                <span className="logo">💡 MyFin</span>
            </div>

                <nav className="sidebar-nav">
                    <div className="nav-section">
                        <p className="nav-title">MAIN</p>
                        <ul>
                            <li className="active">
                                <FaHome className="icon" />
                                Dashboard
                            </li>
                            <li>
                                <FaWallet className="icon" />
                                Accounts
                            </li>
                            <li>
                                <FaChartPie className="icon" />
                                Budgets
                            </li>
                            <li>
                                <FaExchangeAlt className="icon" />
                                Transactions
                            </li>
                        </ul>
                    </div>

                    <div className="nav-section">
                        <p className="nav-title">TOOLS</p>
                        <ul>
                            <li>
                                <FaCalculator className="icon" />
                                Calculators
                            </li>
                        </ul>
                    </div>

                    <div className="nav-section">
                        <p className="nav-title">SETTINGS</p>
                        <ul>
                            <li>
                                <FaCog className="icon" />
                                Settings
                            </li>
                        </ul>
                    </div>
                </nav></div>

        </aside>
    );
};

export default Sidebar;
