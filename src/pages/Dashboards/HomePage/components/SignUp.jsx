// src/frontend/components/SignUp.jsx
import React from 'react';
import './SignUp.css';

function SignUp({ onClose }) {
  return (
    <div className="signup-popup-overlay">
      <div className="signup-popup">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>Create Account</h2>
        <form>
          <label>Full Name:</label>
          <input type="text" placeholder="Enter your name" required />

          <label>Email:</label>
          <input type="email" placeholder="Enter your email" required />

          <label>Password:</label>
          <input type="password" placeholder="Create password" required />

          <label>Confirm Password:</label>
          <input type="password" placeholder="Re-enter password" required />

          <button type="submit" className="signup-btn">Sign Up</button>
        </form>

        <p className="signin-link">
          Already have an account? <span onClick={onClose}>Sign In</span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
