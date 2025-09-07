const jwt = require("jsonwebtoken");
const User = require("../models/User");

const attachUserIfPresent = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) return next();

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (user) req.user = user;
  } catch (err) {
    // invalid token => ignore, proceed as guest
  }
  next();
};

// protect used on routes that must be authenticated
const protect = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Not authenticated" });
  next();
};

module.exports = { attachUserIfPresent, protect };
