// src/components/LineChartComponent.jsx
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", value: 10000 },
  { name: "Feb", value: 15000 },
  { name: "Mar", value: 12000 },
  { name: "Apr", value: 18000 },
  { name: "May", value: 21000 },
  { name: "Jun", value: 25000 },
];

const LineChartComponent = () => {
  return (
    <div className="card">
      <h3>Accounts Overview</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
