// Moodify_Home.jsx
import React, { useState, useEffect, useRef } from 'react';
// eslint-disable-next-line
import { motion } from 'framer-motion';
import { Music, Mic } from 'lucide-react';
import axios from 'axios';
import myVideo from "../../assets/218905_medium.mp4";
import MusicPlayer from './MusicPlayer';
import { saveMoodHistory } from '../../saveMoodHistory.js'; // ✅ Import here

export default function Moodify_Home() {
  const [userName, setUserName] = useState('Guest');
  const [userEmail, setUserEmail] = useState(''); // ✅ Store email for history
  const [showTextbox, setShowTextbox] = useState(false);
  const [feelingText, setFeelingText] = useState('');
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const recognitionRef = useRef(null);

  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/userinfo`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserName(res.data.username || 'Guest');
        setUserEmail(res.data.email); // ✅ Capture email for history tracking
      } catch (err) {
        console.error('Error fetching user info:', err);
      }
    };

    fetchUserName();
  }, []);

  const handleDetectMoodClick = () => {
    setShowTextbox(true);
  };

  const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    if (!recognitionRef.current) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.interimResults = false;
      recognition.continuous = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setFeelingText(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        alert("Speech recognition error. Please try again.");
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const getSpotifyAccessToken = async () => {
      const clientId = import.meta.env.VITE_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

    const authString = btoa(`${clientId}:${clientSecret}`);

    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({ grant_type: 'client_credentials' }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${authString}`,
        },
      }
    );

    return response.data.access_token;
  };

  const handleSubmitFeeling = async () => {
    if (!feelingText.trim()) {
      alert("Please enter your feelings before submitting.");
      return;
    }

    setLoading(true);

    try {
      const geminiResponse = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `You are an emotion recognition assistant for a mood-based music app.

Your task is to:
1. Detect the **primary mood** of the user from their text input.
2. Determine whether the user wants to **stay in that mood** or be **uplifted** based on how they express themselves.
3. Always prioritize suggesting songs in **Hindi** language first (unless the user explicitly mentions English).

Return a JSON object in the following format:
{
  "mood": "happy" | "sad" | "angry" | "calm" | "anxious",
  "preference": "stay" | "uplift",
  "language": "hindi" | "english"
}

Text: "${feelingText}"`
                }
              ]
            }
          ]
        }
      );

      const geminiTextResponse = geminiResponse.data.candidates[0]?.content?.parts[0]?.text?.trim();

      const jsonMatch = geminiTextResponse.match(/\{[^}]+\}/);
      const moodData = jsonMatch ? JSON.parse(jsonMatch[0]) : { mood: "calm", preference: "uplift", language: "hindi" };

      // ✅ Save mood history
      if (userEmail) {
        await saveMoodHistory(userEmail, moodData);
      }

      const spotifyAccessToken = await getSpotifyAccessToken();

      const searchQuery =
        moodData.language === "hindi"
          ? `${moodData.mood} mood hindi songs`
          : `${moodData.mood} mood english songs`;

      const spotifyResponse = await axios.get(
        `https://api.spotify.com/v1/search`,
        {
          headers: { Authorization: `Bearer ${spotifyAccessToken}` },
          params: { q: searchQuery, type: 'track', limit: 5 },
        }
      );

      setSongs(spotifyResponse.data.tracks.items);
    } catch (error) {
      console.error("Error submitting mood:", error);
      alert("Something went wrong. Check the console for more details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-white flex flex-col items-center justify-center px-6 pt-24">
      <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover z-[-1]">
        <source src={myVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Floating Music Icons */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 0.3, y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute top-10 left-8 text-pink-400 opacity-70 pointer-events-none">
        <Music size={30} />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 0.3, y: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 6 }} className="absolute top-32 right-10 text-purple-300 opacity-70 pointer-events-none">
        <Music size={30} />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 0.3, y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 5 }} className="absolute bottom-24 left-16 text-indigo-300 opacity-70 pointer-events-none">
        <Music size={30} />
      </motion.div>

      {/* Main Content */}
      <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 60, damping: 12 }} className="text-center max-w-2xl w-full">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500 mb-6">
          Welcome back, {userName}! 🎧
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8">
          Let your emotions guide your playlist. Share your feelings and Musical Mind will pick the perfect songs for your mood.
        </p>

        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleDetectMoodClick} className="px-8 py-3 rounded-full bg-pink-500 hover:bg-pink-600 transition-all duration-200 font-semibold text-white shadow-lg cursor-pointer">
          Detect My Mood 🎵
        </motion.button>

        {showTextbox && (
          <div className="mt-6">
            <div className="flex items-center gap-2">
              <textarea
                className="w-full p-3 rounded-lg bg-purple-800 text-white placeholder-gray-400 focus:outline-none"
                rows="4"
                placeholder="Express your feelings..."
                value={feelingText}
                onChange={(e) => setFeelingText(e.target.value)}
              />
              <button onClick={toggleListening} className={`p-3 rounded-full ${isListening ? 'bg-red-500' : 'bg-green-500'} hover:scale-105 transition`}>
                <Mic />
              </button>
            </div>
            <button
              onClick={handleSubmitFeeling}
              disabled={loading}
              className={`mt-4 px-6 py-2 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'} transition-all duration-200 rounded-full font-semibold text-white cursor-pointer`}
            >
              {loading ? 'Analyzing...' : 'Submit'}
            </button>
          </div>
        )}

        {songs.length > 0 && (
          <div className="mt-10 text-left">
            <h2 className="text-2xl mb-4 font-bold text-pink-400">Recommended Songs 🎶</h2>
            <ul className="space-y-4">
              {songs.map((song) => (
                <li key={song.id} className="flex items-center space-x-4">
                  {song.album.images.length > 0 ? (
                    <img src={song.album.images[0].url} alt={song.name} className="w-12 h-12 rounded-md" />
                  ) : (
                    <div className="w-12 h-12 rounded-md bg-gray-500 flex items-center justify-center text-white">
                      N/A
                    </div>
                  )}

                  <div>
                    <div className="font-semibold">{song.name}</div>
                    <div className="text-sm text-gray-300">
                      {song.artists.map((a) => a.name).join(', ')}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setCurrentTrack(song);
                      setIsPlaying(true);
                      setTimeout(() => {
                        const audio = document.getElementById('audio-player');
                        if (audio) audio.play();
                      }, 300);
                    }}
                    className="ml-auto text-green-400 hover:underline"
                  >
                    Listen →
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>

      {/* Music Player */}
      {currentTrack && (
        <MusicPlayer
          track={currentTrack}
          isPlaying={isPlaying}
          togglePlay={() => {
            const audio = document.getElementById('audio-player');
            if (audio) {
              if (isPlaying) {
                audio.pause();
                setIsPlaying(false);
              } else {
                audio.play();
                setIsPlaying(true);
              }
            }
          }}
        />
      )}
    </div>
  );
}
