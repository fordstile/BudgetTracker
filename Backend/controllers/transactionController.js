import Transaction from "../models/Transaction.js";

// @desc Get all transactions

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

// @desc Delete a transaction
export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Transaction.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.status(200).json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete transaction" });
  }
};


export const addTransaction = async (req, res) => {
  try {
    const { account, transactionName, category, amount, date, note } = req.body;

    const newTransaction = new Transaction({
      user: req.user.id, // Tie to logged-in user
      account,
      transactionName,
      category,
      amount,
      date: date || Date.now(),
      note,
    });

    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ error: "Failed to add transaction" });
  }
};
