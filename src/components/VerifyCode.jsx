import { useState } from 'react';
import { verifyCode } from '../api';
import { useNavigate } from 'react-router-dom';

export default function VerifyCode() {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('user_id');
    if (!userId) return alert("Aucun ID utilisateur");

    try {
      const res = await verifyCode({ user_id: userId, code });
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);
      localStorage.removeItem('user_id');
      alert('Connexion réussie');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.error || 'Code invalide');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '2rem' }}>
      <h2>Vérification 2FA</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Code à 6 chiffres"
          required
          style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
        />
        <button type="submit" style={{ width: '100%' }}>
          Vérifier
        </button>
      </form>
    </div>
  );
}
