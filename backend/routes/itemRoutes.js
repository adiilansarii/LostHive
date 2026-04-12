const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const upload = require("../middleware/uploadMiddleware");
const {
  protect,
  attachUserIfPresent,
} = require("../middleware/authMiddleware");

router.use(attachUserIfPresent);

router.get("/", itemController.listItems);
router.get("/:id", itemController.getItem);
router.get("/image/:id", itemController.getItemImage);

router.post("/", protect, upload.single("photo"), itemController.createItem);
router.delete("/:id", protect, itemController.deleteItem);

module.exports = router;