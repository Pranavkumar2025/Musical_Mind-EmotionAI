import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// eslint-disable-next-line
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Moon, Sun, LogOut, User } from 'lucide-react';

export default function MoodifyHeader() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem('theme') === 'dark'
  );

  const handleSignOut = () => {
    localStorage.clear();
    navigate('/');
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newMode);
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const navLinks = [
    { name: 'Explore', path: '/explore' },
    { name: 'History & Insight', path: '/history' },
    { name: 'Recommendations', path: '/recommendations' },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 60, damping: 12 }}
      className="w-full px-6 py-4 bg-opacity-30 backdrop-blur-md border-b border-white/10 shadow-md flex justify-between items-center text-white fixed top-0 z-50"
    >
      {/* Logo */}
      <Link
        to="/moodify"
        className="text-2xl md:text-3xl font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-purple-300"
      >
        Musical Mind<span className="text-cyan-400">.</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-6 items-center text-sm font-medium">
        {navLinks.map((link) => (
          <motion.div
            key={link.name}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to={link.path} className="hover:text-cyan-300 transition">
              {link.name}
            </Link>
          </motion.div>
        ))}

        {/* Dark Mode Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={toggleDarkMode}
          className="ml-4 p-2 rounded-full bg-white/10 hover:bg-white/20"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </motion.button>

        {/* Profile Menu */}
        <div className="relative ml-4 group">
          <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer">
            <img
              src="https://i.pravatar.cc/40?img=2"
              alt="avatar"
              className="w-9 h-9 rounded-full border-2 border-cyan-500"
            />
          </motion.div>

          <div className="absolute right-0 mt-2 hidden group-hover:block bg-white dark:bg-gray-900 text-black dark:text-white shadow-lg rounded-md w-40 py-2 z-50 backdrop-blur-lg bg-opacity-90">
            <Link
              to="/profile"
              className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <User size={16} className="mr-2" />
              Profile
            </Link>
            <button
              onClick={handleSignOut}
              className="flex w-full items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <LogOut size={16} className="mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <button onClick={() => setMobileOpen((prev) => !prev)}>
          <Menu size={26} />
        </button>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute top-16 right-4 bg-white dark:bg-gray-900 text-black dark:text-white w-56 rounded-lg shadow-lg p-4 z-50 backdrop-blur-lg bg-opacity-90"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 px-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={toggleDarkMode}
                className="w-full flex items-center justify-start gap-2 py-2 px-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 mt-2"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  handleSignOut();
                }}
                className="w-full flex items-center justify-start gap-2 py-2 px-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 mt-2"
              >
                <LogOut size={18} /> Sign Out
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
