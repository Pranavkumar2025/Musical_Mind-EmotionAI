import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { Play, Pause, ArrowLeft, X } from 'lucide-react';
// eslint-disable-next-line
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const genres = [
  'Pop', 'Rock', 'Hip Hop', 'Jazz', 'Classical',
  'Electronic', 'Country', 'Reggae', 'Blues', 'r&b',
];

export default function Moodify_Explore() {
  const [songs, setSongs] = useState([]);
  const [activeGenre, setActiveGenre] = useState('pop');
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const audioRef = useRef(null);
  const observer = useRef();
  const intervalRef = useRef();
  const navigate = useNavigate();

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

  const fetchSongsByGenre = async (genre, currentOffset = 0) => {
    try {
      const accessToken = await getSpotifyAccessToken();
      const response = await axios.get(
        `https://api.spotify.com/v1/search`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          params: {
            q: genre,
            type: 'track',
            limit: 20,
            offset: currentOffset,
          },
        }
      );

      const newSongs = response.data.tracks.items;
      if (currentOffset === 0) {
        setSongs(newSongs);
      } else {
        setSongs((prev) => [...prev, ...newSongs]);
      }

      if (songs.length >= 50 || newSongs.length < 20) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching genre songs:', error);
    }
  };

  const fetchSearchResults = async (query) => {
    try {
      const accessToken = await getSpotifyAccessToken();
      const response = await axios.get(
        `https://api.spotify.com/v1/search`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          params: {
            q: query,
            type: 'track',
            limit: 20,
          },
        }
      );
      setSongs(response.data.tracks.items);
      setSearchHistory((prev) => [...new Set([query, ...prev])].slice(0, 5));
      setHasMore(false);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  useEffect(() => {
    setOffset(0);
    setHasMore(true);
    if (!searchQuery) fetchSongsByGenre(activeGenre, 0);
  }, [activeGenre]);

  const lastSongRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          const newOffset = offset + 20;
          setOffset(newOffset);
          fetchSongsByGenre(activeGenre, newOffset);
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMore, offset, activeGenre]
  );

  const handlePlayPause = (song) => {
    if (!song.preview_url) {
      window.open(song.external_urls.spotify, '_blank');
      return;
    }

    if (currentTrack?.id === song.id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      setCurrentTrack(song);
      setProgress(0);
      setTimeout(() => {
        audioRef.current.play();
        setIsPlaying(true);
      }, 100);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        if (audioRef.current) {
          const percentage = (audioRef.current.currentTime / audioRef.current.duration) * 100;
          setProgress(percentage || 0);
        }
      }, 500);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying]);

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-24 px-4">
      {/* Header Section */}
      <div className="text-center py-6">
        <motion.h1
          className="text-4xl font-bold text-pink-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Musical Mind
        </motion.h1>
        <motion.p
          className="text-gray-400 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Discover and vibe with songs based on your favorite genres or mood.
        </motion.p>
      </div>

      {/* Back & Search Section */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        <button
          onClick={() => navigate('/moodify')}
          className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search song..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 rounded-full bg-gray-800 text-white outline-none w-64"
          />
          {searchQuery && (
            <button onClick={() => {
              setSearchQuery('');
              fetchSongsByGenre(activeGenre);
            }} className="text-gray-400 hover:text-white">
              <X size={18} />
            </button>
          )}
          <button
            onClick={() => fetchSearchResults(searchQuery)}
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-full"
          >
            Search
          </button>
        </div>
      </div>

      {/* Search History */}
      {searchHistory.length > 0 && (
        <div className="mb-4 text-sm text-gray-400">
          Recent:{" "}
          {searchHistory.map((term, index) => (
            <button
              key={index}
              className="underline mr-2 hover:text-white"
              onClick={() => {
                setSearchQuery(term);
                fetchSearchResults(term);
              }}
            >
              {term}
            </button>
          ))}
        </div>
      )}

      {/* Genre filter bar */}
      {!searchQuery && (
        <div className="flex overflow-x-auto space-x-4 py-4 text-center sticky top-0 z-10 bg-gray-950 justify-center">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={`whitespace-nowrap px-4 py-2 rounded-full border hover:bg-pink-600 transition ${activeGenre === genre ? 'bg-pink-500 text-white' : 'bg-gray-800 text-gray-300'
                }`}
            >
              {genre}
            </button>
          ))}
        </div>
      )}

      {/* Song Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4">
        {songs.map((song, i) => {
          const isLast = i === songs.length - 1;
          return (
            <motion.div
              key={song.id}
              ref={isLast ? lastSongRef : null}
              className="bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center hover:scale-105 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
            >
              <img
                src={song.album.images[0]?.url}
                alt={song.name}
                className="w-32 h-32 rounded-md mb-3"
              />
              <div className="text-center">
                <h3 className="font-semibold text-lg">{song.name}</h3>
                <p className="text-sm text-gray-400">
                  {song.artists.map((a) => a.name).join(', ')}
                </p>
              </div>
              <button
                onClick={() => handlePlayPause(song)}
                className="mt-4 bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-full text-white flex items-center space-x-2"
              >
                {song.preview_url ? (
                  <>
                    {currentTrack?.id === song.id && isPlaying ? <Pause size={18} /> : <Play size={18} />}
                    <span>{currentTrack?.id === song.id && isPlaying ? 'Pause' : 'Play'}</span>
                  </>
                ) : (
                  <span>Listen on Spotify</span>
                )}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack?.preview_url || ''}
        onEnded={() => {
          setIsPlaying(false);
          setProgress(0);
        }}
      />

      {/* Player Footer */}
      {currentTrack && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 px-4 py-3 flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-3">
            <img
              src={currentTrack.album.images[2]?.url}
              alt="track"
              className="w-12 h-12 rounded"
            />
            <div>
              <p className="font-semibold text-sm">{currentTrack.name}</p>
              <p className="text-xs text-gray-400">
                {currentTrack.artists.map((a) => a.name).join(', ')}
              </p>
            </div>
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-gray-700 h-1 rounded-full w-full">
              <div
                className="bg-pink-500 h-1 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <button
            onClick={() => handlePlayPause(currentTrack)}
            className="bg-pink-500 hover:bg-pink-600 text-white rounded-full p-2"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
        </div>
      )}
    </div>
  );
}
