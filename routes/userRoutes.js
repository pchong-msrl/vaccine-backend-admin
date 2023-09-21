const express = require("express");
const router = express.Router();
const User = require("../models/user"); // Import the User model
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Registration route
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already taken" });
    }

    // Create a new user
    const newUser = new User({ username, password });

    // Hash the password before saving it to the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newUser.password, salt);
    newUser.password = hashedPassword;

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "unable to find the user" });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      //   console.log("user compare password:", user.password);
      //   console.log("Input Password:", password);
      //   console.log("Password Valid:", isPasswordValid);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // If authentication is successful, generate a JWT token with the username in the payload
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h", // Token expires in 1 hour (adjust as needed)
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
