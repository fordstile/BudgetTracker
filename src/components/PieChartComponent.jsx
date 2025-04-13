// src/components/PieChartComponent.jsx
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = () => {
  const data = {
    labels: ["Savings", "Expenses", "Left to budget"],
    datasets: [
      {
        data: [1000, 3952, 548],
        backgroundColor: ["#2563eb", "#3b82f6", "#93c5fd"],
        hoverBackgroundColor: ["#1d4ed8", "#2563eb", "#60a5fa"],
        borderWidth: 0,
        spacing: 3,
        borderRadius: 2,
      },
    ],
  };

  const options = {
    cutout: "80%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    maintainAspectRatio: false,
    rotation: -90,
  };

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h2>Monthly Budget</h2>
        <div className="chart-period">
          <button className="period-btn">Manage Budget</button>
        </div>
      </div>
      <p style={{ 
        margin: '4px 0 12px',
        fontSize: '14px',
        color: '#64748b'
      }}>Jun 01 - Jun 30, 2023</p>
      <div style={{ 
        position: 'relative',
        height: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '10px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '220px',
          aspectRatio: '1',
          position: 'relative'
        }}>
          <Doughnut data={data} options={options} />
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            background: 'white',
            borderRadius: '50%',
            padding: '20px'
          }}>
            <p style={{ 
              margin: '0',
              fontSize: '12px',
              color: '#64748b'
            }}>Income</p>
            <p style={{
              margin: '0',
              fontSize: '24px',
              fontWeight: '600',
              color: '#1e293b'
            }}>$5,500</p>
          </div>
        </div>
      </div>
      <div style={{ 
        borderTop: '1px solid #e2e8f0', 
        paddingTop: '16px',
        marginTop: '20px'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              background: '#2563eb',
              display: 'inline-block'
            }}></span>
            <span style={{ fontSize: '14px', color: '#1e293b' }}>Savings</span>
          </div>
          <span style={{ fontSize: '14px', fontWeight: '500', color: '#1e293b' }}>$1,000</span>
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              background: '#3b82f6',
              display: 'inline-block'
            }}></span>
            <span style={{ fontSize: '14px', color: '#1e293b' }}>Expenses</span>
          </div>
          <span style={{ fontSize: '14px', fontWeight: '500', color: '#1e293b' }}>$3,952</span>
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              background: '#93c5fd',
              display: 'inline-block'
            }}></span>
            <span style={{ fontSize: '14px', color: '#1e293b' }}>Left to budget</span>
          </div>
          <span style={{ fontSize: '14px', fontWeight: '500', color: '#1e293b' }}>$548</span>
        </div>
      </div>
    </div>
  );
};

export default PieChartComponent;
