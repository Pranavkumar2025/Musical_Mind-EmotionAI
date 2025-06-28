// eslint-disable-next-line
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export default function Home() {
  const location = useLocation();
  const message = location.state?.message;

  return (
    <div className="relative min-h-screen overflow-hidden text-white bg-black">
      {/* 🎵 Musical Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft animated radial pulse */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#6b21a8_0%,transparent_70%)] opacity-30 animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,#4f46e5_0%,transparent_70%)] opacity-20 animate-pulse delay-1000" />

        {/* Floating Music Notes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white text-xl md:text-2xl select-none"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 1, 0], y: [-10, -50, -100] }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 5,
            }}
          >
            {['🎵', '🎶'][Math.floor(Math.random() * 2)]}
          </motion.div>
        ))}
      </div>

      {/* Top-right buttons */}
      <div className="absolute top-6 right-6 z-20 flex gap-4">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/login">
            <button className="px-5 py-2 text-sm font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-2xl shadow-lg transition duration-300 cursor-pointer">
              Login
            </button>
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/signup">
            <button className="px-5 py-2 text-sm font-semibold bg-gradient-to-r from-pink-600 to-red-500 hover:from-pink-700 hover:to-red-600 rounded-2xl shadow-lg transition duration-300 cursor-pointer">
              Signup
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen relative z-10 text-center px-6">
        {/* Redirect message if any */}
        {message && (
          <motion.div
            className="mb-4 text-green-400 font-semibold text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {message}
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Musical Mind
        </motion.h1>

        {/* Quote */}
        <motion.p
          className="text-lg md:text-2xl text-gray-300 max-w-2xl mb-10 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          “Where your emotions meet melodies — let the rhythm match your soul. Moodify listens to your feelings and sings them back.”
        </motion.p>

        {/* Get Started Button */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Link to="/login">
            <button className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-2xl shadow-lg transition duration-300 cursor-pointer">
              Get Started
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
