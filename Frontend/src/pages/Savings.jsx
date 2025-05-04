import React from "react";
import { useNavigate } from "react-router-dom";

const Income = () => {
  const navigate = useNavigate();

  return (
    <div className="setup-page">
      <h1>Set up your Income</h1>
      <div className="setup-actions">
        <button className="cancel-btn" onClick={() => navigate("/dashboard")}>
          Cancel
        </button>
        <button
          className="next-btn"
          onClick={() => navigate("/dashboard/budgets")}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Income;
