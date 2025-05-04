import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    profilePic: {
      type: String,
      default: "", // will add later from frontend
    },
    timezone: {
      type: String,
      default: "GMT +07:00",
    },
    language: {
      type: String,
      default: "English UK",
    },
    dateFormat: {
      type: String,
      default: "DD/MM/YYYY",
    },
  },

  { timestamps: true }
);

export default mongoose.model("User", userSchema);
