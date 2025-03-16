// src/components/PieChartComponent.jsx
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./PieChartComponent.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = () => {
  const data = {
    labels: ["Savings", "Expenses", "Left to budget"],
    datasets: [
      {
        data: [1000, 3952, 548], // Amounts from the image
        backgroundColor: ["#6A5ACD", "#000080", "#CBC3E3"], // Colors from image
        hoverBackgroundColor: ["#5A4ACD", "#000070", "#BBA3E3"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "70%", // Creates the donut effect
    plugins: {
      legend: {
        display: false, // Hides default legend
      },
    },
  };

  return (
    <div className="card pie-chart-card">
      <div className="header">
        <p className="title">MONTHLY BUDGET</p>
        <a href="/" className="manage-link">Manage budget</a>
      </div>
      <p className="subtitle">Jun 01 - Jun 30, 2023</p>
      <div className="chart-container">
        <Doughnut data={data} options={options} />
        <div className="chart-center">
          <p className="income-label">Income</p>
          <p className="income-amount">$5,500</p>
        </div>
      </div>
      <div className="legend">
        <div><span className="dot savings"></span> Savings <span className="amount">$1,000</span></div>
        <div><span className="dot expenses"></span> Expenses <span className="amount">$3,952</span></div>
        <div><span className="dot left"></span> Left to budget <span className="amount">$548</span></div>
      </div>
    </div>
  );
};

export default PieChartComponent;
