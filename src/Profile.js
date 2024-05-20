// src/Profile.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useUser(); // Accessing user context
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    logout(); // Logging out the user
    navigate('/signup'); // Redirecting to signup page
  };

  if (!user) return null; // Return null if user state is not available

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Password:</strong> {user.password}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
