// src/hooks/useGoogleLogin.js (Alternative version)
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin as useGoogleOAuth } from '@react-oauth/google';
import { googleLogin } from '../api';

export const useGoogleLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const googleOAuthLogin = useGoogleOAuth({
    onSuccess: async (credentialResponse) => {
      setIsLoading(true);
      try {
        console.log("Google OAuth response:", credentialResponse);
        const response = await googleLogin(credentialResponse.access_token);
        console.log("Backend response:", response);
        
        if (response.data.access) {
          localStorage.setItem('access', response.data.access);
        }
        if (response.data.refresh) {
          localStorage.setItem('refresh', response.data.refresh);
        }
        
        navigate('/profile');
      } catch (err) {
        console.error("Google login error:", err);
        alert(err.response?.data?.error || 'Google login failed');
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      setIsLoading(false);
      alert('Google login failed');
    },
    flow: 'implicit', // or 'authorization_code' depending on your setup
  });

  return {
    googleLogin: googleOAuthLogin,
    isLoading,
  };
};