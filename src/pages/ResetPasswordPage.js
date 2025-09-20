// src/pages/ResetPasswordPage.js

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/ResetPasswordPage.css';
import logo from '../img/LOGO.png';

export default function ResetPasswordPage() {
  const location = useLocation();
  const navigate = useNavigate();

 // eslint-disable-next-line no-unused-vars
const [email, setEmail] = useState(location.state?.email || '');

  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email) {
      alert("No email found. Please go through 'Forgot Password' page first.");
      navigate('/forgot-password');
    }
  }, [email, navigate]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || 'Password reset successful!');
        navigate('/');
      } else {
        alert(data.message || 'Failed to reset password.');
      }
    } catch (err) {
      alert('Something went wrong.');
      console.error('Reset Password Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-box">
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-img" />
          <h1 className="logo-text">ElectroMart700</h1>
        </div>

        <h2 className="title">Reset Password</h2>
        <p className="subtitle">Enter the OTP sent to your email along with a new password.</p>

        <form onSubmit={handleResetPassword}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            disabled
          />

          <label>OTP</label>
          <input
            type="text"
            placeholder="6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            disabled={loading}
          />

          <label>New Password</label>
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            disabled={loading}
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        <p className="back-text">
          Go back to <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
}
