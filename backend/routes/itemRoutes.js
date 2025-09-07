const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const { attachUserIfPresent, protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Everyone can list / view items. attach user if present.
router.use(attachUserIfPresent);

router.get("/", itemController.listItems);
router.get("/:id", itemController.getItem);

// Protected routes
router.post("/", protect, upload.single("photo"), itemController.createItem);
router.put("/:id", protect, upload.single("photo"), itemController.updateItem);
router.delete("/:id", protect, itemController.deleteItem);

module.exports = router;
