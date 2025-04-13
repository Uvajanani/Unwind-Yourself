import React, { useState, useRef } from 'react';
import './Voice.css';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const Voice = () => {
  const navigate = useNavigate();
  const [recording, setRecording] = useState(false);
  const [response, setResponse] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [emotion, setEmotion] = useState("");

  const handleMicClick = async () => {
    console.log("🎤 Mic clicked");
    if (recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (e) => {
          audioChunksRef.current.push(e.data);
        };

        mediaRecorder.onstop = async () => {
          console.log("🛑 Recording stopped");
          console.log("🎧 Chunks:", audioChunksRef.current);

          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const formData = new FormData();
          formData.append('audio', audioBlob, 'recording.webm');

            try {
              const res = await fetch('http://127.0.0.1:5000/assistant', {
                method: 'POST',
                body: formData,
              });
              const data = await res.json();
              setResponse(data.reply);
          
              if (data.audio) {
                const audio = new Audio(`data:audio/mp3;base64,${data.audio}`);
                audio.play();
              }
          
              const emotionRes = await fetch('http://127.0.0.1:5000/detect-emotion', {
                method: 'POST',
                body: formData,
              });
              
              const emotionData = await emotionRes.json();

              console.log("🧠 Emotion data received:", emotionData);

              
              if (emotionData.emotions && typeof emotionData.emotions === 'object') {
                const emotions = emotionData.emotions;
                const emotionKeys = Object.keys(emotions);
              
                if (emotionKeys.length > 0) {
                  const primaryEmotion = emotionKeys.reduce((a, b) =>
                    emotions[a] > emotions[b] ? a : b
                  );
              
                  setEmotion(primaryEmotion);
              
                  await fetch("http://localhost:4000/api/save-speech-emotion", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      userId: localStorage.getItem("userId"),
                      emotionLabel: primaryEmotion,
                      emotionScores: emotions,
                    }),
                  });
                }
              }
              
               else {
                console.log("No emotions detected or API error.");
                setEmotion("Unknown");
              }
              
              
              
            } catch (err) {
              console.error("Error:", err);
            }
          };

        mediaRecorder.start();
        setRecording(true);
      } catch (err) {
        console.error("Error accessing microphone:", err);
      }
    }
  };

  

  return (
    <div className='voice-assistant'>
      <div className='voice-header'>
        <img onClick={() => navigate('/main-page')} src={assets.leftArrow} alt="" />
        <h1>Hello Buddy, feel free to talk</h1>
      </div>
      <div className="voice-start-wrapper">
        <div className="voice-ring" onClick={handleMicClick} style={{ cursor: 'pointer' }}>
          <p className="greeting">{recording ? "Listening..." : "Morning, Buddy"}</p>
          <h2 className="tap-text">{recording ? "Tap to Stop" : "Tap to Start"}</h2>
          <div className="mic-icon">
            <i className="fas fa-microphone"></i>
          </div>
        </div>
      </div>

      {response && (
        <div className="voice-response">
          <p><strong>AI Response:</strong> {response}</p>
        </div>
      )}

      {emotion && (
        <div>
          Detected Emotion: {emotion}
        </div>
      )}
    </div>
  );
};

export default Voice;
