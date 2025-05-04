import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { BsWallet2 } from "react-icons/bs";
import { BiMoneyWithdraw } from "react-icons/bi";
import { TbReportMoney } from "react-icons/tb";
import { SlCalculator } from "react-icons/sl";
import { IoSettingsOutline } from "react-icons/io5";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import userImage from "../assets/DV.jpg";
import "./Sidebar.css";
// import { useContext } from "react";
import { AppContext } from "../components/context/AppContext";
//import axiosInstance from "../api/axiosInstance";

const Sidebar = ({ onCollapse }) => {
  const { userData, logoutUser } = useContext(AppContext); // ✅ FIXED
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    onCollapse(newState);
  };

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <>
      <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-content">
          <div className="sidebar-header">
            <div className="logo">
              <span>FINTRACK</span>
            </div>
          </div>

          <nav className="sidebar-nav">
            <div className="nav-section">
              <p className="nav-title">MAIN</p>
              <ul>
                <li>
                  <NavLink to="/dashboard" end data-tooltip="D">
                    <RxDashboard className="icon" />
                    {!isCollapsed && <span>Dashboard</span>}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/accounts" data-tooltip="A">
                    <BsWallet2 className="icon" />
                    {!isCollapsed && <span>Accounts</span>}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/budgets" data-tooltip="B">
                    <BiMoneyWithdraw className="icon" />
                    {!isCollapsed && <span>Budgets</span>}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/transactions" data-tooltip="T">
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
                  <NavLink to="/dashboard/calculators" data-tooltip="C">
                    <SlCalculator className="icon" />
                    {!isCollapsed && <span>Calculators</span>}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/settings" data-tooltip="S">
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
            <img
              src={userData?.profilePic || userImage}
              alt="User avatar"
              className="avatar-image"
            />
            {!isCollapsed && (
              <div className="user-details">
                <span className="user-greeting">Welcome back</span>
                <span className="user-name">{userData?.name || "Guest"}</span>
              </div>
            )}
            {!isCollapsed && (
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </aside>
      <button
        className="expand-btn"
        onClick={toggleSidebar}
        aria-label={isCollapsed ? "Open sidebar" : "Close sidebar"}
      >
        {isCollapsed ? (
          <BiChevronRight className="expand-icon" />
        ) : (
          <BiChevronLeft className="expand-icon" />
        )}
      </button>
    </>
  );
};

export default Sidebar;
