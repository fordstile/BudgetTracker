// import React, { useState } from 'react';
// import { IoWaterOutline, IoHomeOutline } from 'react-icons/io5';
// import { BsLightningCharge, BsPhone } from 'react-icons/bs';
// import { BiWifi } from 'react-icons/bi';
// import { FaTrash, FaCar, FaBus, FaGraduationCap, FaBook, FaHospital, FaPills } from 'react-icons/fa';
// import { MdOutlineHomeRepairService, MdChildCare, MdSchool, MdFastfood } from 'react-icons/md';
// import { RiParkingFill, RiMentalHealthFill, RiBankFill, RiMoneyDollarCircleFill } from 'react-icons/ri';
// import { GiPayMoney, GiReceiveMoney, GiTakeMyMoney } from 'react-icons/gi';
// import { AiFillCar } from 'react-icons/ai';
// import '../styles/PageLayout.css';
// import './Budgets.css';

// const Budgets = () => {
//   const [step, setStep] = useState(3);
//   const [expenses, setExpenses] = useState({
//     bills: {
//       isOpen: true,
//       items: {
//         garbage: 20,
//         water: 50,
//         electricity: 60,
//         internet: 35,
//         phone: 15
//       }
//     },
//     housing: {
//       isOpen: true,
//       items: {
//         mortgage: 0,
//         rent: 550,
//         homeImprovement: 0
//       }
//     },
//     carTransport: {
//       isOpen: true,
//       items: {
//         carPayment: 300,
//         insurance: 150,
//         fuel: 200,
//         maintenance: 100,
//         parking: 50,
//         publicTransport: 45
//       }
//     },
//     education: {
//       isOpen: true,
//       items: {
//         tuition: 0,
//         books: 50,
//         courses: 100,
//         supplies: 30,
//         studentLoan: 200
//       }
//     },
//     health: {
//       isOpen: true,
//       items: {
//         insurance: 200,
//         medications: 50,
//         doctorVisits: 100,
//         dental: 75,
//         vision: 25,
//         mentalHealth: 80
//       }
//     },
//     children: {
//       isOpen: true,
//       items: {
//         childcare: 400,
//         schooling: 300,
//         activities: 100,
//         supplies: 50,
//         clothing: 75
//       }
//     },
//     financial: {
//       isOpen: true,
//       items: {
//         investments: 200,
//         retirement: 300,
//         emergencyFund: 150,
//         lifeInsurance: 50,
//         debtPayments: 200
//       }
//     },
//     taxes: {
//       isOpen: true,
//       items: {
//         incomeTax: 800,
//         propertyTax: 200,
//         vehicleTax: 50,
//         otherTaxes: 100
//       }
//     },
//     foodDining: {
//       isOpen: true,
//       items: {
//         groceries: 400,
//         restaurants: 200,
//         takeout: 100,
//         coffeeSnacks: 50,
//         alcoholBeverages: 75
//       }
//     }
//   });

//   const income = 5500;
//   const savings = 1000;
//   const totalExpenses = Object.values(expenses).reduce((total, category) =>
//     total + Object.values(category.items).reduce((sum, amount) => sum + amount, 0), 0
//   );
//   const leftToBudget = income - savings - totalExpenses;

//   const handleExpenseChange = (category, item, value) => {
//     setExpenses(prev => ({
//       ...prev,
//       [category]: {
//         ...prev[category],
//         items: {
//           ...prev[category].items,
//           [item]: Number(value) || 0
//         }
//       }
//     }));
//   };

//   const toggleCategory = (category) => {
//     setExpenses(prev => ({
//       ...prev,
//       [category]: {
//         ...prev[category],
//         isOpen: !prev[category].isOpen
//       }
//     }));
//   };

//   const getCategoryIcon = (item) => {
//     const icons = {
//       // Transport icons
//       carPayment: <AiFillCar />,
//       parking: <RiParkingFill />,
//       publicTransport: <FaBus />,

//       // Education icons
//       tuition: <FaGraduationCap />,
//       books: <FaBook />,
//       courses: <MdSchool />,

//       // Health icons
//       doctorVisits: <FaHospital />,
//       medications: <FaPills />,
//       mentalHealth: <RiMentalHealthFill />,

//       // Children icons
//       childcare: <MdChildCare />,

//       // Financial icons
//       investments: <RiBankFill />,
//       retirement: <RiMoneyDollarCircleFill />,
//       debtPayments: <GiPayMoney />,

//       // Tax icons
//       incomeTax: <GiReceiveMoney />,
//       propertyTax: <GiTakeMyMoney />,

