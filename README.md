# AI-Powered Overthinking Recovery App

An intelligent wellness platform designed to help users manage overthinking, reduce stress, and improve emotional well-being through AI-driven emotion detection, interactive chatbot, personalized storytelling, and a supportive community.

## Features

### Real-Time Emotion Detection
- Converts speech to text using **Whisper**.
- Detects emotions from voice using **Deepgram + EmLo (Emotion Logic)**.
- Text emotion analysis using a custom-trained **NLP emotion classifier**.

###  AI-Powered Chatbot
- Responds to users with **emotion-aware voice responses**.
- Supports both **text and voice-based** conversations.
- Uses **Gemini (LLM)** for context-aware responses.
- Speech output generated with **gTTS + pygame** for emotional tone alignment.

### Personalized Story Generator
- If a user misses someone, the app can generate a heartwarming story involving that person.
- Stories are genre-based (e.g., romance, fantasy) and visually enriched using dynamically created templates.

### Dashboard & Analytics
- Weekly emotion and stress-level analytics.
- Displays development in areas like meditation, blogging, and mood tracking.


### Community Support
- Connect with other users experiencing similar struggles.
- Encourages safe, empathetic communication within a monitored forum.

---

## 🧰 Tech Stack

### Frontend
- **React.js** (with functional components and hooks)
- **Tailwind CSS** for styling
- **Framer Motion** for animations

### Backend (API & Integration)
- **Node.js** with **Express.js**
- **MongoDB** for data storage
- **Python Flask** microservice for text emotion detection
- **Speech emotion model** (`speech_emotion_model.h5`) integrated via Python API
- **Deepgram API** for real-time speech processing
- **gTTS + Pygame** for emotion-based speech generation
- **Gemini LLM** for chatbot intelligence and storytelling

---


---

## 📦 Libraries & Tools Used

- **OpenAI Whisper** – Speech-to-text
- **Deepgram API** – Voice emotion recognition
- **scikit-learn, TensorFlow, Keras** – Text emotion detection model
- **Gemini** – Chat and story generation
- **Flask** – Python backend for emotion detection
- **MongoDB Atlas** – Cloud NoSQL DB
- **Postman** – API testing
- **Dribble** – Visual designs & story assets

---

## 🧪 Future Enhancements

- Integrate journaling + meditation exercises
- Expand emotion classification for multi-label scenarios
- Improve voice synthesis for more human-like tone
- Add image generation based on story content using Stable Diffusion

---

## 👩‍💻 Developed By

**Uvajanani** – MERN Stack Developer 
**Yuhanncia Mary S** – Web Developer 
**Yugabharathi T** – Web Developer 

---

## 📜 License

This project is licensed under the MIT License.



