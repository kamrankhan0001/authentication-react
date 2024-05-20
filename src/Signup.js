// src/Signup.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import './Signup.css';

const Signup = () => {
  const { user, setUser } = useUser(); // Accessing user context
  const navigate = useNavigate(); // Hook for navigation

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' }); // Form state
  const [error, setError] = useState(''); // Error message state
  const [success, setSuccess] = useState(''); // Success message state

  // Handling input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Function to generate a random access token
  const generateAccessToken = () => {
    return Math.random().toString(36).substr(2, 16);
  };

  // Handling form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError('All fields are mandatory'); // Error if any field is empty
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match'); // Error if passwords do not match
      return;
    }

    const newUser = { ...form, accessToken: generateAccessToken() }; // Creating new user object with access token
    delete newUser.confirmPassword; // Removing confirmPassword from the object
    setUser(newUser); // Setting user state
    setSuccess('Signup successful! Redirecting to profile...');
    setTimeout(() => {
      navigate('/profile'); // Redirecting to profile page after successful signup
    }, 1000);
  };

  useEffect(() => {
    if (user && user.accessToken) {
      navigate('/profile'); // Redirect to profile if user is already logged in
    }
  }, [user, navigate]);

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      {error && <p className="error">{error}</p>} {/* Display error message */}
      {success && <p className="success">{success}</p>} {/* Display success message */}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
