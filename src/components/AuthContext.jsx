import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Initialize loading as true

  useEffect(() => {
    // Simulate an asynchronous authentication check (e.g., fetching user from local storage or an API)
    const checkAuthStatus = () => {
      const userToken = localStorage.getItem('userToken');
      if (userToken) {
        // In a real app, you'd validate the token with your backend
        setCurrentUser({ uid: userToken, email: `${userToken}@example.com` });
      }
      setLoading(false); // Authentication check is complete
    };

    checkAuthStatus();
  }, []);

  // Function to simulate user login
  // Now accepts email and password, and simulates a user object
  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // For demonstration, a specific email/password works
        if (email === 'test@example.com' && password === 'password123') {
          const user = { uid: 'user123', email: email };
          localStorage.setItem('userToken', user.uid);
          setCurrentUser(user);
          resolve(user);
        } else {
          reject(new Error('Invalid email or password.'));
        }
      }, 500); // Simulate API call delay
    });
  };

  // Function to simulate user signup
  // Now accepts email and password, and simulates a user object
  const signup = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // For demonstration, any email with a password >= 6 characters works
        if (email && password && password.length >= 6) { // Basic validation
          const newUid = `user_${Date.now()}`; // Generate a unique ID
          const user = { uid: newUid, email: email };
          localStorage.setItem('userToken', user.uid);
          setCurrentUser(user);
          resolve(user);
        } else {
          reject(new Error('Invalid email or password (must be at least 6 characters).'));
        }
      }, 500); // Simulate API call delay
    });
  };

  // Function to simulate user logout
  const logout = () => {
    localStorage.removeItem('userToken');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Render children only after loading is complete */}
    </AuthContext.Provider>
  );
};