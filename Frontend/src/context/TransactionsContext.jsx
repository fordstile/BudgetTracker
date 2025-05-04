import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "../api/axiosInstance";
import { AppContext } from "../components/context/AppContext";

const TransactionsContext = createContext();

export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const { userData, isLoggedIn, isAuthLoading } = useContext(AppContext); //Use auth context

  const fetchTransactions = async () => {
    try {
      const res = await axios.get("/transactions");
      setTransactions(res.data);
    } catch (error) {
      console.error("Failed to fetch transactions:", error.message);
    }
  };

  const addTransaction = async (transaction) => {
    try {
      const res = await axios.post("/transactions", transaction);
      setTransactions((prev) => [res.data, ...prev]);
    } catch (error) {
      console.error("Failed to add transaction:", error.message);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`/transactions/${id}`);
      setTransactions((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  useEffect(() => {
    if (!isAuthLoading && isLoggedIn && userData) {
      fetchTransactions(); // Only fetch when user is ready
    }
  }, [isAuthLoading, isLoggedIn, userData]); // Refetch if these change

  return (
    <TransactionsContext.Provider
      value={{ transactions, addTransaction, deleteTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error(
      "useTransactions must be used within a TransactionsProvider"
    );
  }
  return context;
};
