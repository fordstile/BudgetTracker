import React, { useState } from 'react';
import { FaCalculator, FaMoneyBillWave, FaChartLine, FaHome, FaCar, FaGraduationCap, FaCreditCard } from 'react-icons/fa';
import '../styles/PageLayout.css';
import './Calculators.css';

const Calculators = () => {
  const [activeCalculator, setActiveCalculator] = useState('budget');
  const [results, setResults] = useState(null);

  const calculators = [
    { id: 'budget', name: 'Budget Calculator', icon: <FaMoneyBillWave /> },
    { id: 'savings', name: 'Savings Calculator', icon: <FaChartLine /> },
    { id: 'mortgage', name: 'Mortgage Calculator', icon: <FaHome /> },
    { id: 'car', name: 'Car Loan Calculator', icon: <FaCar /> },
    { id: 'student', name: 'Student Loan Calculator', icon: <FaGraduationCap /> },
    { id: 'debt', name: 'Debt Payoff Calculator', icon: <FaCreditCard /> }
  ];

  const [calculatorInputs, setCalculatorInputs] = useState({
    budget: {
      income: '',
      expenses: '',
      savings: ''
    },
    savings: {
      initialAmount: '',
      monthlyContribution: '',
      interestRate: '',
      years: ''
    },
    mortgage: {
      homePrice: '',
      downPayment: '',
      interestRate: '',
      loanTerm: ''
    },
    car: {
      carPrice: '',
      downPayment: '',
      interestRate: '',
      loanTerm: ''
    },
    student: {
      loanAmount: '',
      interestRate: '',
      loanTerm: '',
      gracePeriod: ''
    },
    debt: {
      totalDebt: '',
      monthlyPayment: '',
      interestRate: '',
      extraPayment: ''
    }
  });

  const handleInputChange = (calculator, field, value) => {
    setCalculatorInputs(prev => ({
      ...prev,
      [calculator]: {
        ...prev[calculator],
        [field]: value
      }
    }));
  };

  const calculateResults = () => {
    const inputs = calculatorInputs[activeCalculator];
    let result = {};

    switch (activeCalculator) {
      case 'budget':
        const monthlyIncome = parseFloat(inputs.income) || 0;
        const monthlyExpenses = parseFloat(inputs.expenses) || 0;
        const monthlySavings = parseFloat(inputs.savings) || 0;
        const remaining = monthlyIncome - monthlyExpenses - monthlySavings;
        result = {
          monthlyIncome,
          monthlyExpenses,
          monthlySavings,
          remaining,
          savingsPercentage: (monthlySavings / monthlyIncome) * 100
        };
        break;

      case 'savings':
        const P = parseFloat(inputs.initialAmount) || 0;
        const PMT = parseFloat(inputs.monthlyContribution) || 0;
        const r = (parseFloat(inputs.interestRate) || 0) / 100 / 12;
        const n = (parseFloat(inputs.years) || 0) * 12;
        const FV = P * Math.pow(1 + r, n) + PMT * ((Math.pow(1 + r, n) - 1) / r);
        result = {
          finalAmount: FV,
          totalContributions: P + (PMT * n),
          interestEarned: FV - (P + (PMT * n))
        };
        break;

      case 'mortgage':
        const principal = parseFloat(inputs.homePrice) - parseFloat(inputs.downPayment);
        const monthlyRate = (parseFloat(inputs.interestRate) || 0) / 100 / 12;
        const numberOfPayments = (parseFloat(inputs.loanTerm) || 0) * 12;
        const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        result = {
          monthlyPayment,
          totalPayment: monthlyPayment * numberOfPayments,
          totalInterest: (monthlyPayment * numberOfPayments) - principal
        };
        break;

      case 'car':
        const carPrincipal = parseFloat(inputs.carPrice) - parseFloat(inputs.downPayment);
        const carMonthlyRate = (parseFloat(inputs.interestRate) || 0) / 100 / 12;
        const carNumberOfPayments = (parseFloat(inputs.loanTerm) || 0) * 12;
        const carMonthlyPayment = carPrincipal * (carMonthlyRate * Math.pow(1 + carMonthlyRate, carNumberOfPayments)) / (Math.pow(1 + carMonthlyRate, carNumberOfPayments) - 1);
        result = {
          monthlyPayment: carMonthlyPayment,
          totalPayment: carMonthlyPayment * carNumberOfPayments,
          totalInterest: (carMonthlyPayment * carNumberOfPayments) - carPrincipal
        };
        break;

      case 'student':
        const studentPrincipal = parseFloat(inputs.loanAmount);
        const studentMonthlyRate = (parseFloat(inputs.interestRate) || 0) / 100 / 12;
        const studentNumberOfPayments = (parseFloat(inputs.loanTerm) || 0) * 12;
        const studentMonthlyPayment = studentPrincipal * (studentMonthlyRate * Math.pow(1 + studentMonthlyRate, studentNumberOfPayments)) / (Math.pow(1 + studentMonthlyRate, studentNumberOfPayments) - 1);
        result = {
          monthlyPayment: studentMonthlyPayment,
          totalPayment: studentMonthlyPayment * studentNumberOfPayments,
          totalInterest: (studentMonthlyPayment * studentNumberOfPayments) - studentPrincipal
        };
        break;

      case 'debt':
        const debtAmount = parseFloat(inputs.totalDebt);
        const monthlyDebtPayment = parseFloat(inputs.monthlyPayment);
        const debtInterestRate = (parseFloat(inputs.interestRate) || 0) / 100 / 12;
        const extraPayment = parseFloat(inputs.extraPayment) || 0;
        const totalPayment = monthlyDebtPayment + extraPayment;
        
        let remainingDebt = debtAmount;
        let months = 0;
        let totalInterest = 0;
        
        while (remainingDebt > 0) {
          const interest = remainingDebt * debtInterestRate;
          const principalPayment = totalPayment - interest;
          remainingDebt -= principalPayment;
          totalInterest += interest;
          months++;
        }
        
        result = {
          monthsToPayoff: months,
          totalInterest,
          totalPayment: (monthlyDebtPayment * months) + (extraPayment * months)
        };
        break;

      default:
        result = null;
    }

    setResults(result);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${value.toFixed(2)}%`;
  };

  const renderCalculatorInputs = () => {
    switch (activeCalculator) {
      case 'budget':
        return (
          <div className="calculator-inputs">
            <div className="input-group">
              <label>Monthly Income</label>
              <input
                type="number"
                value={calculatorInputs.budget.income}
                onChange={(e) => handleInputChange('budget', 'income', e.target.value)}
                placeholder="Enter monthly income"
              />
            </div>
            <div className="input-group">
              <label>Monthly Expenses</label>
              <input
                type="number"
                value={calculatorInputs.budget.expenses}
                onChange={(e) => handleInputChange('budget', 'expenses', e.target.value)}
                placeholder="Enter monthly expenses"
              />
            </div>
            <div className="input-group">
              <label>Monthly Savings Goal</label>
              <input
                type="number"
                value={calculatorInputs.budget.savings}
                onChange={(e) => handleInputChange('budget', 'savings', e.target.value)}
                placeholder="Enter savings goal"
              />
            </div>
          </div>
        );

      case 'savings':
        return (
          <div className="calculator-inputs">
            <div className="input-group">
              <label>Initial Amount</label>
              <input
                type="number"
                value={calculatorInputs.savings.initialAmount}
                onChange={(e) => handleInputChange('savings', 'initialAmount', e.target.value)}
                placeholder="Enter initial amount"
              />
            </div>
            <div className="input-group">
              <label>Monthly Contribution</label>
              <input
                type="number"
                value={calculatorInputs.savings.monthlyContribution}
                onChange={(e) => handleInputChange('savings', 'monthlyContribution', e.target.value)}
                placeholder="Enter monthly contribution"
              />
            </div>
            <div className="input-group">
              <label>Annual Interest Rate (%)</label>
              <input
                type="number"
                value={calculatorInputs.savings.interestRate}
                onChange={(e) => handleInputChange('savings', 'interestRate', e.target.value)}
                placeholder="Enter interest rate"
              />
            </div>
            <div className="input-group">
              <label>Number of Years</label>
              <input
                type="number"
                value={calculatorInputs.savings.years}
                onChange={(e) => handleInputChange('savings', 'years', e.target.value)}
                placeholder="Enter number of years"
              />
            </div>
          </div>
        );

      case 'mortgage':
        return (
          <div className="calculator-inputs">
            <div className="input-group">
              <label>Home Price</label>
              <input
                type="number"
                value={calculatorInputs.mortgage.homePrice}
                onChange={(e) => handleInputChange('mortgage', 'homePrice', e.target.value)}
                placeholder="Enter home price"
              />
            </div>
            <div className="input-group">
              <label>Down Payment</label>
              <input
                type="number"
                value={calculatorInputs.mortgage.downPayment}
                onChange={(e) => handleInputChange('mortgage', 'downPayment', e.target.value)}
                placeholder="Enter down payment"
              />
            </div>
            <div className="input-group">
              <label>Interest Rate (%)</label>
              <input
                type="number"
                value={calculatorInputs.mortgage.interestRate}
                onChange={(e) => handleInputChange('mortgage', 'interestRate', e.target.value)}
                placeholder="Enter interest rate"
              />
            </div>
            <div className="input-group">
              <label>Loan Term (Years)</label>
              <input
                type="number"
                value={calculatorInputs.mortgage.loanTerm}
                onChange={(e) => handleInputChange('mortgage', 'loanTerm', e.target.value)}
                placeholder="Enter loan term"
              />
            </div>
          </div>
        );

      case 'car':
        return (
          <div className="calculator-inputs">
            <div className="input-group">
              <label>Car Price</label>
              <input
                type="number"
                value={calculatorInputs.car.carPrice}
                onChange={(e) => handleInputChange('car', 'carPrice', e.target.value)}
                placeholder="Enter car price"
              />
            </div>
            <div className="input-group">
              <label>Down Payment</label>
              <input
                type="number"
                value={calculatorInputs.car.downPayment}
                onChange={(e) => handleInputChange('car', 'downPayment', e.target.value)}
                placeholder="Enter down payment"
              />
            </div>
            <div className="input-group">
              <label>Interest Rate (%)</label>
              <input
                type="number"
                value={calculatorInputs.car.interestRate}
                onChange={(e) => handleInputChange('car', 'interestRate', e.target.value)}
                placeholder="Enter interest rate"
              />
            </div>
            <div className="input-group">
              <label>Loan Term (Years)</label>
              <input
                type="number"
                value={calculatorInputs.car.loanTerm}
                onChange={(e) => handleInputChange('car', 'loanTerm', e.target.value)}
                placeholder="Enter loan term"
              />
            </div>
          </div>
        );

      case 'student':
        return (
          <div className="calculator-inputs">
            <div className="input-group">
              <label>Loan Amount</label>
              <input
                type="number"
                value={calculatorInputs.student.loanAmount}
                onChange={(e) => handleInputChange('student', 'loanAmount', e.target.value)}
                placeholder="Enter loan amount"
              />
            </div>
            <div className="input-group">
              <label>Interest Rate (%)</label>
              <input
                type="number"
                value={calculatorInputs.student.interestRate}
                onChange={(e) => handleInputChange('student', 'interestRate', e.target.value)}
                placeholder="Enter interest rate"
              />
            </div>
            <div className="input-group">
              <label>Loan Term (Years)</label>
              <input
                type="number"
                value={calculatorInputs.student.loanTerm}
                onChange={(e) => handleInputChange('student', 'loanTerm', e.target.value)}
                placeholder="Enter loan term"
              />
            </div>
            <div className="input-group">
              <label>Grace Period (Months)</label>
              <input
                type="number"
                value={calculatorInputs.student.gracePeriod}
                onChange={(e) => handleInputChange('student', 'gracePeriod', e.target.value)}
                placeholder="Enter grace period"
              />
            </div>
          </div>
        );

      case 'debt':
        return (
          <div className="calculator-inputs">
            <div className="input-group">
              <label>Total Debt Amount</label>
              <input
                type="number"
                value={calculatorInputs.debt.totalDebt}
                onChange={(e) => handleInputChange('debt', 'totalDebt', e.target.value)}
                placeholder="Enter total debt"
              />
            </div>
            <div className="input-group">
              <label>Monthly Payment</label>
              <input
                type="number"
                value={calculatorInputs.debt.monthlyPayment}
                onChange={(e) => handleInputChange('debt', 'monthlyPayment', e.target.value)}
                placeholder="Enter monthly payment"
              />
            </div>
            <div className="input-group">
              <label>Interest Rate (%)</label>
              <input
                type="number"
                value={calculatorInputs.debt.interestRate}
                onChange={(e) => handleInputChange('debt', 'interestRate', e.target.value)}
                placeholder="Enter interest rate"
              />
            </div>
            <div className="input-group">
              <label>Extra Monthly Payment</label>
              <input
                type="number"
                value={calculatorInputs.debt.extraPayment}
                onChange={(e) => handleInputChange('debt', 'extraPayment', e.target.value)}
                placeholder="Enter extra payment"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderResults = () => {
    if (!results) return null;

    switch (activeCalculator) {
      case 'budget':
        return (
          <div className="calculator-results">
            <div className="result-item">
              <span>Monthly Income</span>
              <span>{formatCurrency(results.monthlyIncome)}</span>
            </div>
            <div className="result-item">
              <span>Monthly Expenses</span>
              <span>{formatCurrency(results.monthlyExpenses)}</span>
            </div>
            <div className="result-item">
              <span>Monthly Savings</span>
              <span>{formatCurrency(results.monthlySavings)}</span>
            </div>
            <div className="result-item">
              <span>Remaining Balance</span>
              <span className={results.remaining >= 0 ? 'positive' : 'negative'}>
                {formatCurrency(results.remaining)}
              </span>
            </div>
            <div className="result-item">
              <span>Savings Rate</span>
              <span>{formatPercentage(results.savingsPercentage)}</span>
            </div>
          </div>
        );

      case 'savings':
        return (
          <div className="calculator-results">
            <div className="result-item">
              <span>Final Amount</span>
              <span>{formatCurrency(results.finalAmount)}</span>
            </div>
            <div className="result-item">
              <span>Total Contributions</span>
              <span>{formatCurrency(results.totalContributions)}</span>
            </div>
            <div className="result-item">
              <span>Interest Earned</span>
              <span>{formatCurrency(results.interestEarned)}</span>
            </div>
          </div>
        );

      case 'mortgage':
      case 'car':
        return (
          <div className="calculator-results">
            <div className="result-item">
              <span>Monthly Payment</span>
              <span>{formatCurrency(results.monthlyPayment)}</span>
            </div>
            <div className="result-item">
              <span>Total Payment</span>
              <span>{formatCurrency(results.totalPayment)}</span>
            </div>
            <div className="result-item">
              <span>Total Interest</span>
              <span>{formatCurrency(results.totalInterest)}</span>
            </div>
          </div>
        );

      case 'student':
        return (
          <div className="calculator-results">
            <div className="result-item">
              <span>Monthly Payment</span>
              <span>{formatCurrency(results.monthlyPayment)}</span>
            </div>
            <div className="result-item">
              <span>Total Payment</span>
              <span>{formatCurrency(results.totalPayment)}</span>
            </div>
            <div className="result-item">
              <span>Total Interest</span>
              <span>{formatCurrency(results.totalInterest)}</span>
            </div>
          </div>
        );

      case 'debt':
        return (
          <div className="calculator-results">
            <div className="result-item">
              <span>Months to Payoff</span>
              <span>{results.monthsToPayoff}</span>
            </div>
            <div className="result-item">
              <span>Total Interest</span>
              <span>{formatCurrency(results.totalInterest)}</span>
            </div>
            <div className="result-item">
              <span>Total Payment</span>
              <span>{formatCurrency(results.totalPayment)}</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Financial Calculators</h1>
        <p className="page-subtitle">Choose a calculator to help with your financial planning</p>
      </div>

      <div className="calculators-grid">
        {calculators.map(calculator => (
          <div
            key={calculator.id}
            className={`calculator-card ${activeCalculator === calculator.id ? 'active' : ''}`}
            onClick={() => {
              setActiveCalculator(calculator.id);
              setResults(null);
            }}
          >
            <div className="calculator-icon">{calculator.icon}</div>
            <h3>{calculator.name}</h3>
          </div>
        ))}
      </div>

      <div className="page-content calculator-section">
        <div className="calculator-content">
          <h2>{calculators.find(c => c.id === activeCalculator)?.name}</h2>
          {renderCalculatorInputs()}
          <button className="calculate-btn" onClick={calculateResults}>
            Calculate
          </button>
          {renderResults()}
        </div>
      </div>
    </div>
  );
};

export default Calculators; 