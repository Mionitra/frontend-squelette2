// src/hooks/useLogin.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { startLogin } from '../api';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (credentials) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Sending login request:", credentials);
      const response = await startLogin(credentials);
      console.log("Login response:", response);
      
      const userId = response.data.user_id;
      localStorage.setItem('user_id', userId);
      
      alert("Code sent to your email");
      navigate('/verify-code');
      
      return response.data;
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage = err.response?.data?.error || 
                          err.response?.data?.message || 
                          'Login failed. Please try again.';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    error,
    clearError: () => setError(null),
  };
};