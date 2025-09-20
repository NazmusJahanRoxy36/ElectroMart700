import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';
import logo from '../img/LOGO.png';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`Login successful! Welcome, ${data.username || data.email}`);

        // Save user to localStorage
        localStorage.setItem('user', JSON.stringify({
          username: data.username,
          email: data.email,
        }));

        // Redirect to profile page
        navigate('/profile');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Something went wrong. Please check your connection or server.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Logo */}
        <div className="logo">
          <img src={logo} alt="App Logo" className="logo-img" />
          <h1 className="logo-text">ElectroMart700</h1>
        </div>

        {/* Title */}
        <h2 className="title">SIGN IN</h2>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <label>Email address</label>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <div className="forgot-link">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <button type="submit">Sign in</button>
        </form>

        {/* Sign Up Redirect */}
        <p className="signup-text">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>

        {/* Back to Homepage Link */}
        <p className="back-home">
          <Link to="/">← Back to Homepage</Link>
        </p>
      </div>
    </div>
  );
}
