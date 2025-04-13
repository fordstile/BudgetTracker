import React, { useState } from 'react';
import { useTransactions } from '../context/TransactionsContext';
import '../styles/PageLayout.css';
import './Transactions.css';

const Transactions = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const { transactions, addTransaction } = useTransactions();
  const [newTransaction, setNewTransaction] = useState({
    account: 'US Bank (#8393)',
    transactionName: '',
    category: 'Groceries',
    date: new Date().toISOString().split('T')[0],
    amount: '',
    note: ''
  });

  const categories = [
    'Groceries',
    'Bills & Utilities',
    'Housing',
    'Car & Transport',
    'Education',
    'Health',
    'Children',
    'Financial',
    'Taxes',
    'Food & Dining'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const transaction = {
      id: Date.now(),
      ...newTransaction,
      timestamp: new Date().toISOString()
    };
    addTransaction(transaction);
    setNewTransaction({
      account: 'US Bank (#8393)',
      transactionName: '',
      category: 'Groceries',
      date: new Date().toISOString().split('T')[0],
      amount: '',
      note: ''
    });
    setShowAddForm(false);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setNewTransaction({
      account: 'US Bank (#8393)',
      transactionName: '',
      category: 'Groceries',
      date: new Date().toISOString().split('T')[0],
      amount: '',
      note: ''
    });
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Transactions</h1>
        <div className="page-actions">
          <button className="action-btn primary" onClick={() => setShowAddForm(true)}>
            Add Transaction
          </button>
        </div>
      </div>

      <div className="page-content">
        <div className="transactions-list">
          <div className="list-header">
            <div>Date</div>
            <div>Transaction</div>
            <div>Category</div>
            <div>Amount</div>
            <div>Account</div>
            <div>Note</div>
          </div>
          
          {transactions.map(transaction => (
            <div key={transaction.id} className="transaction-item">
              <div>{new Date(transaction.date).toLocaleDateString()}</div>
              <div>{transaction.transactionName}</div>
              <div>{transaction.category}</div>
              <div className={Number(transaction.amount) >= 0 ? 'amount positive' : 'amount negative'}>
                ${Math.abs(transaction.amount).toFixed(2)}
              </div>
              <div>{transaction.account}</div>
              <div>{transaction.note}</div>
            </div>
          ))}

          {transactions.length === 0 && (
            <div className="no-transactions">
              No transactions yet. Click "Add Transaction" to get started.
            </div>
          )}
        </div>
      </div>

      {showAddForm && (
        <div className="modal-overlay">
          <div className="add-transaction-modal">
            <div className="modal-header">
              <h3>Add transaction</h3>
              <button className="close-btn" onClick={handleCancel}>×</button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-fields">
                <div className="form-group">
                  <label>Account</label>
                  <select
                    name="account"
                    value={newTransaction.account}
                    onChange={handleInputChange}
                  >
                    <option value="US Bank (#8393)">US Bank (#8393)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Transaction name</label>
                  <input
                    type="text"
                    name="transactionName"
                    value={newTransaction.transactionName}
                    onChange={handleInputChange}
                    placeholder="Walmart"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <select
                    name="category"
                    value={newTransaction.category}
                    onChange={handleInputChange}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    name="date"
                    value={newTransaction.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Amount</label>
                  <div className="amount-input">
                    <span>$</span>
                    <input
                      type="number"
                      name="amount"
                      value={newTransaction.amount}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      step="0.01"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Note</label>
                  <input
                    type="text"
                    name="note"
                    value={newTransaction.note}
                    onChange={handleInputChange}
                    placeholder="Add a note"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Add transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions; 