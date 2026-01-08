const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  // maxAge will be set when cookie is set
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "All fields required" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already registered" });

    const user = new User({ name, email, password });
    await user.save();

    const token = generateToken(user);
    res.cookie("token", token, { ...cookieOptions, maxAge: 1000 * 60 * 60 * 24 * 1 }); // 1 days
    const userSafe = { id: user._id, name: user.name, email: user.email };
    res.status(201).json({ user: userSafe });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await user.matchPassword(password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    res.cookie("token", token, { ...cookieOptions, maxAge: 1000 * 60 * 60 * 24 * 1 }); // 1 days
    const userSafe = { id: user._id, name: user.name, email: user.email };
    res.json({ user: userSafe });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "lax", secure: true });
  res.json({ message: "Logged out" });
};

exports.getCurrentUser = (req, res) => {
  if (!req.user) return res.status(200).json({ user: null });
  const u = { id: req.user._id, name: req.user.name, email: req.user.email };
  res.json({ user: u });
};