//       // Food icons
//       groceries: <MdFastfood />,
//       restaurants: <MdFastfood />,

//       // Default icons for existing categories
//       garbage: <FaTrash />,
//       water: <IoWaterOutline />,
//       electricity: <BsLightningCharge />,
//       internet: <BiWifi />,
//       phone: <BsPhone />,
//       mortgage: <IoHomeOutline />,
//       rent: <IoHomeOutline />,
//       homeImprovement: <MdOutlineHomeRepairService />
//     };

//     return icons[item] || <FaTrash />;
//   };

//   return (
//     <div className="page-container">
//       <div className="page-header">
//         <h1 className="page-title">Budget Planning</h1>
//         <div className="page-actions">
//           <button className="action-btn">Cancel</button>
//           <button className="action-btn primary">Next →</button>
//         </div>
//       </div>

//       <div className="progress-steps">
//         <div className="step completed">
//           <div className="step-indicator">✓</div>
//           <span>Income</span>
//         </div>
//         <div className="step-line completed"></div>
//         <div className="step completed">
//           <div className="step-indicator">✓</div>
//           <span>Savings</span>
//         </div>
//         <div className="step-line completed"></div>
//         <div className="step active">
//           <div className="step-indicator">3</div>
//           <span>Expenses</span>
//         </div>
//       </div>

//       <div className="page-content budget-content">
//         <div className="budget-form">
//           <h3>Step {step}. Enter your monthly expenses.</h3>

//           <div className="expenses-section">
//             <div className="expense-total">
//               <span>Expenses</span>
//               <span>${totalExpenses.toLocaleString()}</span>
//             </div>

//             {Object.entries(expenses).map(([category, { isOpen, items }]) => (
//               <div key={category} className="expense-category">
//                 <div className="category-header" onClick={() => toggleCategory(category)}>
//                   <span className="toggle-icon">{isOpen ? '▼' : '▶'}</span>
//                   <h4>{category.replace(/([A-Z])/g, ' $1').toUpperCase()}</h4>
//                   <span className="category-amount">
//                     ${Object.values(items).reduce((sum, amount) => sum + amount, 0)}
//                   </span>
//                 </div>
//                 {isOpen && (
//                   <div className="category-items">
//                     {Object.entries(items).map(([item, amount]) => (
//                       <div key={item} className="expense-item">
//                         {getCategoryIcon(item)}
//                         <span>{item.replace(/([A-Z])/g, ' $1')}</span>
//                         <div className="amount-input">
//                           <span>$</span>
//                           <input
//                             type="number"
//                             value={amount}
//                             onChange={(e) => handleExpenseChange(category, item, e.target.value)}
//                           />
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="budget-summary">
//           <div className="donut-chart">
//             <div className="chart-center">
//               <div className="income-amount">${income.toLocaleString()}</div>
//             </div>
//           </div>
//           <div className="summary-items">
//             <div className="summary-item savings">
//               <span>Savings</span>
//               <span>${savings.toLocaleString()}</span>
//             </div>
//             <div className="summary-item expenses">
//               <span>Expenses</span>
//               <span>${totalExpenses.toLocaleString()}</span>
//             </div>
//             <div className="summary-item remaining">
//               <span>Left to budget</span>
//               <span>${leftToBudget.toLocaleString()}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Budgets;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { IoWaterOutline, IoHomeOutline } from "react-icons/io5";
// import { BsLightningCharge, BsPhone } from "react-icons/bs";
// import { BiWifi } from "react-icons/bi";
// import {
//   FaTrash,
//   FaCar,
//   FaBus,
//   FaGraduationCap,
//   FaBook,
//   FaHospital,
//   FaPills,
// } from "react-icons/fa";
// import {
//   MdOutlineHomeRepairService,
//   MdChildCare,
//   MdSchool,
//   MdFastfood,
// } from "react-icons/md";
// import {
//   RiParkingFill,
//   RiMentalHealthFill,
//   RiBankFill,
//   RiMoneyDollarCircleFill,
// } from "react-icons/ri";
// import { GiPayMoney, GiReceiveMoney, GiTakeMyMoney } from "react-icons/gi";
// import { AiFillCar } from "react-icons/ai";
// import "../styles/PageLayout.css";
// import "./Budgets.css";

// const Budgets = () => {
//   const navigate = useNavigate();
//   const [step, setStep] = useState(1);
//   const [income, setIncome] = useState(0);
//   const [savings, setSavings] = useState(0);

