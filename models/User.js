const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },

    // Subscription details
    subscription: {
      active: { type: Boolean, default: false },
      plan: { type: String, enum: ["basic", "pro", "enterprise"], default: "basic" },
      startDate: { type: Date },
      endDate: { type: Date }
    },

    // Saved case list
    savedCases: [
      {
        cino: { type: String, required: true },

        // Optional: store latest fetched data
        lastFetchedData: { type: Object },

        addedOn: { type: Date, default: Date.now }
      }
    ],

    // For login (optional)
    passwordHash: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
