// src/components/Signup.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './signup.css'; // Make sure the path is correct
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://solstice-cjof.onrender.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Signup successful:', data);
        navigate('/'); // Navigate to login on success
      } else {
        throw new Error(data.message || 'Failed to signup');
      }
    } catch (error) {
      alert(error.message);
    }
  };


  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Create Account</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
        <p className="login-link">
          Already have an account? <Link to="/">Log In</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