//   const [expenses, setExpenses] = useState({
//     bills: {
//       isOpen: true,
//       items: {
//         garbage: 0,
//         water: 0,
//         electricity: 0,
//         internet: 0,
//         phone: 0,
//       },
//     },
//     housing: {
//       isOpen: true,
//       items: { mortgage: 0, rent: 0, homeImprovement: 0 },
//     },
//     carTransport: {
//       isOpen: true,
//       items: {
//         carPayment: 0,
//         insurance: 0,
//         fuel: 0,
//         maintenance: 0,
//         parking: 0,
//         publicTransport: 0,
//       },
//     },
//     education: {
//       isOpen: true,
//       items: {
//         tuition: 0,
//         books: 0,
//         courses: 0,
//         supplies: 0,
//         studentLoan: 0,
//       },
//     },
//     health: {
//       isOpen: true,
//       items: {
//         insurance: 0,
//         medications: 0,
//         doctorVisits: 0,
//         dental: 0,
//         vision: 0,
//         mentalHealth: 0,
//       },
//     },
//     children: {
//       isOpen: true,
//       items: {
//         childcare: 0,
//         schooling: 0,
//         activities: 0,
//         supplies: 0,
//         clothing: 0,
//       },
//     },
//     financial: {
//       isOpen: true,
//       items: {
//         investments: 0,
//         retirement: 0,
//         emergencyFund: 0,
//         lifeInsurance: 0,
//         debtPayments: 0,
//       },
//     },
//     taxes: {
//       isOpen: true,
//       items: {
//         incomeTax: 0,
//         propertyTax: 0,
//         vehicleTax: 0,
//         otherTaxes: 0,
//       },
//     },
//     foodDining: {
//       isOpen: true,
//       items: {
//         groceries: 0,
//         restaurants: 0,
//         takeout: 0,
//         coffeeSnacks: 0,
//         alcoholBeverages: 0,
//       },
//     },
//   });

//   const totalExpenses = Object.values(expenses).reduce(
//     (total, category) =>
//       total +
//       Object.values(category.items).reduce((sum, amount) => sum + amount, 0),
//     0
//   );

//   const leftToBudget = income - savings - totalExpenses;

//   const handleExpenseChange = (category, item, value) => {
//     setExpenses((prev) => ({
//       ...prev,
//       [category]: {
//         ...prev[category],
//         items: {
//           ...prev[category].items,
//           [item]: Number(value) || 0,
//         },
//       },
//     }));
//   };

//   const toggleCategory = (category) => {
//     setExpenses((prev) => ({
//       ...prev,
//       [category]: {
//         ...prev[category],
//         isOpen: !prev[category].isOpen,
//       },
//     }));
//   };

//   const getCategoryIcon = (item) => {
//     const icons = {
//       carPayment: <AiFillCar />,
//       parking: <RiParkingFill />,
//       publicTransport: <FaBus />,
//       tuition: <FaGraduationCap />,
//       books: <FaBook />,
//       courses: <MdSchool />,
//       doctorVisits: <FaHospital />,
//       medications: <FaPills />,
//       mentalHealth: <RiMentalHealthFill />,
//       childcare: <MdChildCare />,
//       investments: <RiBankFill />,
//       retirement: <RiMoneyDollarCircleFill />,
//       debtPayments: <GiPayMoney />,
//       incomeTax: <GiReceiveMoney />,
//       propertyTax: <GiTakeMyMoney />,
//       groceries: <MdFastfood />,
//       restaurants: <MdFastfood />,
//       garbage: <FaTrash />,
//       water: <IoWaterOutline />,
//       electricity: <BsLightningCharge />,
//       internet: <BiWifi />,
//       phone: <BsPhone />,
//       mortgage: <IoHomeOutline />,
//       rent: <IoHomeOutline />,
//       homeImprovement: <MdOutlineHomeRepairService />,
//     };
//     return icons[item] || <FaTrash />;
//   };

//   const handleCancel = () => {
//     navigate("/dashboard");
//   };

//   const handleNext = () => {
//     if (step < 3) setStep(step + 1);
//     else navigate("/dashboard"); // Finish
//   };

//   const handleBack = () => {
//     if (step > 1) setStep(step - 1);
//   };

//   return (
//     <div className="page-container">
//       <div className="page-header">
//         <h1 className="page-title">Budget Planning</h1>
//         <div className="page-actions">
//           {step > 1 && (
//             <button className="action-btn" onClick={handleBack}>
//               ← Back
//             </button>
//           )}
//           <button className="action-btn" onClick={handleCancel}>
//             Cancel
//           </button>
//           <button className="action-btn primary" onClick={handleNext}>
//             {step < 3 ? "Next →" : "Finish"}
//           </button>
//         </div>
//       </div>

