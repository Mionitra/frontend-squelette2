import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../api'; // Ensure this is correctly implemented in your API utility

const Profile = () => {
  const [user, setUser] = useState(null); // Stores user data
  const [loading, setLoading] = useState(true); // Handles loading state
  const navigate = useNavigate();

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile(); // Fetch user profile
        setUser(res.data); // Set user data to state
      } catch (err) {
        console.error('Error fetching profile:', err);
        // If user is not authenticated, redirect to login
        navigate('/');
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchProfile();
  }, [navigate]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('access'); // Remove access token
    localStorage.removeItem('refresh'); // Remove refresh token
    navigate('/'); // Redirect to login page
  };

  // Navigate to ChatBot page
  const handleGoToBot = () => {
    navigate('/bot');
  };

  if (loading) return <p>⏳ Chargement de votre profil...</p>; // Show loading while data is fetched

  if (!user) return <p>⚠️ Impossible de charger votre profil. Veuillez réessayer.</p>; // Handle missing user data

  return (
    <div style={{ padding: '20px' }}>
      <h2>À propos de moi</h2>
      <p><strong>Nom d'utilisateur :</strong> {user.username}</p>
      <p><strong>Email :</strong> {user.email}</p>
      <p><strong>Compte Google :</strong> {user.is_google_account ? 'Oui' : 'Non'}</p>

      {/* Logout button */}
      <button
        onClick={handleLogout}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#FF4D4D',
          color: '#FFF',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        🔒 Se déconnecter
      </button>

      {/* Go to ChatBot button */}
      <button
        onClick={handleGoToBot}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: '#FFF',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginLeft: '10px',
        }}
      >
        🤖 Accéder au ChatBot
      </button>
    </div>
  );
};

export default Profile;