import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import CartProvider (যদি আপনি cart context ব্যবহার করেন)
import { CartProvider } from './contexts/CartContext';

// Import all pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import Product from './pages/Product';
import AboutUs from './pages/AboutUs';

import Profile from './pages/Profile';
import ResetPasswordPage from './pages/ResetPasswordPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<HomePage />} />

          {/* Authentication Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* Other Pages */}
          <Route path="/products" element={<Product />} />
          <Route path="/about" element={<AboutUs />} />
          
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
