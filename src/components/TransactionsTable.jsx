import React, { useState } from "react";
import AddTransactionModal from "./AddTransactionModal";
import { FaEllipsisV } from "react-icons/fa";
import "./TransactionsTable.css";

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);

  // Add a new transaction
  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  // Toggle dropdown menu
  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  // Delete the selected transaction
  const handleDelete = (indexToDelete) => {
    setTransactions(transactions.filter((_, index) => index !== indexToDelete));
    setOpenMenuIndex(null);
  };

  return (
    <div className="transactions-card">
      {/* Header Section */}
      <div className="transactions-header">
        <h3>Recent Transactions</h3>
        <div className="actions">
          <span className="add-transaction" onClick={() => setIsModalOpen(true)}>
            Add new transaction
          </span> 
          <span className="see-more">    See more</span>
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
              <td className="action-cell">
                <button className="menu-btn" onClick={() => toggleMenu(index)}>
                  <FaEllipsisV className="action-icon" />
                </button>
                {openMenuIndex === index && (
                  <div className="dropdown-menu">
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Transaction Modal */}
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTransaction={addTransaction}
      />
    </div>
  );
};

export default TransactionsTable;
