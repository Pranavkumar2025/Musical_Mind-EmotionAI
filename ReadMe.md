# 🎶 Musical Mind — AI-Powered Mood-Based Music Recommender

> An intelligent, full-stack music recommendation web app that detects your mood using AI and offers curated Spotify tracks — now enhanced with a mental wellness chatbot, real-time insights, and secure user sessions.

![musical-mind-banner](./moodify/src/assets/Screenshot%20(196).png)

---

## 📌 Project Name

**Musical Mind**  
> “Because music speaks what the heart feels.”

---

## 💡 Objective

To build a **personalized music platform** that:
- Understands the user's mood from natural language (text or voice).
- Recommends Spotify tracks that either reflect or uplift the user's emotional state.
- Tracks emotional trends over time and visualizes them.
- Supports user interaction via a friendly mental wellness chatbot.

---

## 🎯 Core Features

### 🧠 1. AI-Powered Mood Detection
- Uses Google Gemini API to analyze user input.
- Detects emotional states: happy, sad, angry, calm, excited, etc.
- Supports optional voice input via Web Speech API.

### 🎵 2. Spotify-Based Music Recommendations
- Retrieves top 5 tracks based on the detected mood.
- Uses Spotify Client Credentials Flow for secure API access.
- Users can play songs or open directly in Spotify.

### 💫 3. Mood Uplifter Logic

A unique mapping system converts negative emotions into more positive moods.  
For example:
- Sad → Happy  
- Angry → Chill  
- Calm → Positive  
- Happy → Excited  
- Excited → Party

“If you’re sad, we’ll play happy — if you’re angry, we’ll calm you.”

### 🔐 4. User Authentication & Session Management
- Secure login and signup using MongoDB and JWT.
- Tokens stored in localStorage.
- Protected routes for dashboard, chatbot, and insights.

### ☁️ 5. Mood History Tracking (Firebase)
- Saves every mood detection event for the logged-in user.
- Uses Firebase Realtime Database for structured storage.

### 📊 6. Mood Insights Dashboard
- Visualizes user mood trends using Chart.js or Recharts.
- Helps users understand and reflect on their emotional patterns.

### 🤖 7. Mental Wellness Chatbot
- Friendly chatbot for self-help and encouragement.
- Uses AI-generated responses via Gemini or GPT models.

### 🎤 8. Voice Input (Planned/Optional)
- Converts speech to text using Web Speech API.
- Detects emotion from spoken words.

### 📢 9. Social Sharing (Optional)
- Share mood and recommended music on social media.

### 📑 10. Daily Quote (Planned)
- Display motivational quotes relevant to current mood.

---

## 🔧 Tech Stack Overview

| Category               | Technology               |
|------------------------|---------------------------|
| Frontend               | React.js                 |
| Styling                | Tailwind CSS             |
| State Management       | useState, Context API    |
| Mood Detection         | Google Gemini API        |
| Music API              | Spotify Web API          |
| Authentication         | MongoDB, JWT             |
| Mood Storage           | Firebase Realtime DB     |
| Graphing               | Chart.js / Recharts      |
| Voice Input            | Web Speech API (optional)|
| Chatbot                | Gemini/GPT               |

---

## 🛠 System Architecture

[ React UI ]
     |
     ↓
[ Google Gemini API ] ←→ [ Text Input / Voice Input ]
     |
     ↓
[ Mood Detected ]
     |
     ↓
[ Mood Uplifter Logic ] → [ Spotify API → Songs ]
     |
     ↓
[ Firebase DB ] ←→ [ Insights Dashboard ]
     |
     ↓
[ MongoDB + JWT ] ←→ [ User Auth ]
     |
     ↓
[ AI Chatbot ]

## 🧪 Example User Flow

- 👤 User signs up or logs in.

- ✍️ Enters mood in natural language.

- 🤖 Google Gemini detects emotional state.

- 🔁 Mood Uplifter Logic determines final target mood.

- 🎧 Spotify API fetches 5 tracks for that vibe.

- 💾 Mood + songs saved in Firebase DB.

- 📈 Graphical insights generated from history.

- 💬 User chats with AI-powered mental health bot.

- 🔄 User repeats whenever needed — building a mood profile.

## 🌐 Environment Variables (.env example)

- VITE_GEMINI_API_KEY=your-gemini-api-key
- VITE_SPOTIFY_CLIENT_ID=your-client-id
- VITE_SPOTIFY_CLIENT_SECRET=your-client-secret
- VITE_FIREBASE_CONFIG=your-firebase-config-json
- VITE_API_URL=http://localhost:5000

## 🔐 Security Practices

- JWT tokens securely stored in localStorage.

- All protected endpoints validate token on each request.

- Spotify credentials Base64 encoded.

- Firebase rules restrict write/read access to authenticated users only.

<!-- ## 📷 UI Snapshots (Placeholders)
Dashboard	
Mood Input	
Songs List	
Insights	
Chatbot	 -->

## 🔁 Setup Instructions

### 1. Clone the repo
git clone https://github.com/your-username/musical-mind.git
cd musical-mind

### 2. Install dependencies
npm install

### 3. Add environment variables in `.env`

### 4. Run the app
npm run dev

## 📦 Folder Structure
musical-mind/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── chatbot/
│   ├── firebase/
│   ├── services/
│   ├── utils/
│   └── App.jsx
├── .env
├── index.html
├── package.json


## 📈 Future Enhancements
- 🎤 Voice input fully integrated.

- 📑 Daily quotes & affirmations.

- 📱 Mobile PWA version.

- 🧠 Facial emotion detection (via webcam).

- 🗣 Multi-language support.

<!-- 📄 License
Licensed under MIT. -->

# 👨‍💻 Developed By
- Pranav Kumar
- Artificial Intelligence & Machine Learning Engineer
<!-- GitHub • LinkedIn -->

