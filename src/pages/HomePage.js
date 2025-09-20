// src/pages/HomePage.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';
import '../styles/HeaderActions.css'; // Extra styles
import Logo from '../img/LOGO.png';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';  // removed faUser since no user icon now

const HomePage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      alert(`Thank you for subscribing with: ${email}`);
      setEmail('');
    }
  };

  const handleShopNow = () => {
    navigate('/products');
  };

  return (
    <div className="electromart-container">
      {/* Header */}
      <header className="electromart-header">
        <div className="container">
          <div className="header-content">
            {/* Logo */}
            <div className="logo">
              <img src={Logo} alt="ElectroMart Logo" className="logo-img" />
              <div className="logo-text">ElectroMart700</div>
            </div>

            {/* Navigation */}
            <nav>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/profile">Profile</Link></li>
              </ul>
            </nav>

            {/* Header Actions */}
            <div className="header-actions">
              {/* Search */}
              <div className="search-bar">
                <input type="text" placeholder="Search products..." />
                <button>
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>

              {/* Auth Links */}
              <div className="auth-cart">
                <div className="auth-buttons">
                  <Link to="/login" className="auth-btn">Sign In</Link>
                  <Link to="/signup" className="auth-btn signup">Sign Up</Link>
                </div>
              </div>

              {/* Removed Profile Button here */}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Welcome to ElectroMart700</h1>
            <p>
              Discover the latest electronics with premium quality and unbeatable prices
            </p>
            <button className="cta-button" onClick={handleShopNow}>
              Shop Now <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="container">
          <h2>Subscribe to Our Newsletter</h2>
          <p>
            Stay updated with the latest products, exclusive deals, and special promotions
          </p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <p>&copy; 2025 ElectroMart700. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
