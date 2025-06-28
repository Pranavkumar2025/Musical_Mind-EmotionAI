# 🎶 Musical Mind — AI-Powered Mood-Based Music Recommender

> An intelligent, full-stack music recommendation web app that detects your mood using AI and offers curated Spotify tracks — now enhanced with a mental wellness chatbot, real-time insights, and secure user sessions.

![musical-mind-banner](./assets/banner.png) <!-- Optional banner image -->

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

### 🧠 1. **AI-Powered Mood Detection**
- Uses **Google Gemini API** to analyze user input text.
- Detects primary emotional state: _happy, sad, angry, calm, excited, etc._.
- Optional voice input via **Web Speech API** for hands-free use.

### 🎵 2. **Spotify-Based Music Recommendations**
- Fetches **top 5 tracks** from Spotify based on the detected or uplifted mood.
- Uses **Spotify Client Credentials Flow** for secure API access.
- Songs are playable and linked directly to Spotify.

### 💫 3. **Mood Uplifter Logic**
A unique feature that remaps negative emotions into positive music moods:

```js
const moodMap = {
  "sad": "happy",
  "happy": "excited",
  "calm": "positive",
  "angry": "chill",
  "excited": "party"
};
“If you’re sad, we’ll play happy — if you’re angry, we’ll calm you.”

🔐 4. User Authentication & Session Management
Secure signup/login with MongoDB + JWT.

Tokens stored in localStorage and attached to all secure endpoints.

Protected dashboard, chatbot, and insights routes.

☁️ 5. Mood History Tracking (via Firebase)
Each mood detection event is saved under the logged-in user.

Uses Firebase Realtime Database for structured storage.

Enables insights and personal emotional timeline.

📊 6. Mood Insights Dashboard
Graphical reports on mood frequency and progression.

Uses Chart.js / Recharts for dynamic visualizations.

Helps users reflect on emotional patterns.

🤖 7. Mental Wellness Chatbot
Built-in chatbot for self-help, encouragement, and emotional advice.

Users can type problems or emotions and receive helpful responses.

Uses AI-powered generative models (e.g., Gemini).

🎤 8. Voice Input (Planned/Optional)
Convert voice to text using Web Speech API.

Automatically analyze spoken input for mood detection.

📢 9. Social Sharing (Optional)
Share mood and music recommendations on social media.

📑 10. Daily Quote (Planned)
Display a motivational quote related to current mood.

🔧 Tech Stack Overview
Category	Technology
Frontend	React.js
Styling	Tailwind CSS
State Management	useState, Context API
Mood Detection	Google Gemini API
Music Recommendation	Spotify Web API
Auth	MongoDB, JWT
Mood History Storage	Firebase Realtime DB
Graphing	Chart.js / Recharts
Voice Input (Optional)	Web Speech API
Chatbot	Gemini/GPT-powered AI

🛠 System Architecture
txt
Copy
Edit
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
🧪 Example User Flow
👤 User signs up or logs in.

✍️ Enters mood in natural language.

🤖 Google Gemini detects emotional state.

🔁 Mood Uplifter Logic determines final target mood.

🎧 Spotify API fetches 5 tracks for that vibe.

💾 Mood + songs saved in Firebase DB.

📈 Graphical insights generated from history.

💬 User chats with AI-powered mental health bot.

🔄 User repeats whenever needed — building a mood profile.

🌐 Environment Variables (.env example)
env
Copy
Edit
VITE_GEMINI_API_KEY=your-gemini-api-key
VITE_SPOTIFY_CLIENT_ID=your-client-id
VITE_SPOTIFY_CLIENT_SECRET=your-client-secret
VITE_FIREBASE_CONFIG=your-firebase-config-json
VITE_API_URL=http://localhost:5000
🔐 Security Practices
JWT tokens securely stored in localStorage.

All protected endpoints validate token on each request.

Spotify credentials Base64 encoded.

Firebase rules restrict write/read access to authenticated users only.

📷 UI Snapshots (Placeholders)
Add actual images in ./screenshots folder and reference them here:

Page	Screenshot
Dashboard	
Mood Input	
Songs List	
Insights	
Chatbot	

🔁 Setup Instructions
bash
Copy
Edit
# 1. Clone the repo
git clone https://github.com/your-username/musical-mind.git
cd musical-mind

# 2. Install dependencies
npm install

# 3. Add environment variables in `.env`

# 4. Run the app
npm run dev
📦 Folder Structure
pgsql
Copy
Edit
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
📈 Future Enhancements
🎤 Voice input fully integrated.

📑 Daily quotes & affirmations.

📱 Mobile PWA version.

🧠 Facial emotion detection (via webcam).

🗣 Multi-language support.

📄 License
Licensed under MIT.

👨‍💻 Developed By
Pranav Kumar
Artificial Intelligence & Machine Learning Engineer
GitHub • LinkedIn

