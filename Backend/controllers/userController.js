import bcrypt from "bcryptjs";
//import User from "../models/userModel.js"; // Adjust the path if needed
import User from "../models/User.js";

export const getUserProfile = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.status(200).json(req.user);
};

//   const { name, email, profilePic } = req.body;

//   try {
//     const user = await User.findById(req.user._id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     if (name) user.name = name;
//     if (email) user.email = email;
//     if (profilePic) user.profilePic = profilePic;

//     const updatedUser = await user.save();
//     res.status(200).json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       profilePic: updatedUser.profilePic,
//     });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Failed to update profile", error: err.message });
//   }
// };

export const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.profilePic = req.body.profilePic || user.profilePic;

    user.timezone = req.body.timezone || user.timezone;
    user.language = req.body.language || user.language;
    user.dateFormat = req.body.dateFormat || user.dateFormat;

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profilePic: updatedUser.profilePic,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Incorrect current password" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error changing password", error: err.message });
  }
};
