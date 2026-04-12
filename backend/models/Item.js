const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    location: { type: String },
    contact: { type: String }, // ✅ Added
    type: { type: String, enum: ["lost", "found"], required: true },
    dateFoundOrLost: { type: Date, default: Date.now },
    photo: { type: mongoose.Schema.Types.ObjectId, default: null },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);