import React from 'react';
import '../styles/AboutUs.css';
import { Link } from 'react-router-dom';

function AboutUs() {
  return (
    <div className="about-page">
      <h1>About ElectroMart700</h1>
      <p>
        At ElectroMart700, we bring you the latest and most reliable electronics
        at unbeatable prices. Our mission is to make technology accessible,
        affordable, and exciting for everyone.
      </p>
      <div className="about-highlights">
        <div className="about-card">✅ Premium Quality</div>
        <div className="about-card">🚀 Fast Delivery</div>
        <div className="about-card">💳 Secure Payments</div>
        <div className="about-card">🤝 Trusted Service</div>
      </div>

      {/* Back to Homepage Link */}
      <Link
        to="/"
        className="back-home-link"
        style={{
          display: 'inline-block',
          marginTop: '30px',
          color: '#007bff',
          textDecoration: 'underline',
          cursor: 'pointer'
        }}
      >
        Back to Homepage
      </Link>
    </div>
  );
}

export default AboutUs;
