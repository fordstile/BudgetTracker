// src/components/Sidebar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { BsWallet2 } from "react-icons/bs";
import { BiMoneyWithdraw } from "react-icons/bi";
import { TbReportMoney } from "react-icons/tb";
import { SlCalculator } from "react-icons/sl";
import { IoSettingsOutline } from "react-icons/io5";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import userImage from "../assets/DV.jpg";
import "./Sidebar.css";

const Sidebar = ({ onCollapse }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        onCollapse(newState);
    };

    return (
        <>
            <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
                <div className="sidebar-content">
                    <div className="sidebar-header">
                        <div className="logo">
                            <span>FINTRACK</span>
                        </div>
                        <button className="collapse-btn" onClick={toggleSidebar}>
                            {isCollapsed ? (
                                <BiChevronRight className="collapse-icon" />
                            ) : (
                                <BiChevronLeft className="collapse-icon" />
                            )}
                        </button>
                    </div>

                    <nav className="sidebar-nav">
                        <div className="nav-section">
                            <p className="nav-title">MAIN</p>
                            <ul>
                                <li>
                                    <NavLink to="/dashboard" end>
                                        <RxDashboard className="icon" />
                                        {!isCollapsed && <span>Dashboard</span>}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/accounts">
                                        <BsWallet2 className="icon" />
                                        {!isCollapsed && <span>Accounts</span>}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/budgets">
                                        <BiMoneyWithdraw className="icon" />
                                        {!isCollapsed && <span>Budgets</span>}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/transactions">
                                        <TbReportMoney className="icon" />
                                        {!isCollapsed && <span>Transactions</span>}
                                    </NavLink>
                                </li>
                            </ul>
                        </div>

                        <div className="nav-section">
                            <p className="nav-title">{!isCollapsed && "TOOLS"}</p>
                            <ul>
                                <li>
                                    <NavLink to="/dashboard/calculators">
                                        <SlCalculator className="icon" />
                                        {!isCollapsed && <span>Calculators</span>}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/settings">
                                        <IoSettingsOutline className="icon" />
                                        {!isCollapsed && <span>Settings</span>}
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>

                <div className="user-footer">
                    <div className="user-info">
                        <img src={userImage} alt="User" className="avatar-image" />
                        {!isCollapsed && (
                            <div className="user-details">
                                <span className="user-greeting">Welcome back</span>
                                <span className="user-name">Ibrahim</span>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
            {isCollapsed && (
                <button className="expand-btn" onClick={toggleSidebar}>
                    <BiChevronRight className="expand-icon" />
                </button>
            )}
        </>
    );
};

export default Sidebar;
