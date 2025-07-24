import React, { useState } from 'react';
import './LoginPopup.css';

function LoginPopup({ onClose }) {
  const [isSignup, setIsSignup] = useState(false);

  const toggleMode = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className="login-popup-overlay">
      <div className="login-popup">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>{isSignup ? 'Sign Up' : 'Sign In'}</h2>
        <form>
          <label>Email:</label>
          <input type="email" placeholder="Enter your email" required />
          
          {isSignup && (
            <>
              <label>Confirm Email:</label>
              <input type="email" placeholder="Re-enter your email" required />
            </>
          )}

          <label>Password:</label>
          <input type="password" placeholder="Enter your password" required />

          {isSignup && (
            <>
              <label>Confirm Password:</label>
              <input type="password" placeholder="Re-enter your password" required />
            </>
          )}

          <button type="submit" className="signin-btn">
            {isSignup ? 'Register' : 'Sign In'}
          </button>
        </form>

        <p className="toggle-text">
          {isSignup ? 'Already have an account?' : 'Don’t have an account?'}
          <span onClick={toggleMode}>
            {isSignup ? ' Sign In' : ' Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginPopup;
