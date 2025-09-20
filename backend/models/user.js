const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  // 🔐 Fields for OTP-based password reset
  resetOtp: {
    type: Number,
  },
  otpExpiry: {
    type: Date,
  },
});

// 🧠 Export the model
module.exports = mongoose.model('User', userSchema);
