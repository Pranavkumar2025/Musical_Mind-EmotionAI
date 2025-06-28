import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login'; // if you have it
import Signup from './components/Signup'; // if you have it
import Moodify from './components/Moodify_Page/Moodify';
import Moodify_Explore from './components/Moodify_Page/Moodify_Explore';
import Mood_History from './components/Moodify_Page/Mood_History';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/moodify" element={<Moodify/>} />
        <Route path="/explore" element={<Moodify_Explore />} />
        <Route path="/history" element={<Mood_History />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
