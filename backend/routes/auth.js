// routes/auth.js

const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const sendEmail = require('../utils/sendEmail');

const router = express.Router();

// ==========================
// ✅ SIGNUP ROUTE
// ==========================
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ success: false, message: 'Server error during signup' });
  }
});

// ==========================
// ✅ LOGIN ROUTE
// ==========================
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    res.status(200).json({
      success: true,
      message: 'Login successful',
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
});

// ==========================
// ✅ FORGOT PASSWORD (Send OTP)
// ==========================
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.resetOtp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    const html = `
      <h3>Password Reset OTP</h3>
      <p>Your OTP for password reset is: <b>${otp}</b></p>
      <p>This OTP will expire in 10 minutes.</p>
    `;

    await sendEmail(user.email, "Reset Your Password - OTP", html);

    res.status(200).json({ message: "OTP sent to your email." });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ==========================
// ✅ RESET PASSWORD (Verify OTP)
// ==========================
router.post("/reset-password", async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.resetOtp !== parseInt(otp)) {
      return res.status(400).json({ message: "Invalid OTP or user not found" });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetOtp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
