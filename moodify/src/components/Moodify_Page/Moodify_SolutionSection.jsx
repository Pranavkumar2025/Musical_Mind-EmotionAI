import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Moodify_ChatBot from './Moodify_ChatBot';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const Moodify_SolutionSection = ({ moodData }) => {
  const [solution, setSolution] = useState('');
  const [loading, setLoading] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);

  useEffect(() => {
    if (moodData && moodData.length > 0) {
      fetchMoodSuggestion();
    }
  }, [moodData]);

  const fetchMoodSuggestion = async () => {
    setLoading(true);
    const moodSummary = moodData.map(m => `${m.name}: ${m.value}`).join(', ');

    try {
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [{
            parts: [{ text: `Based on this user's mood insight: ${moodSummary}, suggest some activities, solutions, or resources to help them.` }]
          }]
        }
      );

      const responseText = res?.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not fetch the solution. Please try again.';
      setSolution(responseText);
    } catch (err) {
      console.error('Error fetching suggestion:', err);
      setSolution('Could not fetch solution. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // If moodData is undefined or empty, don't render the component
  if (!moodData || moodData.length === 0) return null;

  return (
    <div className="bg-gray-800/80 p-6 rounded-2xl shadow-xl mb-10">
      <h2 className="text-2xl font-semibold text-purple-400 mb-4 text-center">💡 Mood-Based Solution</h2>

      {loading ? (
        <p className="text-center text-gray-400">Fetching personalized solution...</p>
      ) : (
        <div className="bg-gray-900/70 p-6 rounded-xl shadow-lg hover:scale-[1.01] transition-transform">
          <p className="text-gray-300 whitespace-pre-line">{solution}</p>
        </div>
      )}

      {/* Toggle Button for Chatbot */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setShowChatBot(!showChatBot)}
          className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white shadow-md"
        >
          {showChatBot ? 'Close Chatbot' : 'Ask Solution'}
        </button>
      </div>

      {/* Conditional Chatbot Rendering */}
      {showChatBot && (
        <Moodify_ChatBot initialPrompt="How can I help you based on your mood insights?" />
      )}

    </div>
  );
};

export default Moodify_SolutionSection;
