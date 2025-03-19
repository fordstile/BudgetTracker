import React, { useState } from "react";
import "./AddTransactionModal.css";

const AddTransactionModal = ({ isOpen, onClose, onAddTransaction }) => {
  const [formData, setFormData] = useState({
    account: "US Bank (0092)",
    transaction: "",
    category: "Groceries",
    date: new Date().toISOString().split("T")[0],
    amount: "",
    note: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.transaction || !formData.amount) return;

    // Convert amount to integer
    const formattedTransaction = {
      ...formData,
      amount: parseInt(formData.amount, 10),
    };

    onAddTransaction(formattedTransaction);
    onClose();
    setFormData({
      account: "US Bank (0092)",
      transaction: "",
      category: "Groceries",
      date: new Date().toISOString().split("T")[0],
      amount: "",
      note: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Transaction</h2>
        <form onSubmit={handleSubmit}>
          <label>Account</label>
          <select name="account" value={formData.account} onChange={handleChange}>
            <option value="US Bank (0092)">US Bank (0092)</option>
            <option value="Wallet">Wallet</option>
            <option value="Revolut (49221)">Revolut (49221)</option>
          </select>

          <label>Transaction name</label>
          <input type="text" name="transaction" value={formData.transaction} onChange={handleChange} required />

          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="Groceries">Groceries</option>
            <option value="Gas">Gas</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other income">Other income</option>
          </select>

          <label>Date</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} />

          <label>Amount</label>
          <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />

          <label>Note</label>
          <input type="text" name="note" value={formData.note} onChange={handleChange} />

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="add-btn">
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
