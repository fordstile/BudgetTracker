// src/components/TransactionsTable.jsx
import React from "react";

const TransactionsTable = () => {
  const transactions = [
    { account: "US Bank (0092)", transaction: "Walmart", category: "Groceries", date: "05/20/2023", amount: "-$78.20" },
    { account: "Wallet", transaction: "Fiverr International", category: "Other income", date: "05/19/2023", amount: "+$500" },
    { account: "Revolut (49221)", transaction: "Chevron", category: "Gas", date: "05/19/2023", amount: "-$100" },
  ];

  return (
    <div className="card">
      <h3>Recent Transactions</h3>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Account</th>
            <th>Transaction</th>
            <th>Category</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, index) => (
            <tr key={index}>
              <td>{tx.account}</td>
              <td>{tx.transaction}</td>
              <td>{tx.category}</td>
              <td>{tx.date}</td>
              <td>{tx.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
