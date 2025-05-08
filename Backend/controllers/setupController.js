
import Setup from "../models/Setup.js"; 

export const saveSetupData = async (req, res) => {
  try {
    const userId = req.user._id;
    const { income = 0, savings = 0, expenses = 0 } = req.body;

    let setup = await Setup.findOne({ user: userId });

    if (setup) {
      // Update existing setup
      setup.income = income;
      setup.savings = savings;
      setup.expenses = expenses;
      await setup.save();
    } else {
      // Create new setup
      setup = await Setup.create({
        income,
        savings,
        expenses,
        user: userId,
      });
    }

    res.status(200).json(setup);
  } catch (error) {
    console.error("❌ Error saving setup:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get Setup for logged-in user
export const getSetupData = async (req, res) => {
  try {
    const userId = req.user._id;
    const setup = await Setup.findOne({ user: userId });

    if (!setup) {
      return res.status(200).json({
        income: 0,
        savings: 0,
        expenses: 0,
      });
    }

    res.status(200).json(setup);
  } catch (error) {
    console.error("❌ Error fetching setup:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
