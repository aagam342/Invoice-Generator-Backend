// routes/authRoutes.js

const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config");

// User registration
router.post("/register", async (req, res) => {
  const { email, password, username } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User with this email already exists" });
  }

  // Create a new user
  const newUser = new User({ email, password, username });

  try {
    // Save the user to the database
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// User login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

  // ... find user by email ...
  const user = await User.findOne({ email });
  


  // Check if the user exists and verify the password
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  // Generate a JWT token
  const token = jwt.sign({ user: { id: user._id } }, config.jwtSecret, {
    expiresIn: "1h",
  });
  console.log("config.jwtSecret:", config.jwtSecret);
  console.log("Generated Token:", token);
  res.json({ token });
});

module.exports = router;
