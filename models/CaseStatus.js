const mongoose = require("mongoose");

const CaseStatusSchema = new mongoose.Schema(
  {
    cino: { type: String, required: true, unique: true },
    data: { type: Object, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("CaseStatus", CaseStatusSchema);
