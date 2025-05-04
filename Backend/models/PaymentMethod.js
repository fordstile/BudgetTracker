import mongoose from "mongoose";

const paymentMethodSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["card", "wallet", "mobile_money"],
      required: true,
    },
    // Common fields
    createdAt: {
      type: Date,
      default: Date.now,
    },

    // Card-specific
    bankName: {
      type: String,
    },
    cardNumber: {
      type: String,
    },
    expiryDate: {
      type: String,
    },
    cardType: {
      type: String, // Visa, MasterCard, Amex
    },

    // Wallet-specific
    walletEmail: {
      type: String,
    },

    // Mobile Money-specific
    phoneNumber: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("PaymentMethod", paymentMethodSchema);