//       <div className="progress-steps">
//         <div className={`step ${step >= 1 ? "completed" : ""}`}>
//           <div className="step-indicator">{step > 1 ? "✓" : 1}</div>
//           <span>Income</span>
//         </div>
//         <div className={`step-line ${step > 1 ? "completed" : ""}`}></div>
//         <div className={`step ${step >= 2 ? "completed" : ""}`}>
//           <div className="step-indicator">{step > 2 ? "✓" : 2}</div>
//           <span>Savings</span>
//         </div>
//         <div className={`step-line ${step > 2 ? "completed" : ""}`}></div>
//         <div className={`step ${step === 3 ? "active" : ""}`}>
//           <div className="step-indicator">3</div>
//           <span>Expenses</span>
//         </div>
//       </div>

//       <div className="page-content budget-content">
//         {step === 1 && (
//           <div className="income-step">
//             <h3>Step 1: Enter Your Monthly Income</h3>
//             <input
//               type="number"
//               value={income}
//               onChange={(e) => setIncome(Number(e.target.value))}
//               placeholder="Enter your income"
//             />
//           </div>
//         )}

//         {step === 2 && (
//           <div className="savings-step">
//             <h3>Step 2: Enter Your Monthly Savings</h3>
//             <input
//               type="number"
//               value={savings}
//               onChange={(e) => setSavings(Number(e.target.value))}
//               placeholder="Enter your savings"
//             />
//           </div>
//         )}
//       </div>
//       {step === 3 && (
//         <div className="budget-content">
//           <div className="budget-form">
//             <h3>Step 3: Enter Your Monthly Expenses</h3>

//             <div className="expenses-section">
//               <div className="expense-total">
//                 <span>Expenses</span>
//                 <span>${totalExpenses.toLocaleString()}</span>
//               </div>

//               {Object.entries(expenses).map(([category, { isOpen, items }]) => (
//                 <div key={category} className="expense-category">
//                   <div
//                     className="category-header"
//                     onClick={() => toggleCategory(category)}
//                   >
//                     <span className="toggle-icon">{isOpen ? "▼" : "▶"}</span>
//                     <h4>{category.replace(/([A-Z])/g, " $1").toUpperCase()}</h4>
//                     <span className="category-amount">
//                       $
//                       {Object.values(items).reduce(
//                         (sum, amount) => sum + amount,
//                         0
//                       )}
//                     </span>
//                   </div>
//                   {isOpen && (
//                     <div className="category-items">
//                       {Object.entries(items).map(([item, amount]) => (
//                         <div key={item} className="expense-item">
//                           {getCategoryIcon(item)}
//                           <span>{item.replace(/([A-Z])/g, " $1")}</span>
//                           <div className="amount-input">
//                             <span>$</span>
//                             <input
//                               type="number"
//                               value={amount}
//                               onChange={(e) =>
//                                 handleExpenseChange(
//                                   category,
//                                   item,
//                                   e.target.value
//                                 )
//                               }
//                             />
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="budget-summary">
//             <div className="donut-chart">
//               <div className="chart-center">
//                 <div className="income-amount">${income.toLocaleString()}</div>
//               </div>
//             </div>
//             <div className="summary-items">
//               <div className="summary-item savings">
//                 <span>Savings</span>
//                 <span>${savings.toLocaleString()}</span>
//               </div>
//               <div className="summary-item expenses">
//                 <span>Expenses</span>
//                 <span>${totalExpenses.toLocaleString()}</span>
//               </div>
//               <div className="summary-item remaining">
//                 <span>Left to budget</span>
//                 <span>${leftToBudget.toLocaleString()}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Budgets;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { IoWaterOutline, IoHomeOutline } from "react-icons/io5";
// import { BsLightningCharge, BsPhone } from "react-icons/bs";
// import { BiWifi } from "react-icons/bi";
// import {
//   FaTrash,
//   FaCar,
//   FaBus,
//   FaGraduationCap,
//   FaBook,
//   FaHospital,
//   FaPills,
// } from "react-icons/fa";
// import {
//   MdOutlineHomeRepairService,
//   MdChildCare,
//   MdSchool,
//   MdFastfood,
// } from "react-icons/md";
// import {
//   RiParkingFill,
//   RiMentalHealthFill,
//   RiBankFill,
//   RiMoneyDollarCircleFill,
// } from "react-icons/ri";
// import { GiPayMoney, GiReceiveMoney, GiTakeMyMoney } from "react-icons/gi";
// import { AiFillCar } from "react-icons/ai";
// import "../styles/PageLayout.css";
// import "./Budgets.css";

