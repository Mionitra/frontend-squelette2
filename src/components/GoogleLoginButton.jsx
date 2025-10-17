import { GoogleLogin } from '@react-oauth/google';

import { googleLogin } from '../api';
import { useNavigate } from 'react-router-dom';

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      const res = await googleLogin(credential);
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);
      // ✅ Redirection vers le profil
      navigate('/profile');
    } catch (err) {
      alert(err.response?.data?.error || 'Erreur Google Login');
    }
  };

  return <GoogleLogin onSuccess={handleSuccess} onError={() => alert("Erreur Google")} />;
};

export default GoogleLoginButton;
