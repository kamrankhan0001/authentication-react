// src/UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Creating a context for user state management
const UserContext = createContext();

// UserProvider component to wrap around components that need user state
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user'))); // Initialize user state from localStorage

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user)); // Sync user state with localStorage on state change
  }, [user]);

  const logout = () => {
    setUser(null); // Clear user state
    localStorage.removeItem('user'); // Remove user data from localStorage
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children} {/* Rendering child components */}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