// const Budgets = () => {
//   const navigate = useNavigate();
//   const [step, setStep] = useState(1);
//   const [income, setIncome] = useState(0);
//   const [savings, setSavings] = useState(0);

//   const [expenses, setExpenses] = useState({
//     bills: {
//       isOpen: true,
//       items: {
//         garbage: 0,
//         water: 0,
//         electricity: 0,
//         internet: 0,
//         phone: 0,
//       },
//     },
//     housing: {
//       isOpen: true,
//       items: { mortgage: 0, rent: 0, homeImprovement: 0 },
//     },
//     carTransport: {
//       isOpen: true,
//       items: {
//         carPayment: 0,
//         insurance: 0,
//         fuel: 0,
//         maintenance: 0,
//         parking: 0,
//         publicTransport: 0,
//       },
//     },
//     education: {
//       isOpen: true,
//       items: {
//         tuition: 0,
//         books: 0,
//         courses: 0,
//         supplies: 0,
//         studentLoan: 0,
//       },
//     },
//     health: {
//       isOpen: true,
//       items: {
//         insurance: 0,
//         medications: 0,
//         doctorVisits: 0,
//         dental: 0,
//         vision: 0,
//         mentalHealth: 0,
//       },
//     },
//     children: {
//       isOpen: true,
//       items: {
//         childcare: 0,
//         schooling: 0,
//         activities: 0,
//         supplies: 0,
//         clothing: 0,
//       },
//     },
//     financial: {
//       isOpen: true,
//       items: {
//         investments: 0,
//         retirement: 0,
//         emergencyFund: 0,
//         lifeInsurance: 0,
//         debtPayments: 0,
//       },
//     },
//     taxes: {
//       isOpen: true,
//       items: {
//         incomeTax: 0,
//         propertyTax: 0,
//         vehicleTax: 0,
//         otherTaxes: 0,
//       },
//     },
//     foodDining: {
//       isOpen: true,
//       items: {
//         groceries: 0,
//         restaurants: 0,
//         takeout: 0,
//         coffeeSnacks: 0,
//         alcoholBeverages: 0,
//       },
//     },
//   });

//   const totalExpenses = Object.values(expenses).reduce(
//     (total, category) =>
//       total +
//       Object.values(category.items).reduce((sum, amount) => sum + amount, 0),
//     0
//   );

//   const leftToBudget = income - savings - totalExpenses;

//   const handleExpenseChange = (category, item, value) => {
//     const numericValue = Math.max(0, Number(value) || 0); // Prevent negative
//     setExpenses((prev) => ({
//       ...prev,
//       [category]: {
//         ...prev[category],
//         items: {
//           ...prev[category].items,
//           [item]: numericValue,
//         },
//       },
//     }));
//   };

//   const toggleCategory = (category) => {
//     setExpenses((prev) => ({
//       ...prev,
//       [category]: {
//         ...prev[category],
//         isOpen: !prev[category].isOpen,
//       },
//     }));
//   };

//   const getCategoryIcon = (item) => {
//     const icons = {
//       carPayment: <AiFillCar />,
//       parking: <RiParkingFill />,
//       publicTransport: <FaBus />,
//       tuition: <FaGraduationCap />,
//       books: <FaBook />,
//       courses: <MdSchool />,
//       doctorVisits: <FaHospital />,
//       medications: <FaPills />,
//       mentalHealth: <RiMentalHealthFill />,
//       childcare: <MdChildCare />,
//       investments: <RiBankFill />,
//       retirement: <RiMoneyDollarCircleFill />,
//       debtPayments: <GiPayMoney />,
//       incomeTax: <GiReceiveMoney />,
//       propertyTax: <GiTakeMyMoney />,
//       groceries: <MdFastfood />,
//       restaurants: <MdFastfood />,
//       garbage: <FaTrash />,
//       water: <IoWaterOutline />,
//       electricity: <BsLightningCharge />,
//       internet: <BiWifi />,
//       phone: <BsPhone />,
//       mortgage: <IoHomeOutline />,
//       rent: <IoHomeOutline />,
//       homeImprovement: <MdOutlineHomeRepairService />,
//     };
//     return icons[item] || <FaTrash />;
//   };

//   const handleCancel = () => {
//     navigate("/dashboard");
//   };

//   const handleNext = () => {
//     if (step < 3) setStep(step + 1);
//     else navigate("/dashboard");
//   };

//   const handleBack = () => {
//     if (step > 1) setStep(step - 1);
//   };

