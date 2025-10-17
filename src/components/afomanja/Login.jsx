import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
// import GradientCheckbox from './GradientCheckbox';
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from '../../hooks/useLogin';
import { useGoogleLogin } from '../../hooks/useGoogleLogin';
import { startLogin } from "../../api";

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, error } = useLogin();
  const { googleLogin, isLoading: googleLoading } = useGoogleLogin();

  // const { login, isLoading, error } = useLogin();
  // const { googleLogin, isLoading: googleLoading } = useGoogleLogin();
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await startLogin(form);
      console.log("Res : ", res);
      
      const userId = res.data.user_id;
      const userName = res.data.username;
      localStorage.setItem('user_id', userId); // stock temporaire pour 2FA
      localStorage.setItem('username', userName); 
      alert("Code envoyé par e-mail");
      navigate('/verify-code');

    } catch (err) {
      alert(err.response?.data?.error || 'Erreur de connexion');
      setIsLoading(false);
    }

  };

  const handleGoogleLogin = () => {
    googleLogin();
  }

  return (
    <>
      <div className="flex justify-between items-center px-20 absolute top-1/2 -translate-y-1/2">
        <div className="w-1/3">
          <h1 className="uppercase text-9xl font-teko -letter-space-1 text-cyan-950">
            welcome back sweety.
          </h1>
          <div className="w-1 h-5"></div>
          <p className='text-neutral-950'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt
            ab dolore dicta deserunt repellendus fugiat porro facilis laudantium
            dignissimos itaque quaerat{" "}
            <Link to="/register" className="font-semibold underline">Sign-up</Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex w-1/2 p-20 flex-col gap-6 font-oswald">
          {/* Email Input */}
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="text-cyan-950 p-4 focus:outline-none focus:ring-0 focus:border-cyan-950 border-3 border-cyan-950/50 bg-white rounded-lg"
            placeholder="EMAIL"
            required
          />

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full text-cyan-950 p-4 focus:outline-none focus:ring-0 focus:border-cyan-950 border-3 border-cyan-950/50 rounded-lg"
              placeholder="PASSWORD"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-950/70 hover:text-cyan-950"
            >
              {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
            </button>
          </div>

          {/* <div className="flex gap-4 my-6 items-center">
            <GradientCheckbox /> Keep me connected
          </div> */}

          <button
            type="submit"
            onClick={handleSubmit}
            className="text-pink-400 cursor-pointer text-center p-4 focus:outline-none focus:ring-0 focus:border-pink-400 border-3 border-pink-400/50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "SIGNING IN..." : "SUBMIT"}
          </button>


          <div className="flex justify-between items-center gap-5">
            <div className="w-1/3 h-0.5 bg-cyan-950/20"></div>
            <span className='flex-1'>Or sign in with socials</span>
            <div className="w-1/3 h-0.5 bg-cyan-950/20"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            // disabled={googleLoading}
            className="text-cyan-950 uppercase gap-4 cursor-pointer text-center p-4 focus:outline-none focus:ring-0 focus:border-cyan-950 border-3 border-cyan-950/50 rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FcGoogle size={20} />
            GOOGLE
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;