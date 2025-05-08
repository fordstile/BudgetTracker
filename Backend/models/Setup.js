import mongoose from "mongoose";

const setupSchema = new mongoose.Schema(
  {
    income: {
      type: Number,
      default: 0,
    },
    savings: {
      type: Number,
      default: 0,
    },
    expenses: {
      type: new mongoose.Schema({
        bills: {
          items: {
            garbage: Number,
            water: Number,
            electricity: Number,
            internet: Number,
            phone: Number,
          },
        },
        housing: {
          items: {
            mortgage: Number,
            rent: Number,
            homeImprovement: Number,
          },
        },
        carTransport: {
          items: {
            carPayment: Number,
            insurance: Number,
            fuel: Number,
            maintenance: Number,
            parking: Number,
            publicTransport: Number,
          },
        },
        education: {
          items: {
            tuition: Number,
            books: Number,
            courses: Number,
            supplies: Number,
            studentLoan: Number,
          },
        },
        health: {
          items: {
            insurance: Number,
            medications: Number,
            doctorVisits: Number,
            dental: Number,
            vision: Number,
            mentalHealth: Number,
          },
        },
        children: {
          items: {
            childcare: Number,
            schooling: Number,
            activities: Number,
            supplies: Number,
            clothing: Number,
          },
        },
        financial: {
          items: {
            investments: Number,
            retirement: Number,
            emergencyFund: Number,
            lifeInsurance: Number,
            debtPayments: Number,
          },
        },
        taxes: {
          items: {
            incomeTax: Number,
            propertyTax: Number,
            vehicleTax: Number,
            otherTaxes: Number,
          },
        },
        foodDining: {
          items: {
            groceries: Number,
            restaurants: Number,
            takeout: Number,
            coffeeSnacks: Number,
            alcoholBeverages: Number,
          },
        },
      }),
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Setup", setupSchema);
