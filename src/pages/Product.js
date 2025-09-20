// src/pages/Product.js

import React, { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext'; // ✅ Cart context import
import { useNavigate, Link } from 'react-router-dom';   // ✅ For navigation and Link
import '../styles/Product.css'; // Optional: External CSS file

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart(); // ✅ Access addToCart from context
  const navigate = useNavigate();  // ✅ For redirect

  // Fetch products from API
  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  // Handle Add to Cart button click
  const handleAddToCart = (item) => {
    addToCart(item); // ✅ Add product to cart
    alert('Product added to cart. Please view it in your Profile.'); // ✅ Show alert
    navigate('/profile'); // ✅ Redirect to Profile
  };

  if (loading) return <h2>Loading products...</h2>;

  return (
    <div className="product-page">
      <h1>Our Products</h1>
      <div className="product-grid">
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          products.map(item => (
            <div className="product-card" key={item._id || item.id}>
              <img
                src={item.imageUrl}
                alt={item.name}
                className="product-image"
              />
              <h3>{item.name}</h3>
              <p className="price">${item.price}</p>
              <button className="buy-btn" onClick={() => handleAddToCart(item)}>
                Add to Cart
              </button>
            </div>
          ))
        )}
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

export default Product;
