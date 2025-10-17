import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GoogleLoginButton from './components/GoogleLoginButton';
import Profile from './components/Profile';
import VerifyCode from './components/VerifyCode';
import ChatBot from './components/bot';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Chat from './components/Chat';


const App = () => (
  <GoogleOAuthProvider clientId="895200014569-n5k1d5ogmr3of6v5ui08ltkeo9ovu58q.apps.googleusercontent.com">
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/google-login" element={<GoogleLoginButton />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/bot" element={<ChatBot />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
  </GoogleOAuthProvider>
);

export default App;