//   return (
//     <div className="page-container">
//       <div className="page-header">
//         <h1 className="page-title">Budget Planning</h1>
//         <div className="page-actions">
//           {step > 1 && (
//             <button className="action-btn" onClick={handleBack}>
//               ← Back
//             </button>
//           )}
//           <button className="action-btn" onClick={handleCancel}>
//             Cancel
//           </button>
//           <button className="action-btn primary" onClick={handleNext}>
//             {step < 3 ? "Next →" : "Finish"}
//           </button>
//         </div>
//       </div>

//       <div className="progress-steps">
//         <div className={`step ${step >= 1 ? "completed" : ""}`}>
//           <div className="step-indicator">{step > 1 ? "✓" : 1}</div>
//           <span>Income</span>
//         </div>
//         <div className={`step-line ${step > 1 ? "completed" : ""}`}></div>
//         <div className={`step ${step >= 2 ? "completed" : ""}`}>
//           <div className="step-indicator">{step > 2 ? "✓" : 2}</div>
//           <span>Savings</span>
//         </div>
//         <div className={`step-line ${step > 2 ? "completed" : ""}`}></div>
//         <div className={`step ${step === 3 ? "active" : ""}`}>
//           <div className="step-indicator">3</div>
//           <span>Expenses</span>
//         </div>
//       </div>

//       <div className="page-content budget-content">
//         {step === 1 && (
//           <div className="income-step">
//             <h3>Step 1: Enter Your Monthly Income</h3>
//             <input
//               type="number"
//               min="0"
//               value={income}
//               onChange={(e) =>
//                 setIncome(Math.max(0, Number(e.target.value) || 0))
//               }
//               placeholder="Enter your income"
//             />
//           </div>
//         )}

//         {step === 2 && (
//           <div className="savings-step">
//             <h3>Step 2: Enter Your Monthly Savings</h3>
//             <input
//               type="number"
//               min="0"
//               value={savings}
//               onChange={(e) =>
//                 setSavings(Math.max(0, Number(e.target.value) || 0))
//               }
//               placeholder="Enter your savings"
//             />
//           </div>
//         )}
//       </div>

//       {step === 3 && (
//         <div className="budget-content">
//           <div className="budget-form">
//             <h3>Step 3: Enter Your Monthly Expenses</h3>

//             <div className="expenses-section">
//               <div className="expense-total">
//                 <span>Expenses</span>
//                 <span>${totalExpenses.toLocaleString()}</span>
//               </div>

//               {Object.entries(expenses).map(([category, { isOpen, items }]) => (
//                 <div key={category} className="expense-category">
//                   <div
//                     className="category-header"
//                     onClick={() => toggleCategory(category)}
//                   >
//                     <span className="toggle-icon">{isOpen ? "▼" : "▶"}</span>
//                     <h4>{category.replace(/([A-Z])/g, " $1").toUpperCase()}</h4>
//                     <span className="category-amount">
//                       $
//                       {Object.values(items).reduce(
//                         (sum, amount) => sum + amount,
//                         0
//                       )}
//                     </span>
//                   </div>
//                   {isOpen && (
//                     <div className="category-items">
//                       {Object.entries(items).map(([item, amount]) => (
//                         <div key={item} className="expense-item">
//                           {getCategoryIcon(item)}
//                           <span>{item.replace(/([A-Z])/g, " $1")}</span>
//                           <div className="amount-input">
//                             <span>$</span>
//                             <input
//                               type="number"
//                               min="0"
//                               value={amount}
//                               onChange={(e) =>
//                                 handleExpenseChange(
//                                   category,
//                                   item,
//                                   e.target.value
//                                 )
//                               }
//                             />
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="budget-summary">
//             <div className="donut-chart">
//               <div className="chart-center">
//                 <div className="income-amount">${income.toLocaleString()}</div>
//               </div>
//             </div>
//             <div className="summary-items">
//               <div className="summary-item savings">
//                 <span>Savings</span>
//                 <span>${savings.toLocaleString()}</span>
//               </div>
//               <div className="summary-item expenses">
//                 <span>Expenses</span>
//                 <span>${totalExpenses.toLocaleString()}</span>
//               </div>
//               <div className="summary-item remaining">
//                 <span>Left to budget</span>
//                 <span>${leftToBudget.toLocaleString()}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Budgets;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import axios from "../../api/axiosInstance";
import axios from "../api/axiosInstance";

