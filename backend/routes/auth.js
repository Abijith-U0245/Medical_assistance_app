// backend/routes/auth.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, role, location } = req.body;

    // Validate password before hashing
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: 'Password must contain at least 1 letter, 1 number, and 1 special character'
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const normalizedRole = role?.toLowerCase();

    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      role: normalizedRole,
      location
    });

    await user.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    console.error('Register Error:', err);
    res.status(500).json({ message: 'Registration failed' });
  }
});

module.exports = router;
