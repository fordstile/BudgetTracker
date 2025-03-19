import React, { useState } from "react";
import AddTransactionModal from "./AddTransactionModal";
import { FaEllipsisV } from "react-icons/fa";
import "./TransactionsTable.css";

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([
   
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  return (
    <div className="transactions-card">
      {/* Header Section */}
      <div className="transactions-header">
        <h3>Recent Transactions</h3>
        <div className="actions">
          <span className="add-transaction" onClick={() => setIsModalOpen(true)}>
            + Add new transaction
          </span>
          <span className="see-more">See more</span>
        </div>
      </div>

      {/* Transactions Table */}
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Account</th>
            <th>Transaction</th>
            <th>Category</th>
            <th>Date</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, index) => (
            <tr key={index}>
              <td>{tx.account}</td>
              <td>{tx.transaction}</td>
              <td>{tx.category}</td>
              <td>{tx.date}</td>
              <td className={tx.amount >= 0 ? "positive" : "negative"}>{tx.amount}</td>
              <td>
                <FaEllipsisV className="action-icon" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Transaction Modal */}
      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddTransaction={addTransaction} />
    </div>
  );
};

export default TransactionsTable;
