import React, { useState } from 'react';
import { IoWaterOutline, IoHomeOutline } from 'react-icons/io5';
import { BsLightningCharge, BsPhone } from 'react-icons/bs';
import { BiWifi } from 'react-icons/bi';
import { FaTrash, FaCar, FaBus, FaGraduationCap, FaBook, FaHospital, FaPills } from 'react-icons/fa';
import { MdOutlineHomeRepairService, MdChildCare, MdSchool, MdFastfood } from 'react-icons/md';
import { RiParkingFill, RiMentalHealthFill, RiBankFill, RiMoneyDollarCircleFill } from 'react-icons/ri';
import { GiPayMoney, GiReceiveMoney, GiTakeMyMoney } from 'react-icons/gi';
import { AiFillCar } from 'react-icons/ai';
import '../styles/PageLayout.css';
import './Budgets.css';

const Budgets = () => {
  const [step, setStep] = useState(3);
  const [expenses, setExpenses] = useState({
    bills: {
      isOpen: true,
      items: {
        garbage: 20,
        water: 50,
        electricity: 60,
        internet: 35,
        phone: 15
      }
    },
    housing: {
      isOpen: true,
      items: {
        mortgage: 0,
        rent: 550,
        homeImprovement: 0
      }
    },
    carTransport: {
      isOpen: true,
      items: {
        carPayment: 300,
        insurance: 150,
        fuel: 200,
        maintenance: 100,
        parking: 50,
        publicTransport: 45
      }
    },
    education: {
      isOpen: true,
      items: {
        tuition: 0,
        books: 50,
        courses: 100,
        supplies: 30,
        studentLoan: 200
      }
    },
    health: {
      isOpen: true,
      items: {
        insurance: 200,
        medications: 50,
        doctorVisits: 100,
        dental: 75,
        vision: 25,
        mentalHealth: 80
      }
    },
    children: {
      isOpen: true,
      items: {
        childcare: 400,
        schooling: 300,
        activities: 100,
        supplies: 50,
        clothing: 75
      }
    },
    financial: {
      isOpen: true,
      items: {
        investments: 200,
        retirement: 300,
        emergencyFund: 150,
        lifeInsurance: 50,
        debtPayments: 200
      }
    },
    taxes: {
      isOpen: true,
      items: {
        incomeTax: 800,
        propertyTax: 200,
        vehicleTax: 50,
        otherTaxes: 100
      }
    },
    foodDining: {
      isOpen: true,
      items: {
        groceries: 400,
        restaurants: 200,
        takeout: 100,
        coffeeSnacks: 50,
        alcoholBeverages: 75
      }
    }
  });

  const income = 5500;
  const savings = 1000;
  const totalExpenses = Object.values(expenses).reduce((total, category) => 
    total + Object.values(category.items).reduce((sum, amount) => sum + amount, 0), 0
  );
  const leftToBudget = income - savings - totalExpenses;

  const handleExpenseChange = (category, item, value) => {
    setExpenses(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        items: {
          ...prev[category].items,
          [item]: Number(value) || 0
        }
      }
    }));
  };

  const toggleCategory = (category) => {
    setExpenses(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        isOpen: !prev[category].isOpen
      }
    }));
  };

  const getCategoryIcon = (item) => {
    const icons = {
      // Transport icons
      carPayment: <AiFillCar />,
      parking: <RiParkingFill />,
      publicTransport: <FaBus />,
      
      // Education icons
      tuition: <FaGraduationCap />,
      books: <FaBook />,
      courses: <MdSchool />,
      
      // Health icons
      doctorVisits: <FaHospital />,
      medications: <FaPills />,
      mentalHealth: <RiMentalHealthFill />,
      
      // Children icons
      childcare: <MdChildCare />,
      
      // Financial icons
      investments: <RiBankFill />,
      retirement: <RiMoneyDollarCircleFill />,
      debtPayments: <GiPayMoney />,
      
      // Tax icons
      incomeTax: <GiReceiveMoney />,
      propertyTax: <GiTakeMyMoney />,
      
      // Food icons
      groceries: <MdFastfood />,
      restaurants: <MdFastfood />,
      
      // Default icons for existing categories
      garbage: <FaTrash />,
      water: <IoWaterOutline />,
      electricity: <BsLightningCharge />,
      internet: <BiWifi />,
      phone: <BsPhone />,
      mortgage: <IoHomeOutline />,
      rent: <IoHomeOutline />,
      homeImprovement: <MdOutlineHomeRepairService />
    };
    
    return icons[item] || <FaTrash />;
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Budget Planning</h1>
        <div className="page-actions">
          <button className="action-btn">Cancel</button>
          <button className="action-btn primary">Next →</button>
        </div>
      </div>

      <div className="progress-steps">
        <div className="step completed">
          <div className="step-indicator">✓</div>
          <span>Income</span>
        </div>
        <div className="step-line completed"></div>
        <div className="step completed">
          <div className="step-indicator">✓</div>
          <span>Savings</span>
        </div>
        <div className="step-line completed"></div>
        <div className="step active">
          <div className="step-indicator">3</div>
          <span>Expenses</span>
        </div>
      </div>

      <div className="page-content budget-content">
        <div className="budget-form">
          <h3>Step {step}. Enter your monthly expenses.</h3>

          <div className="expenses-section">
            <div className="expense-total">
              <span>Expenses</span>
              <span>${totalExpenses.toLocaleString()}</span>
            </div>

            {Object.entries(expenses).map(([category, { isOpen, items }]) => (
              <div key={category} className="expense-category">
                <div className="category-header" onClick={() => toggleCategory(category)}>
                  <span className="toggle-icon">{isOpen ? '▼' : '▶'}</span>
                  <h4>{category.replace(/([A-Z])/g, ' $1').toUpperCase()}</h4>
                  <span className="category-amount">
                    ${Object.values(items).reduce((sum, amount) => sum + amount, 0)}
                  </span>
                </div>
                {isOpen && (
                  <div className="category-items">
                    {Object.entries(items).map(([item, amount]) => (
                      <div key={item} className="expense-item">
                        {getCategoryIcon(item)}
                        <span>{item.replace(/([A-Z])/g, ' $1')}</span>
                        <div className="amount-input">
                          <span>$</span>
                          <input
                            type="number"
                            value={amount}
                            onChange={(e) => handleExpenseChange(category, item, e.target.value)}
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
    </div>
  );
};

export default Budgets; 