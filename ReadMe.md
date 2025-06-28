# 🎶 Musical Mind — AI-Powered Mood-Based Music Recommender 🎧

A personalized web application that detects your mood using AI and recommends Spotify tracks that either reflect or uplift your emotional state — now enhanced with chatbot support and insightful analytics!

---

## 🌟 Project Overview

**Musical Mind** is an intelligent, interactive music experience powered by AI. The app allows users to share their feelings through text (or voice), and based on their detected mood, it curates a tailored Spotify playlist to either match or improve their emotional state.

Now with:
- 📊 Graphical insights from mood history
- 🤖 An interactive mental wellness chatbot
- 🔒 Secure login/signup system with MongoDB
- ☁️ Firebase-based history tracking per user

---

## 🚀 Features

### 🎭 Mood Detection (via Google Gemini API)
- Users describe how they feel in text.
- Google Gemini AI processes the input and determines mood (e.g., *happy*, *sad*, *angry*, *calm*).

### 🎵 Spotify Music Recommendations
- Top 5 songs fetched using **Spotify Web API** based on the detected (or uplifted) mood.
- Authentication handled via Client Credentials Flow.

### 💫 Mood Uplifter Logic
If your mood is low, we lift it. Here's how moods are smartly enhanced:

```js
const moodMap = {
  "sad": "happy",
  "happy": "excited",
  "calm": "positive",
  "angry": "chill",
  "excited": "party"
};
