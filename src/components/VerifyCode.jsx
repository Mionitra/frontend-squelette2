import { useState, useEffect } from 'react';
import { verifyCode } from '../api';
import { useNavigate } from 'react-router-dom';
import { SpaceCanvas } from './Home/ThreeDCharacter';

export default function VerifyCode() {
  const [code, setCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes en secondes
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft === 0) {
      setCanResend(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

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
      navigate('/profile');
    } catch (err) {
      alert(err.response?.data?.error || 'Code invalide');
    }
  };
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <SpaceCanvas/>

      <div className="relative max-w-md w-full">
        {/* Cyber border container */}
        <div className="relative p-[2px] bg-gradient-to-r from-cyan-500 to-white rounded-2xl ">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-white rounded-2xl blur-sm opacity-75 "></div>
          
          {/* Main container */}
          <div className="relative bg-black rounded-2xl p-8 backdrop-blur-xl border border-cyan-500/30">
            
            
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white mb-2">
                Vérification de l'email
              </h2>
              <div className="w-16 h-[2px] bg-gradient-to-r from-cyan-400 to-white mx-auto"></div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Description */}
              <div className="relative">
                <p className="text-gray-300 text-sm leading-relaxed text-center">
                  Pour plus de sécurité nous avons envoyé un code à 6 chiffres à votre adresse email
                </p>
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600/20 to-cyan-600/20 rounded-lg blur opacity-30"></div>
              </div>

              {/* Code Input */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-white rounded-xl blur opacity-25"></div>
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="######"
                  required
                  maxLength={6}
                  className="relative w-full px-4 py-4 text-center text-2xl font-mono tracking-widest bg-gray-900/80 border border-cyan-500/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all duration-300 backdrop-blur-sm"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/10 to-cyan-400/10 pointer-events-none"></div>
              </div>

              {/* Timer and Resend */}
              <div className="flex justify-between items-center">
                
                {/* Timer */}
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-cyan-400 rounded-full "></div>
                  <span className="text-gray-300 font-mono text-lg">
                    {formatTime(timeLeft)}
                  </span>
                </div>
                
                {/* Resend Button */}
                <button
                  type="button"
                  // onClick={handleResendCode}
                  disabled={!canResend}
                  className={`
                    relative px-4 py-2 rounded-lg font-medium transition-all duration-300 transform
                    ${canResend 
                      ? 'bg-gradient-to-r from-cyan-500 to-cyan-500 text-black hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 active:scale-95' 
                      : 'bg-gray-800 text-gray-500 cursor-not-allowed opacity-50'
                    }
                  `}
                >
                  {canResend && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-cyan-500 rounded-lg blur opacity-30 "></div>
                  )}
                  <span className="relative">Renvoyer le code</span>
                </button>
              </div>

              {/* Submit Button */}
              <div className="relative">
                <button
                  type="submit"
                  className="relative w-full py-4 bg-gradient-to-r from-cyan-900 to-cyan-900 text-black font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25 active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative text-white flex items-center justify-center space-x-2">
                    <span>Vérifier</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              </div>
              
            </form>

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-60"></div>
            <div className="absolute bottom-4 left-4 w-1 h-1 bg-cyan-400 rounded-full  opacity-60"></div>
            
            {/* Corner brackets */}
            <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-cyan-400 opacity-60"></div>
            <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-cyan-400 opacity-60"></div>
            <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-cyan-400 opacity-60"></div>
            <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-cyan-400 opacity-60"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
