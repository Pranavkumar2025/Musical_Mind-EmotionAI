// 📁 Moodify_ChatBot.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Moodify_ChatBot = ({ initialPrompt }) => {
  const [chatHistory, setChatHistory] = useState([{ role: 'assistant', text: initialPrompt }]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const sendMessage = async () => {
  if (!userInput.trim()) return;

  const updatedChat = [...chatHistory, { role: 'user', text: userInput }];
  setChatHistory(updatedChat);
  setLoading(true);

  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: `Answer the following question in **short, point-wise, and very simple words** so that a beginner can easily understand:\n\n${userInput}`
          }]
        }],
      }
    );

    const assistantReply = res.data.candidates[0]?.content?.parts[0]?.text || 'Sorry, I have no answer for that.';

    setChatHistory([...updatedChat, { role: 'assistant', text: assistantReply }]);
  } catch (error) {
    console.error('Error communicating with Gemini API:', error);
    setChatHistory([...updatedChat, { role: 'assistant', text: 'Something went wrong. Please try again.' }]);
  } finally {
    setLoading(false);
    setUserInput('');
  }
};


  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-lg max-w-2xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-purple-400">Musical Mind Chatbot</h2>

      <div className="h-64 overflow-y-auto mb-4 space-y-3 p-3 bg-gray-900 rounded-lg">
        {chatHistory.map((chat, index) => (
          <div key={index} className={`text-sm ${chat.role === 'user' ? 'text-blue-400' : 'text-green-400'}`}>
            <span className="font-semibold">{chat.role === 'user' ? 'You: ' : 'Musical Mind: '}</span>
            {chat.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Ask your question..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="flex-1 p-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default Moodify_ChatBot;
