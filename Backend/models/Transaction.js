// import mongoose from "mongoose";

// const transactionSchema = new mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     account: { type: String, required: true },
//     transactionName: { type: String, required: true },
//     category: { type: String, required: true },
//     amount: { type: Number, required: true },
//     date: { type: Date, default: Date.now },
//   },
//   { timestamps: true }
// );

// const Transaction = mongoose.model("Transaction", transactionSchema);

// export default Transaction;

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
