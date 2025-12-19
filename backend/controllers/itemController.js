const Item = require("../models/Item");
const fs = require("fs");
const path = require("path");

exports.createItem = async (req, res) => {
  try {
    const { title, description, location, type, dateFoundOrLost } = req.body;
    if (!title || !type) return res.status(400).json({ message: "Title and type are required" });
    const photoPath = req.file ? `/uploads/${req.file.filename}` : "";

    const item = new Item({
      title,
      description,
      location,
      type,
      dateFoundOrLost: dateFoundOrLost || Date.now(),
      photo: photoPath,
      owner: req.user._id
    });

    await item.save();
    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.listItems = async (req, res) => {
  try {
    // Simple list. Optionally add filters (type, location), pagination
    const items = await Item.find().populate("owner", "name email").sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate("owner", "name email");
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    if (String(item.owner) !== String(req.user._id)) return res.status(403).json({ message: "Forbidden" });

    // If new photo uploaded, remove old file
    if (req.file && item.photo) {
      const oldPath = path.join(__dirname, "..", "public", item.photo);
      fs.unlink(oldPath, (err) => { /* ignore errors */ });
      item.photo = `/uploads/${req.file.filename}`;
    }

    // Update fields
    item.title = req.body.title ?? item.title;
    item.description = req.body.description ?? item.description;
    item.location = req.body.location ?? item.location;
    item.type = req.body.type ?? item.type;
    if (req.body.dateFoundOrLost) item.dateFoundOrLost = req.body.dateFoundOrLost;

    await item.save();
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    if (String(item.owner) !== String(req.user._id)) return res.status(403).json({ message: "Forbidden" });

    // Remove photo file
    if (item.photo) {
      const filePath = path.join(__dirname, "..", "public", item.photo);
      fs.unlink(filePath, (err) => { /* ignore errors */ });
    }

    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
