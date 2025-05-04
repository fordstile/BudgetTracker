// import React, { useState } from "react";
// import "../styles/PageLayout.css"; // reuse existing styles
// import "./Budgets.css"; // reuse same style to match look

// const Income = () => {
//   const [step, setStep] = useState(1);

//   const [incomeSources, setIncomeSources] = useState({
//     salary: 0,
//     business: 0,
//     freelance: 0,
//     other: 0,
//   });

//   const totalIncome = Object.values(incomeSources).reduce(
//     (sum, amount) => sum + amount,
//     0
//   );

//   const handleIncomeChange = (field, value) => {
//     setIncomeSources((prev) => ({
//       ...prev,
//       [field]: Number(value) || 0,
//     }));
//   };

//   return (
//     <div className="page-container">
//       {/* Header with Buttons */}
//       <div className="page-header">
//         <h1 className="page-title">Income Setup</h1>
//         <div className="page-actions">
//           <button className="action-btn">Cancel</button>
//           <button className="action-btn primary">Next →</button>
//         </div>
//       </div>

//       {/* Progress Steps */}
//       <div className="progress-steps">
//         <div className="step completed">
//           <div className="step-indicator">✓</div>
//           <span>Income</span>
//         </div>
//         <div className="step-line"></div>
//         <div className="step">
//           <div className="step-indicator">2</div>
//           <span>Budgets</span>
//         </div>
//         <div className="step-line"></div>
//         <div className="step">
//           <div className="step-indicator">3</div>
//           <span>Savings</span>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="page-content budget-content">
//         <div className="budget-form">
//           <h3>Step {step}. Enter your monthly income.</h3>

//           <div className="expenses-section">
//             <div className="expense-item">
//               <span>Salary</span>
//               <div className="amount-input">
//                 <span>KES</span>
//                 <input
//                   type="number"
//                   value={incomeSources.salary}
//                   onChange={(e) => handleIncomeChange("salary", e.target.value)}
//                   placeholder="0"
//                 />
//               </div>
//             </div>

//             <div className="expense-item">
//               <span>Business</span>
//               <div className="amount-input">
//                 <span>KES</span>
//                 <input
//                   type="number"
//                   value={incomeSources.business}
//                   onChange={(e) =>
//                     handleIncomeChange("business", e.target.value)
//                   }
//                   placeholder="0"
//                 />
//               </div>
//             </div>

//             <div className="expense-item">
//               <span>Freelance</span>
//               <div className="amount-input">
//                 <span>KES</span>
//                 <input
//                   type="number"
//                   value={incomeSources.freelance}
//                   onChange={(e) =>
//                     handleIncomeChange("freelance", e.target.value)
//                   }
//                   placeholder="0"
//                 />
//               </div>
//             </div>

//             <div className="expense-item">
//               <span>Other Income</span>
//               <div className="amount-input">
//                 <span>KES</span>
//                 <input
//                   type="number"
//                   value={incomeSources.other}
//                   onChange={(e) => handleIncomeChange("other", e.target.value)}
//                   placeholder="0"
//                 />
//               </div>
//             </div>

//             {/* Total Income */}
//             <div className="expense-total">
//               <span>Total Income</span>
//               <span>KES {totalIncome.toLocaleString()}</span>
//             </div>
//           </div>
//         </div>

//         {/* Optional Right Side (if you want later like donut chart for income) */}
//       </div>
//     </div>
//   );
// };

// export default Income;

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
