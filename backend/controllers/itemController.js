const mongoose = require("mongoose");
const Item = require("../models/Item");
const { getGFS } = require("../config/db");

// Create Item
exports.createItem = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      type,
      contact,
      dateFoundOrLost,
    } = req.body;

    let fileId = null;

    if (req.file) {
      const gfs = getGFS();
      const uploadStream = gfs.openUploadStream(req.file.originalname, {
        contentType: req.file.mimetype,
      });

      uploadStream.end(req.file.buffer);
      fileId = uploadStream.id;
    }

    const item = await Item.create({
      title,
      description,
      location,
      contact,
      type,
      dateFoundOrLost: dateFoundOrLost || Date.now(),
      photo: fileId,
      owner: req.user._id,
    });

    res.status(201).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Items
exports.listItems = async (req, res) => {
  try {
    const items = await Item.find()
      .populate("owner", "name email")
      .sort({ createdAt: -1 });
    res.json(items);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// Get Single Item
exports.getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate(
      "owner",
      "name email"
    );
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// Stream Image from MongoDB
exports.getItemImage = async (req, res) => {
  try {
    const gfs = getGFS();
    const fileId = new mongoose.Types.ObjectId(req.params.id);

    const downloadStream = gfs.openDownloadStream(fileId);
    downloadStream.on("error", () =>
      res.status(404).json({ message: "Image not found" })
    );

    downloadStream.pipe(res);
  } catch {
    res.status(404).json({ message: "Invalid image ID" });
  }
};

// Delete Item
exports.deleteItem = async (req, res) => {
  try {
    const gfs = getGFS();
    const item = await Item.findById(req.params.id);

    if (!item) return res.status(404).json({ message: "Item not found" });
    if (String(item.owner) !== String(req.user._id))
      return res.status(403).json({ message: "Unauthorized" });

    if (item.photo) {
      await gfs.delete(new mongoose.Types.ObjectId(item.photo));
    }

    await item.deleteOne();
    res.json({ message: "Item deleted successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};