import Account from "../models/Account.js";

export const addPaymentMethod = async (req, res) => {
  const {
    type,
    bankName,
    cardNumber,
    expiryDate,
    cardType,
    walletEmail,
    phoneNumber,
  } = req.body;

  try {
    const newMethod = new Account({
      userId: req.user.id,
      type,
      ...(type === "card" && { bankName, cardNumber, expiryDate, cardType }),
      ...(type === "digital_wallet" && { email: walletEmail }),
      ...(type === "mobile_money" && { phoneNumber }),
    });

    await newMethod.save();
    res.status(201).json({
      success: true,
      message: "Payment method added",
      method: newMethod,
    });
  } catch (error) {
    console.error("Add payment method error:", error.message);
    res
      .status(500)
      .json({ success: false, message: `Server error: ${error.message}` });
  }
};

export const getPaymentMethods = async (req, res) => {
  try {
    const methods = await Account.find({ userId: req.user.id });
    res.status(200).json({ success: true, methods });
  } catch (error) {
    console.error("Get payment methods error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deletePaymentMethod = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the method only if it belongs to the current user
    const deletedMethod = await Account.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!deletedMethod) {
      return res
        .status(404)
        .json({ success: false, message: "Payment method not found" });
    }

    res.status(200).json({
      success: true,
      message: "Payment method deleted",
      method: deletedMethod,
    });
  } catch (error) {
    console.error("Delete payment method error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Set a payment method as default
export const setDefaultMethod = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the method by ID and ensure it belongs to the logged-in user
    const method = await Account.findOne({ _id: id, userId: req.user.id });

    if (!method) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Method not found or not authorized",
        });
    }

    const type = method.type;

    // Unset all other defaults for this user and type
    await Account.updateMany(
      { userId: req.user.id, type },
      { $set: { isDefault: false } }
    );

    // Set the selected method as default
    method.isDefault = true;
    await method.save();

    res
      .status(200)
      .json({ success: true, message: "Default method set", method });
  } catch (error) {
    console.error("Set default error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
