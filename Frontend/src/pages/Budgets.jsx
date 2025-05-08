import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  FaMoneyBillWave,
  FaPiggyBank,
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
  const [income, setIncome] = useState("");
  const [savings, setSavings] = useState("");
  const [openCategory, setOpenCategory] = useState(null);

  const [expenses, setExpenses] = useState({
    bills: {
      items: { garbage: "", water: "", electricity: "", internet: "", phone: "" },
    },
    housing: { items: { mortgage: "", rent: "", homeImprovement: "" } },
    carTransport: {
      items: {
        carPayment: "",
        insurance: "",
        fuel: "",
        maintenance: "",
        parking: "",
        publicTransport: "",
      },
    },
    education: {
      items: { tuition: "", books: "", courses: "", supplies: "", studentLoan: "" },
    },
    health: {
      items: {
        insurance: "",
        medications: "",
        doctorVisits: "",
        dental: "",
        vision: "",
        mentalHealth: "",
      },
    },
    children: {
      items: {
        childcare: "",
        schooling: "",
        activities: "",
        supplies: "",
        clothing: "",
      },
    },
    financial: {
      items: {
        investments: "",
        retirement: "",
        emergencyFund: "",
        lifeInsurance: "",
        debtPayments: "",
      },
    },
    taxes: {
      items: { incomeTax: "", propertyTax: "", vehicleTax: "", otherTaxes: "" },
    },
    foodDining: {
      items: {
        groceries: "",
        restaurants: "",
        takeout: "",
        coffeeSnacks: "",
        alcoholBeverages: "",
      },
    },
  });

  const totalExpenses = Object.values(expenses).reduce(
    (total, category) =>
      total +
      Object.values(category.items).reduce((sum, amount) => sum + (Number(amount) || 0), 0),
    0
  );

  const leftToBudget = (Number(income) || 0) - (Number(savings) || 0) - totalExpenses;

  const handleIncomeChange = (value) => {
    const cleanedValue = value.replace(/^0+(?!$)/, "") || "";
    setIncome(cleanedValue);
  };

  const handleSavingsChange = (value) => {
    const cleanedValue = value.replace(/^0+(?!$)/, "") || "";
    setSavings(cleanedValue);
  };

  const handleExpenseChange = (category, item, value) => {
    const cleanedValue = value.replace(/^0+(?!$)/, "") || "";
    setExpenses((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        items: {
          ...prev[category].items,
          [item]: cleanedValue,
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

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      try {
        const { data } = await axios.post("/setup", {
          income: Number(income) || 0,
          savings: Number(savings) || 0,
          expenses: Object.fromEntries(
            Object.entries(expenses).map(([category, { items }]) => [
              category,
              {
                items: Object.fromEntries(
                  Object.entries(items).map(([item, value]) => [item, Number(value) || 0])
                ),
              },
            ])
          ),
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
          <div className="income-step centered-content">
            <div className="step-card">
              <div className="step-icon">
                <FaMoneyBillWave />
              </div>
              <h3>Step 1: Enter Your Monthly Income</h3>
              <p className="step-description">
                Tell us how much you earn each month to start building your budget.
              </p>
              <div className="input-wrapper">
                <span className="input-prefix">$</span>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => handleIncomeChange(e.target.value)}
                  placeholder="0"
                  min="0"
                  className="styled-input"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="savings-step centered-content">
            <div className="step-card">
              <div className="step-icon">
                <FaPiggyBank />
              </div>
              <h3>Step 2: Enter Your Monthly Savings</h3>
              <p className="step-description">
                Specify how much you'd like to save each month for your financial goals.
              </p>
              <div className="input-wrapper">
                <span className="input-prefix">$</span>
                <input
                  type="number"
                  value={savings}
                  onChange={(e) => handleSavingsChange(e.target.value)}
                  placeholder="0"
                  min="0"
                  className="styled-input"
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="budget-content centered-content">
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
                        ${Object.values(items).reduce((sum, amount) => sum + (Number(amount) || 0), 0)}
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
                                  handleExpenseChange(category, item, e.target.value)
                                }
                                placeholder="0"
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
                  <div className="income-amount">${(Number(income) || 0).toLocaleString()}</div>
                </div>
              </div>
              <div className="summary-items">
                <div className="summary-item savings">
                  <span>Savings</span>
                  <span>${(Number(savings) || 0).toLocaleString()}</span>
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
    </div>
  );
};

export default Budgets;