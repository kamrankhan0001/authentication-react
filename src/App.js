
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './Signup';
import Profile from './Profile';
import { UserProvider, useUser } from './UserContext';

// Main App component which includes the Router and routes setup
const App = () => {
  return (
    // Providing the user state to all child components
    <UserProvider>
      <Router>
        <Routes>
          {/* Route for signup page */}
          <Route path="/signup" element={<Signup />} />
          {/* Protected route for profile page */}
          <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
          {/* Redirect all other paths to signup page */}
          <Route path="*" element={<Navigate to="/signup" />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

// Component to protect the profile route
const ProtectedRoute = ({ component: Component }) => {
  const { user } = useUser(); // Accessing user state
  return user && user.accessToken ? <Component /> : <Navigate to="/signup" />; // Conditional rendering based on user authentication
};

export default App;
