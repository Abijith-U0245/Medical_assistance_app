import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginAdmin = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false); // Toggle between Sign In and Sign Up
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (isSignup) {
      // Dummy sign-up logic
      console.log("Sign Up successful for:", name, email);
      alert("Account created. Please sign in.");
      setIsSignup(false); // Switch to login after sign up
    } else {
      // Dummy login check
      if (email === "admin@example.com" && password === "admin") {
        navigate("/dashboard/admin");
      } else {
        setError("Invalid credentials");
      }
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "5rem" }}>
      <div
        style={{
          width: "450px",
          padding: "2rem",
          borderRadius: "16px",
          boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "1.5rem", color: "#333" }}>
          {isSignup ? "Admin Sign Up" : "Admin Sign In"}
        </h2>

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            {isSignup ? "Sign Up" : "Login"}
          </button>

          {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
        </form>

        <p style={{ marginTop: "1rem" }}>
          {isSignup ? (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsSignup(false)}
                style={toggleButtonStyle}
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => setIsSignup(true)}
                style={toggleButtonStyle}
              >
                Sign Up
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "0.75rem",
  marginBottom: "1rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "1rem",
};

const buttonStyle = {
  padding: "0.75rem 2rem",
  fontSize: "1rem",
  borderRadius: "8px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  cursor: "pointer",
};

const toggleButtonStyle = {
  background: "none",
  border: "none",
  color: "#007BFF",
  cursor: "pointer",
  textDecoration: "underline",
  fontSize: "1rem",
};

export default LoginAdmin;
