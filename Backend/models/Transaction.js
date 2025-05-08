

import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    account: String,
    transactionName: String,
    category: String,
    amount: Number,
    date: Date,
    note: String,
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
