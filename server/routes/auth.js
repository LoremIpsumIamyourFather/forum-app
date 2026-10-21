const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Used to hash passwords (scramble them)
const jwt = require('jsonwebtoken'); // Used to create login tokens
const User = require('../models/User'); // Import the User model

// ==========================================
// POST /api/register
// ==========================================
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists." });
    }

    // 2. Validate password (Assignment requirement: 8 chars, at least 1 number)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: "Password must be at least 8 characters and contain a number." });
    }

    // 3. Hash the password so plain text isn't stored. 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Save new user to database
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error during registration." });
  }
});

// ==========================================
// POST /api/login
// ==========================================
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password." });
    }

    // 2. Compare the typed password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password." });
    }

    // 3. Create a JWT token to keep the user logged in
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, username: user.username });
  } catch (err) {
    res.status(500).json({ message: "Server error during login." });
  }
});

module.exports = router