import { IoWaterOutline, IoHomeOutline } from "react-icons/io5";
import { BsLightningCharge, BsPhone } from "react-icons/bs";
import { BiWifi } from "react-icons/bi";
import {
  FaTrash,
  FaCar,
  FaBus,
  FaGraduationCap,
  FaBook,
  FaHospital,
  FaPills,
} from "react-icons/fa";
import {
  MdOutlineHomeRepairService,
  MdChildCare,
  MdSchool,
  MdFastfood,
} from "react-icons/md";
import {
  RiParkingFill,
  RiMentalHealthFill,
  RiBankFill,
  RiMoneyDollarCircleFill,
} from "react-icons/ri";
import { GiPayMoney, GiReceiveMoney, GiTakeMyMoney } from "react-icons/gi";
import { AiFillCar } from "react-icons/ai";
import "../styles/PageLayout.css";
import "./Budgets.css";

const Budgets = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [income, setIncome] = useState(0);
  const [savings, setSavings] = useState(0);
  const [openCategory, setOpenCategory] = useState(null); // Track the open category

  const [expenses, setExpenses] = useState({
    bills: {
      items: { garbage: 0, water: 0, electricity: 0, internet: 0, phone: 0 },
    },
    housing: { items: { mortgage: 0, rent: 0, homeImprovement: 0 } },
    carTransport: {
      items: {
        carPayment: 0,
        insurance: 0,
        fuel: 0,
        maintenance: 0,
        parking: 0,
        publicTransport: 0,
      },
    },
    education: {
      items: { tuition: 0, books: 0, courses: 0, supplies: 0, studentLoan: 0 },
    },
    health: {
      items: {
        insurance: 0,
        medications: 0,
        doctorVisits: 0,
        dental: 0,
        vision: 0,
        mentalHealth: 0,
      },
    },
    children: {
      items: {
        childcare: 0,
        schooling: 0,
        activities: 0,
        supplies: 0,
        clothing: 0,
      },
    },
    financial: {
      items: {
        investments: 0,
        retirement: 0,
        emergencyFund: 0,
        lifeInsurance: 0,
        debtPayments: 0,
      },
    },
    taxes: {
      items: { incomeTax: 0, propertyTax: 0, vehicleTax: 0, otherTaxes: 0 },
    },
    foodDining: {
      items: {
        groceries: 0,
        restaurants: 0,
        takeout: 0,
        coffeeSnacks: 0,
        alcoholBeverages: 0,
      },
    },
  });

  const totalExpenses = Object.values(expenses).reduce(
    (total, category) =>
      total +
      Object.values(category.items).reduce((sum, amount) => sum + amount, 0),
    0
  );

  const leftToBudget = income - savings - totalExpenses;

  const handleIncomeChange = (value) => {
    const cleanedValue = value.replace(/^0+(?!$)/, ""); // Remove leading zeros
    setIncome(Number(cleanedValue));
  };

  const handleSavingsChange = (value) => {
    const cleanedValue = value.replace(/^0+(?!$)/, ""); // Remove leading zeros
    setSavings(Number(cleanedValue));
  };

  const handleExpenseChange = (category, item, value) => {
    const cleanedValue = value.replace(/^0+(?!$)/, ""); // Remove leading zeros
    setExpenses((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        items: {
          ...prev[category].items,
          [item]: Number(cleanedValue) || 0,
        },
      },
    }));
  };

  const toggleCategory = (category) => {
    setOpenCategory((prev) => (prev === category ? null : category));
  };

  const getCategoryIcon = (item) => {
    const icons = {
      carPayment: <AiFillCar />,
      parking: <RiParkingFill />,
      publicTransport: <FaBus />,
      tuition: <FaGraduationCap />,
      books: <FaBook />,
      courses: <MdSchool />,
      doctorVisits: <FaHospital />,
      medications: <FaPills />,
      mentalHealth: <RiMentalHealthFill />,
      childcare: <MdChildCare />,
      investments: <RiBankFill />,
      retirement: <RiMoneyDollarCircleFill />,
      debtPayments: <GiPayMoney />,
      incomeTax: <GiReceiveMoney />,
      propertyTax: <GiTakeMyMoney />,
      groceries: <MdFastfood />,
      restaurants: <MdFastfood />,
      garbage: <FaTrash />,
      water: <IoWaterOutline />,
      electricity: <BsLightningCharge />,
      internet: <BiWifi />,
      phone: <BsPhone />,
      mortgage: <IoHomeOutline />,
      rent: <IoHomeOutline />,
      homeImprovement: <MdOutlineHomeRepairService />,
    };
    return icons[item] || <FaTrash />;
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  // const handleNext = () => {
  //   if (step < 3) setStep(step + 1);
  //   else navigate("/dashboard");
  // };

  // const handleNext = async () => {
  //   if (step < 3) {
  //     setStep(step + 1);
  //   } else {
  //     try {
  //       const response = await fetch("http://localhost:5000/api/setup", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ income, savings, expenses }),
  //       });

  //       if (response.ok) {
  //         console.log("Setup data saved successfully!");
  //         navigate("/dashboard");
  //       } else {
  //         console.error("Failed to save setup data.");
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   }
  // };

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      try {
        const { data } = await axios.post("/setup", {
          income,
          savings,
          expenses,
        });

        console.log("✅ Setup data saved successfully!", data);
        navigate("/dashboard");
      } catch (error) {
        console.error("❌ Failed to save setup data:", error);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Budget Planning</h1>
        <div className="page-actions">
          {step > 1 && (
            <button className="action-btn" onClick={handleBack}>
              ← Back
            </button>
          )}
          <button className="action-btn" onClick={handleCancel}>
            Cancel
          </button>
          <button className="action-btn primary" onClick={handleNext}>
            {step < 3 ? "Next →" : "Finish"}
          </button>
        </div>
      </div>

      <div className="progress-steps">
        <div className={`step ${step >= 1 ? "completed" : ""}`}>
          <div className="step-indicator">{step > 1 ? "✓" : 1}</div>
          <span>Income</span>
        </div>
        <div className={`step-line ${step > 1 ? "completed" : ""}`}></div>
        <div className={`step ${step >= 2 ? "completed" : ""}`}>
          <div className="step-indicator">{step > 2 ? "✓" : 2}</div>
          <span>Savings</span>
        </div>
        <div className={`step-line ${step > 2 ? "completed" : ""}`}></div>
        <div className={`step ${step === 3 ? "active" : ""}`}>
          <div className="step-indicator">3</div>
          <span>Expenses</span>
        </div>
      </div>

      <div className="page-content budget-content">
        {step === 1 && (
          <div className="income-step">
            <h3>Step 1: Enter Your Monthly Income</h3>
            <input
              type="number"
              value={income}
              onChange={(e) => handleIncomeChange(e.target.value)}
              placeholder="Enter your income"
              min="0"
            />
          </div>
        )}

        {step === 2 && (
          <div className="savings-step">
            <h3>Step 2: Enter Your Monthly Savings</h3>
            <input
              type="number"
              value={savings}
              onChange={(e) => handleSavingsChange(e.target.value)}
              placeholder="Enter your savings"
              min="0"
            />
          </div>
        )}
      </div>

      {step === 3 && (
        <div className="budget-content">
          <div className="budget-form">
            <h3>Step 3: Enter Your Monthly Expenses</h3>
            <div className="expenses-section">
              <div className="expense-total">
                <span>Expenses</span>
                <span>${totalExpenses.toLocaleString()}</span>
              </div>

              {Object.entries(expenses).map(([category, { items }]) => (
                <div key={category} className="expense-category">
                  <div
                    className="category-header"
                    onClick={() => toggleCategory(category)}
                  >
                    <span className="toggle-icon">
                      {openCategory === category ? "▼" : "▶"}
                    </span>
                    <h4>{category.replace(/([A-Z])/g, " $1").toUpperCase()}</h4>
                    <span className="category-amount">
                      $
                      {Object.values(items).reduce(
                        (sum, amount) => sum + amount,
                        0
                      )}
                    </span>
                  </div>
                  {openCategory === category && (
                    <div className="category-items">
                      {Object.entries(items).map(([item, amount]) => (
                        <div key={item} className="expense-item">
                          {getCategoryIcon(item)}
                          <span>{item.replace(/([A-Z])/g, " $1")}</span>
                          <div className="amount-input">
                            <span>$</span>
                            <input
                              type="number"
                              value={amount}
                              onChange={(e) =>
                                handleExpenseChange(
                                  category,
                                  item,
                                  e.target.value
                                )
                              }
                              min="0"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="budget-summary">
            <div className="donut-chart">
              <div className="chart-center">
                <div className="income-amount">${income.toLocaleString()}</div>
              </div>
            </div>
            <div className="summary-items">
              <div className="summary-item savings">
                <span>Savings</span>
                <span>${savings.toLocaleString()}</span>
              </div>
              <div className="summary-item expenses">
                <span>Expenses</span>
                <span>${totalExpenses.toLocaleString()}</span>
              </div>
              <div className="summary-item remaining">
                <span>Left to budget</span>
                <span>${leftToBudget.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budgets;
