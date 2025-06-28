import React, { useState } from 'react';
// eslint-disable-next-line
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('email', email); // ✅ Store user email for mood history tracking
      
      setMsg('Login successful');
      setTimeout(() => {
        navigate('/moodify');
      }, 1000);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-black via-gray-900 to-purple-900 flex items-center justify-center px-4 text-white relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute w-[500px] h-[500px] bg-purple-700 rounded-full blur-3xl opacity-20 top-0 left-0" />
      <div className="absolute w-[400px] h-[400px] bg-indigo-500 rounded-full blur-2xl opacity-20 bottom-0 right-0" />

      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-gray-900/80 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
          Welcome to Musical Mind
        </h2>

        <p className="text-center text-gray-400 text-sm">
          Please log in to continue
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          type="submit"
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 transition rounded-lg font-semibold text-white shadow-md"
        >
          Login
        </button>

        {msg && <p className="text-center text-sm mt-2 text-green-400">{msg}</p>}

        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
          <Link to="/" className="text-sm text-gray-400 hover:text-white transition underline">
            ⬅ Back to Home
          </Link>
          <Link
            to="/signup"
            className="text-sm text-purple-400 hover:text-pink-400 transition underline"
          >
            Don't have an account? Sign Up
          </Link>
        </div>
      </motion.form>
    </div>
  );
};

export default Login;
