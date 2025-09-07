const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  location: { type: String, default: "" }, // e.g., "Main Hall"
  dateFoundOrLost: { type: Date, default: Date.now },
  type: { type: String, enum: ["lost", "found"], required: true },
  photo: { type: String, default: "" }, // path to uploaded file (public/uploads/...)
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now }
});

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
