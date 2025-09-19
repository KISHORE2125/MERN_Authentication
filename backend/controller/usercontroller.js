// src/controller/usercontroller.js
const User = require("../models/usermodels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * Generate JWT token
 * @param {string} userId - MongoDB user _id
 * @returns {string} JWT token
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

/**
 * Signup a new user
 */
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Generate token
    const token = generateToken(newUser._id);

    // Send response
    res.status(201).json({
      message: "User created successfully",
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

/**
 * Signin existing user
 */
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // Generate token
    const token = generateToken(user._id);

    // Send response
    res.json({
      message: "Signin successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Signin Error:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};
