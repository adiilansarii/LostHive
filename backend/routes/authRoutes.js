const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { attachUserIfPresent } = require("../middleware/authMiddleware");

// attachUserIfPresent so getCurrentUser can read cookie
router.use(attachUserIfPresent);

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/me", authController.getCurrentUser);

module.exports = router;
