import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Utility to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// @desc    Register new user
// @route   POST /api/auth/register

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  console.log("📥 Incoming registration data:", req.body); // <-- Add this line

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Send back response
    res.status(201).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Register error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = generateToken(user._id);

    // ✅ Set it as an HTTP-only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false, // true in production (with HTTPS)
        sameSite: "Lax", // or "None" if using different domains
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(200)
      .json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          profilePic: user.profilePic,
        },
      });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserProfile = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  res.status(200).json({
    success: true, // ✅ ADD THIS
    user: {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      profilePic: req.user.profilePic,
    },
  });
  if (data.success) {
    setUserData(data.user);
    setIsLoggedIn(true); // ✅ ADD THIS
  }
};
