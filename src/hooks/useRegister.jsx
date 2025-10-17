import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api'; // Adjust path to your API file

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const registerUser = async (userData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Sending registration request:", userData); // Debug log
      const response = await register(userData);
      console.log("Registration response:", response); // Debug log
      return response.data;
    } catch (err) {
      console.error("Registration error:", err); // Debug log
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          'Registration failed. Please try again.';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const registerAndRedirect = async (userData, redirectPath = '/') => {
    try {
      await registerUser(userData);
      alert('Registration successful!');
      navigate(redirectPath);
    } catch (err) {
      // Error is already handled in registerUser
      console.error('Registration failed:', err);
    }
  };

  return {
    register: registerUser,
    registerAndRedirect,
    isLoading,
    error,
    clearError: () => setError(null),
  };
};