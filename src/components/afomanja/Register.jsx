import React, { useState } from "react";
import GradientCheckbox from "./GradientCheckbox";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../../hooks/useRegister";
import { register } from "../../api";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  
  const { registerAndRedirect, isLoading, error } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

   const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Form submitted:", form); // Debug log
    try {
      await register(form);
      alert("Inscription réussie");
      setLoading(false);
    } catch (err) {
      console.error("Registration error:", err); // Debug log
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      const res = await googleLogin(credential);
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      navigate("/profile");
    } catch (err) {
      alert(err.response?.data?.error || "Erreur Google Login");
    }
  };

  return (
    <>
      <div className=" absolute flex text-cyan-50 justify-between items-center px-20">
        <div className="w-1/3">
          <h1 className="uppercase text-8xl font-teko -letter-space-1 bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400">
            sign up for afomanja news.
          </h1>
          <div className="w-1 h-16"></div>
          <p >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt
            ab dolore dicta deserunt repellendus fugiat porro facilis laudantium
            dignissimos itaque quaerat placeat doloremque eaque, sunt rem
            provident distinctio harum ut!{" "}
            <Link to="/login" className="font-semibold underline">
              Sign-in
            </Link>
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-1/2 flex p-20 flex-col gap-6 font-oswald"
        >
          <input
            type="text"
            className="text-cyan-50 p-4 focus:outline-none focus:ring-0 focus:border-cyan-300 border-3 border-cyan-300/50 rounded-lg"
            placeholder="FIRST NAME"
          />
          <input
            type="text"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="text-cyan-50 p-4 focus:outline-none focus:ring-0 focus:border-cyan-300 border-3 border-cyan-300/50 rounded-lg"
            placeholder="USERNAME"
          />
          <input
            type="email"
            className="text-cyan-50 p-4 focus:outline-none focus:ring-0 focus:border-cyan-300 border-3 border-cyan-300/50 rounded-lg"
            placeholder="EMAIL"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          {/* Show Password Toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full text-cyan-50 p-4 focus:outline-none focus:ring-0 focus:border-cyan-300 border-3 border-cyan-300/50 rounded-lg"
              placeholder="PASSWORD"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-50/70 hover:text-cyan-50"
            >
              {showPassword ? (
                <AiOutlineEye size={20} />
              ) : (
                <AiOutlineEyeInvisible size={20} />
              )}
            </button>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-4 my-2 items-center">
              <GradientCheckbox /> Keep me connected
            </div>
            <p>
              {" "}
              <span className="underline font-semibold">Privacy statement</span>
            </p>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer text-center p-4 focus:outline-none focus:ring-0 bg-gradient-to-r from-white to-cyan-400 text-black font-semibold hover:from-cyan-400 hover:to-white duration-1000 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "REGISTERING..." : "SIGN UP"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
