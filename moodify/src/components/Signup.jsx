import React, { useState } from 'react';
// eslint-disable-next-line
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        username,
        email,
        password,
      });

      setPopup(true); // Show success popup

      setTimeout(() => {
        navigate('/', { state: { message: 'Please sign in' } }); // Redirect with message
      }, 2000);
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-black via-gray-900 to-purple-900 flex items-center justify-center px-4 text-white relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute w-[500px] h-[500px] bg-purple-700 rounded-full blur-3xl opacity-20 top-0 left-0" />
      <div className="absolute w-[400px] h-[400px] bg-indigo-500 rounded-full blur-2xl opacity-20 bottom-0 right-0" />

      <motion.form
        onSubmit={handleSignup}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-gray-900/80 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
          Create an Account
        </h2>

        <p className="text-center text-gray-400 text-sm">
          Join Moodify and get started with personalized music recommendations
        </p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
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
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 transition rounded-lg font-semibold text-white shadow-md"
        >
          Signup
        </button>

        {popup && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
          >
            Signup successful! Redirecting...
          </motion.div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
          <Link to="/" className="text-sm text-gray-400 hover:text-white transition underline">
            ⬅ Back to Home
          </Link>
          <Link
            to="/login"
            className="text-sm text-purple-400 hover:text-pink-400 transition underline"
          >
            Already have an account? Log In
          </Link>
        </div>
      </motion.form>
    </div>
  );
};

export default Signup;
