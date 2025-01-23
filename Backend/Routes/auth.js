const express = require('express');
const User = require('../Models/User');
const jwt = require("jsonwebtoken")
const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if User already exists
    const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: 'User already exists' });
      
      if(!username || !email || !password) return res.status(400).json({ message: 'Please fill all the fields' });

    // Create new User
    const user = new User({ username, email, password });
    await user.save();

    // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      
      res.status(201).json({ user, token });
  } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
  }
});

// Login Route

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({message: "Incorrect Password!"})
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({ user, token });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
})

module.exports = router;