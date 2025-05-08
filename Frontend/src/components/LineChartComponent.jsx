
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const LineChartComponent = ({ income = 0, expenses = 0, savings = 0 }) => {
  const data = [
    { name: "Income", value: income },
    { name: "Expenses", value: expenses },
    { name: "Savings", value: savings },
  ];

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h2>Accounts Overview</h2>
        <div className="chart-period">
          <button className="period-btn">Week</button>
          <button className="period-btn active">Month</button>
          <button className="period-btn">Year</button>
        </div>
      </div>
      <div style={{ width: "100%", height: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              dx={-10}
            />
            <Tooltip
              contentStyle={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "12px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
              labelStyle={{ color: "#64748b", marginBottom: "4px" }}
              itemStyle={{ color: "#1e293b", fontSize: "14px" }}
              formatter={(value) => [`$${value.toLocaleString()}`, "Amount"]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{ fill: "white", stroke: "#2563eb", strokeWidth: 2, r: 4 }}
              activeDot={{
                fill: "#2563eb",
                stroke: "white",
                strokeWidth: 2,
                r: 6,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartComponent;
