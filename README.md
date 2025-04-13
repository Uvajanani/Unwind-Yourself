## AI-Powered Overthinking Recovery App

An intelligent wellness platform designed to help users manage overthinking, reduce stress, and improve emotional well-being through AI-driven emotion detection of both text and speech, interactive chatbot, personalized storytelling, and a supportive community.

## Features

###  AI-Powered Chatbot
- Responds to users with **emotion-aware voice responses**.
- Supports both **text and voice-based** conversations.

### Speech Emotion Recognition using Deep Learning

- Unlock the power of human emotions hidden in voice! This project is a **Deep learning-based Speech Emotion Recognition system** built using Python. 
- It classifies emotional states such as **anger, disgust, fear, happiness, pleasant, surprise, sadness, neutral**, by analyzing audio signals and extracting sound features.
  

### Features in Emotion Detection from speech

- Audio preprocessing & feature extraction
- Deep learning model for classifying emotions
- Trained on the **custom SER dataset**
- Supports prediction of multiple emotion classes (e.g., happy, sad, angry, neutral, fearful)
- Modular codebase for easy reuse and improvement


### Technologies & Libraries

- **Python 3.10**
- **TensorFlow / Keras** – Deep learning framework
- **Librosa** – Audio processing & feature extraction
- **NumPy, Pandas** – Data handling
- **Matplotlib, Seaborn** – Visualization
- **Scikit-learn** – Evaluation metrics & preprocessing


### Audio Features Used

- **MFCC (Mel-frequency cepstral coefficients)**
- **Chroma frequencies**

> These features are extracted from `.wav` audio files and used to train the classification model.

---


## Text Emotion Detection 

This is a **Text Emotion Classifier** built with Python and Streamlit. It uses a pre-trained machine learning pipeline (`text_emotion.pkl`) to analyze user-input text and predict the underlying **emotion** behind it, along with the **confidence score** and a visualized probability distribution.



###  What It Does

- Takes raw text input from the user
- Predicts the **dominant emotion** from the text
- Shows an **emoji-based feedback** based on the detected emotion
- Displays the **prediction confidence**
- Visualizes **probability scores** for each emotion in an interactive bar chart



### Tech Stack

- **Python 3.10**
- **Streamlit** – for building interactive UI
- **Pandas / NumPy** – for data manipulation
- **Altair** – for chart rendering
- **Joblib** – for loading the trained model
- **Scikit-learn** – for model training (behind-the-scenes)

---

## Community Support
- Connect with other users experiencing similar struggles.
- Encourages safe, empathetic communication within a monitored forum.
- Supports active users on online
- Supports delete and delete all mesaages in the community

---


## Entertainment

### Personalized Story Generator
  - If a user misses someone, the app can generate a heartwarming story involving that person.
  - Stories are genre-based (e.g., fantasy) and visually enriched using dynamically created templates.
  - User can also listen to the story in audio

### Blogs
  - Our blog section is more than just articles—it's a carefully curated knowledge hub designed to reduce the overthinking level of users
  - Explore engaging, and covers different genre

### Meditation
  - A **gamified meditation system** where users can practice mindfulness, reduce stress, and build healthy habits.
  - Get gently nudged to stay on track with your mindfulness journey

### Balloon Therapy
  - An emotional release feature which offers users a simple, gamified way to manage their emotions by **visualizing and interacting** with them.
  - Type their feelings into a virtual balloon. Pop the balloon when angry (a satisfying emotional release) . Fly the balloon away when sad (symbolizing letting go or moving on)


---

## Dashboard & Analytics
- Analysed emotions from text and speech
- Weekly emotion and stress-level analytics.
- Displays development in areas like meditation, blogging, and mood tracking.
- Users can view their badges and write journals
- Can edit the profile like avatar, name, password
- Displays the current overthinking level like low, medium or high

---

## Working Flow of the project

An all-in-one platform that helps users manage and overcome overthinking through AI, speech emotion recognition, gamified wellness tools, and a vibrant support community.

---

### 🔐 Authentication & Onboarding

- **Login/Signup:** Users can log in or create an account.
- **Psychological Assessment:** During signup, users are presented with a set of psychology-based questions (different for men and women).
- **Overthinking Level Analysis:** Based on the responses, the user's overthinking level is classified as **Low**, **Medium**, or **High**.

---

### 🏠 Main Dashboard Features

After logging in, users are redirected to the **Main Page** that includes:

- 🤖 **AI Chatbot**
- 🗣️ **Voice Interaction**
- 🌐 **Community Support**
- 🎭 **Entertainment Section**
- 📊 **Dashboard & Analytics**

---

### 🤖 AI Chatbot

- Engage in a conversation with an **AI-powered chatbot**.
- Users can **type messages** and receive intelligent emotional support.
- The system detects and displays the **emotion** behind the user's message.
- All chats are private and secure.

---

### 🗣️ Voice Talk (Speech Emotion Detection)

- Users can **speak directly to the AI bot**.
- The app uses deep learning models to detect **emotions from speech and text**.
- The AI bot replies in **emotionally appropriate voice responses** using speech synthesis.

---

### 🌐 Community Support

- A safe space for users to connect and support one another.
- Features:
  - **Live chat** using `Socket.IO`
  - View **active users online**
  - **Delete individual messages** or **clear chat history**
  - **Real-time messaging** among multiple users

---

### 🎭 Entertainment Section

- This provides the remedy for get rid of overthinking
- It has Meditation, Balloon Therapy, Personalized Story Generator, Blog Section
 

---

### 📊 Dashboard & Analytics

- Emotion tracking from **both text and speech input**.
- Weekly analytics display:
  - Overthinking trends
  - Emotional fluctuation
  - Progress in meditation, blogging, and journaling
- View **achievements and badges** earned
- Manage profile settings:
  - Update name, password, and avatar
- Displays current **Overthinking Level**: Low, Medium, or High

---

## Tech Stack

## Frontend
- **React.js** (with functional components and hooks)
- **CSS** for styling
- **Framer Motion** for animations

## Backend (API & Integration)
- **Node.js** with **Express.js**
- **MongoDB** for data storage
- **Python Flask** microservice for text emotion detection
- **Speech emotion model** (`speech_emotion_model.h5`) integrated via Python API
- **Text emotion model** (`text_emotion_model.h5`) 
- **Deepgram API** for real-time speech processing
- **gTTS + Pygame** for emotion-based speech generation
- **Gemini LLM** for chatbot intelligence and storytelling

---



## 📦 Libraries & Tools Used

- **scikit-learn, TensorFlow, Keras** – Text Emotion Detection Model
- **Librosa, numpy, pandas, scikit-learn** - Speech Emotion Detection Model
- **Flask** – Python backend for emotion detection
- **MongoDB Atlas** – Cloud NoSQL DB
- **socket.io** - Real time Communication
- **Postman** – API testing
- **OpenAI Whisper** – Speech-to-text
- **Gemini** – Chat generation
- **Dribble** – Visual designs
- **flaticon** - Assets

---

## 🧪 Future Enhancements

- Expand emotion classification for multi-label scenarios
- Improve voice synthesis for more human-like tone
- Add image generation based on story content
- Multilingual Support

---


## 👩‍💻 Developed By

- **Uvajanani R P** – MERN Stack Developer 
- **Yuhanncia Mary S** – Web Developer | AI Enthusiast
- **Yugabharathi T** – Web Developer | AI Enthusiast

---





