import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: {
    type: String,
    enum: ["card", "digital_wallet", "mobile_money"], // This needs to match the values you're sending
    required: true,
  },
  bankName: { type: String },
  cardNumber: { type: String },
  expiryDate: { type: String },
  cardType: { type: String },
  walletEmail: { type: String },
  phoneNumber: { type: String },
  isDefault: { type: Boolean, default: false },
});

const Account = mongoose.model("Account", accountSchema);
export default Account;
