import React from "react";
import { useTransactions } from "../context/TransactionsContext";
import { Link } from "react-router-dom";
import "./TransactionsTable.css";

const TransactionsTable = () => {
  const { transactions } = useTransactions();
  const recentTransactions = transactions.slice(0, 5); // Get only the 5 most recent transactions

  return (
    <div className="transactions-card">
      <div className="transactions-header">
        <h3>Recent Transactions</h3>
        <div className="actions">
          <Link to="/dashboard/transactions" className="see-more">
            See more
          </Link>
        </div>
      </div>

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
          {recentTransactions.map((tx, index) => (
            <tr key={tx._id || tx.id || index}>
              <td>{tx.account}</td>
              <td>{tx.transactionName}</td>
              <td>{tx.category}</td>
              <td>{new Date(tx.date).toLocaleDateString()}</td>
              <td className={Number(tx.amount) >= 0 ? "positive" : "negative"}>
                ${Math.abs(tx.amount).toFixed(2)}
              </td>
            </tr>
          ))}
          {recentTransactions.length === 0 && (
            <tr>
              <td colSpan="5" className="no-transactions">
                No recent transactions. Add a transaction to see it here.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
