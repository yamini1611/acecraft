import React, { createContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const login = async (email, password) => {
    try {
      // Fetch data from the server
      const response = await axios.get('http://localhost:4000/Register');
      const registerData = response.data;

      // Find the user with the matching email and password
      const user = registerData.find((user) => user.email === email && user.password === password);

      if (user) {
        // Set the current user and update the login status
        setCurrentUser(user);
        setIsLoggedIn(true);
        toast.success('Logged in successfully!');
      } else {
        toast.error('Invalid email or password!');
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
      toast.error('An error occurred while logging in!');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    toast.success('Logged out successfully!');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser, login, logout }}>
      <ToastContainer />
      {children}
    </AuthContext.Provider>
  );
};
