import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import '../styles/SignupPage.css';
import logo from '../img/LOGO.png';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  // ✅ Redirect logged-in users away from signup page
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      // Already logged in — redirect to profile page
      navigate('/profile');
    }
  }, [navigate]);

  const handleSignup = e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('Signup successful! Please login now.');
          navigate('/login'); // Redirect to login after signup
        } else {
          alert('Signup failed: ' + (data.message || 'Unknown error'));
        }
      })
      .catch(err => {
        alert('Error: ' + err.message);
      });
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="logo">
          <img src={logo} alt="App Logo" className="logo-img" />
          <h1 className="logo-text">ElectroMart700</h1>
        </div>

        <h2 className="title">SIGN UP</h2>

        <form onSubmit={handleSignup}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />

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

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit">Sign up</button>
        </form>

        <p className="login-text">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>

        <p className="back-home">
          <Link to="/">Back to Home</Link>
        </p>
      </div>
    </div>
  );
}
