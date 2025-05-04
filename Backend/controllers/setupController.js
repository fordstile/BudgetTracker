// backend/controllers/setupController.js
// export const createSetup = (req, res) => {
//   try {
//     const { income, savings, expenses } = req.body;

//     console.log("Received setup data:");
//     console.log("Income:", income);
//     console.log("Savings:", savings);
//     console.log("Expenses:", expenses);

//     res.status(200).json({ message: "Setup data received successfully" });
//   } catch (error) {
//     console.error("Error receiving setup data:", error.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const saveSetupData = async (req, res) => {
//   try {
//     const { income, savings, expenses } = req.body;
//     console.log("Received setup data:", { income, savings, expenses });

//     // Save to DB here if needed...
//     res.status(200).json({ message: "Setup data saved successfully!" });
//   } catch (error) {
//     console.error("Error saving setup data:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// export const saveSetupData = async (req, res) => {
//   try {
//     const { income, savings, expenses } = req.body;
//     console.log("Received setup data:", { income, savings, expenses });

//     // Save to DB here if needed...
//     res.status(200).json({ message: "Setup data saved successfully!" });
//   } catch (error) {
//     console.error("Error saving setup data:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };
//import Setup from "../models/setupModel.js"; // adjust path if needed
import Setup from "../models/Setup.js"; // adjust path if needed

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
// export const getSetupData = (req, res) => {
//   // Assuming you are storing setup data in database later,
//   // for now just dummy static response:
//   res.status(200).json({
//     income: 5200,
//     expenses: 3750,
//     savings: 2700,
//   });
// };

// export const getSetupData = async (req, res) => {
//   try {
//     const setup = await Setup.findOne({ user: req.user._id });
//     if (!setup) {
//       return res.status(200).json({ income: 0, savings: 0, expenses: 0 });
//     }
//     res.status(200).json(setup);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
