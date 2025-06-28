import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig.js';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Moodify_SolutionSection from './Moodify_SolutionSection';
import Moodify_ChatBot from './Moodify_ChatBot';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid, Legend } from 'recharts';

const MoodHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showChatBot, setShowChatBot] = useState(false);

  const fetchMoodHistory = async () => {
    try {
      const userEmail = localStorage.getItem('email');
      if (!userEmail) return;

      const userDocRef = doc(db, 'moodHistory', userEmail);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        setHistory(data.history || []);
      }
    } catch (error) {
      console.error('Error fetching mood history:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoodHistory();
  }, []);

  const deleteEntry = async (indexToDelete) => {
    try {
      const userEmail = localStorage.getItem('email');
      const userDocRef = doc(db, 'moodHistory', userEmail);

      const newHistory = history.filter((_, index) => index !== indexToDelete);

      await updateDoc(userDocRef, { history: newHistory });
      setHistory(newHistory);
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  const clearAllHistory = async () => {
    try {
      const userEmail = localStorage.getItem('email');
      const userDocRef = doc(db, 'moodHistory', userEmail);

      await updateDoc(userDocRef, { history: [] });
      setHistory([]);
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  const moodCount = history.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(moodCount).map(([mood, count]) => ({ name: mood, value: count }));
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#8dd1e1'];

  const generateSuggestions = () => {
    if (history.length === 0) return [];

    const mostFrequentMood = Object.keys(moodCount).reduce((a, b) => moodCount[a] > moodCount[b] ? a : b);

    const suggestions = [];

    if (mostFrequentMood === 'Happy') {
      suggestions.push('Keep enjoying upbeat songs to maintain your positive mood.');
      suggestions.push('Try sharing your happiness with friends and family.');
    } else if (mostFrequentMood === 'Sad') {
      suggestions.push('Consider listening to relaxing or uplifting music.');
      suggestions.push('Try journaling or talking to someone you trust.');
    } else if (mostFrequentMood === 'Calm') {
      suggestions.push('Meditative or instrumental tracks can help you stay centered.');
      suggestions.push('Go for nature walks to enhance your peaceful mood.');
    } else if (mostFrequentMood === 'Energetic') {
      suggestions.push('High-energy playlists will keep you motivated.');
      suggestions.push('Consider engaging in physical activities like workouts.');
    } else {
      suggestions.push('Explore different genres to balance your mood.');
      suggestions.push('Try focusing on mindfulness or mood-boosting activities.');
    }

    return suggestions;
  };

  const generateMoodAnalysis = () => {
    if (history.length === 0) return 'No mood analysis available.';

    let total = history.length;
    let moodSummary = Object.entries(moodCount).map(([mood, count]) => `${((count / total) * 100).toFixed(1)}% ${mood}`).join(', ');

    return `Your mood distribution is: ${moodSummary}. You seem to experience ${Object.keys(moodCount).length} different moods regularly.`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Back to Musical Mind at Top */}
        <div className="text-left mb-4">
          <Link
            to="/moodify"
            className="text-purple-400 hover:text-pink-400 transition underline text-lg"
          >
            ⬅ Back to Musical Mind
          </Link>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500"
        >
          Mood History & Insights
        </motion.h1>

        {loading ? (
          <p className="text-center text-gray-400">Loading mood history...</p>
        ) : history.length === 0 ? (
          <p className="text-center text-gray-400">No mood history found.</p>
        ) : (
          <>
            {/* History and Insights Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Mood History Card */}
              <div className="bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-purple-700/50 transition-shadow">
                <h2 className="text-3xl font-semibold mb-4 text-purple-400">Mood History</h2>
                <div className="space-y-4 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-700 pr-2">
                  {history
                    .slice()
                    .reverse()
                    .map((entry, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-gray-700 p-4 rounded-xl flex justify-between items-start hover:scale-[1.01] transition-transform"
                      >
                        <div>
                          <p><span className="font-semibold text-purple-400">Mood:</span> {entry.mood}</p>
                          <p><span className="font-semibold text-purple-400">Preference:</span> {entry.preference}</p>
                          <p><span className="font-semibold text-purple-400">Language:</span> {entry.language}</p>
                          <p className="text-sm text-gray-400 mt-1">{new Date(entry.timestamp).toLocaleString()}</p>
                        </div>
                        <button
                          onClick={() => deleteEntry(history.length - 1 - index)}
                          className="text-red-400 hover:text-red-600 text-sm underline"
                        >
                          Delete
                        </button>
                      </motion.div>
                    ))}
                </div>

                <div className="mt-6 flex justify-center">
                  <button
                    onClick={clearAllHistory}
                    className="py-2 px-6 bg-red-600 hover:bg-red-700 rounded-lg text-white shadow-md"
                  >
                    Clear All History
                  </button>
                </div>
              </div>

              {/* Mood Insights Card */}
              <div className="bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-purple-700/50 transition-shadow">
                <h2 className="text-3xl font-semibold mb-4 text-purple-400">Mood Insights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
                  {/* Pie Chart */}
                  <PieChart width={220} height={220}>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {chartData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>

                  {/* Bar Chart */}
                  <BarChart width={250} height={220} data={chartData}>
                    <XAxis dataKey="name" stroke="#ccc" />
                    <YAxis stroke="#ccc" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" barSize={40} />
                  </BarChart>

                  {/* Line Chart */}
                  <LineChart width={250} height={220} data={chartData}>
                    <XAxis dataKey="name" stroke="#ccc" />
                    <YAxis stroke="#ccc" />
                    <CartesianGrid stroke="#444" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={3} />
                  </LineChart>
                </div>
              </div>
            </div>

            {/* Mood Suggestion Section */}
            <div className="bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-purple-700/50 transition-shadow mt-10">
              <h2 className="text-3xl font-semibold mb-4 text-purple-400">Mood Suggestions</h2>
              <p className="mb-4 text-gray-300">{generateMoodAnalysis()}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                {generateSuggestions().map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>

            {/* Solution Section */}
            <Moodify_SolutionSection insights={history} />

            {/* Chatbot Toggle */}
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setShowChatBot(!showChatBot)}
                className="py-3 px-6 bg-blue-600 hover:bg-blue-700 rounded-lg text-white shadow-md text-lg"
              >
                {showChatBot ? 'Close Chatbot' : 'Ask Solution'}
              </button>
            </div>

            {showChatBot && (
              <div className="mt-6">
                <Moodify_ChatBot initialPrompt="How can I help you based on your mood insights?" />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MoodHistory;
