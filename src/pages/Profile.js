// src/pages/Profile.js

import React, { useEffect } from 'react';
import '../styles/Profile.css';
import logo from '../img/LOGO.png';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export default function Profile() {
  const navigate = useNavigate();
  const { cart = [], clearCart } = useCart() || {};

  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    if (!user) {
      alert('User not found. Please Sign In or Sign Up.');
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    alert('Logged out successfully.');
    navigate('/login');
  };

  return (
    <div className="profile-container">
      {/* Back to Homepage link moved to top-left */}
      <div style={{ position: 'absolute', top: '15px', left: '20px' }}>
        <Link
          to="/"
          className="back-home-link"
          style={{
            color: '#007bff',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
        >
          Back to Homepage
        </Link>
      </div>

      <div className="profile-box">
        <div className="logo">
          <img src={logo} alt="App Logo" className="logo-img" />
          <h1 className="logo-text">ElectroMart700</h1>
        </div>

        <h2 className="title">Welcome to Your Profile</h2>
        <div className="profile-info">
          <p>
            <strong>Username:</strong> {user.username || 'Not available'}
          </p>
          <p>
            <strong>Email:</strong> {user.email || 'Not available'}
          </p>
        </div>

        <section className="cart-section">
          <h3>Your Cart</h3>

          {cart.length > 0 ? (
            <ul className="cart-list">
              {cart.map((item, index) => (
                <li key={index}>
                  {item.name} - ${item.price.toFixed(2)}
                </li>
              ))}
            </ul>
          ) : (
            <p>Your cart is empty.</p>
          )}

          {cart.length > 0 && (
            <button className="clear-btn" onClick={clearCart}>
              Clear Cart
            </button>
          )}
        </section>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
