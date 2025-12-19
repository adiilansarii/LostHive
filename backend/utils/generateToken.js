const jwt = require("jsonwebtoken");

function generateToken(user) {
  // Minimal payload; avoid storing sensitive data.
  const payload = { id: user._id, email: user.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "12h"
  });
  return token;
}

module.exports = generateToken;
