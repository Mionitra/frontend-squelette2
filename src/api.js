import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000', // change selon ton environnement
});

export const register = (data) => API.post('/accounts/register/', data);
export const startLogin = (data) => API.post('/accounts/start-login/', data); // 1ère étape (email + mdp)
export const verifyCode = (data) => API.post('/accounts/verify-code/', data); // 2e étape (code 6 chiffres)
export const googleLogin = (token) => API.post('/accounts/google-login/', { token });

export const getProfile = () => {
  const token = localStorage.getItem('access');
  return API.get('/accounts/me/', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const sendMessageToBot = (message) => API.post('/bot/', { message });