// src/pages/ForgotPasswordPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ForgotPasswordPage.css';
import logo from '../img/LOGO.png';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Something went wrong. Please try again.');
      } else {
        alert(data.message || 'Check your email for the OTP.');
        navigate('/reset-password', { state: { email } });
      }
    } catch (err) {
      alert('Something went wrong. Please try again.');
      console.error('Forgot Password Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <div className="logo">
          <img src={logo} alt="App Logo" className="logo-img" />
          <h1 className="logo-text">ElectroMart700</h1>
        </div>

        <h2 className="title">Forgot Password</h2>
        <p className="subtitle">Enter your email address and we’ll send you an OTP.</p>

        <form onSubmit={handleReset}>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
        </form>

        <p className="back-text">
          Remember your password? <a href="/">Sign in</a>
        </p>
      </div>
    </div>
  );
}
