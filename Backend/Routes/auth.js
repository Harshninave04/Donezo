const express = require('express');
const User = require('../Models/User');
const jwt = require("jsonwebtoken")
const router = express.Router();

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

module.exports = router;