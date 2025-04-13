import React, { useState } from 'react'
import './SpeechToText.css'; 

const SpeechToText = () => {

    const [text, setText] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [emotion, setEmotion] = useState("");
    const [emoji, setEmoji] = useState("");

    const recordSpeech = async () => {
        setIsListening(true);
        try {
            console.log("Sending request to backend...");
            const response = await fetch("http://localhost:4000/api/speech-to-text", {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });
        
            const data = await response.json();
            console.log("Received response:", data);
    
            if (data.text) {
                setText(data.text);
                setEmotion(data.emotion);
                setEmoji(data.emoji);
            } else {
                alert("Speech recognition failed. Try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error in speech recognition");
        }
    };

    const stopSpeech = () => {
        setIsListening(false);
        fetch("http://localhost:4000/api/stop-speech", { method: "POST" }); // Call backend to stop
      };
            

  return (
    <div className='speech-container'>
            <h2>Speech to Text Converter</h2>
            {!isListening ? (
        <button className="speech-button" onClick={recordSpeech}>
          🎤 Start Speaking
        </button>
      ) : (
        <button className="speech-button stop-button" onClick={stopSpeech}>
          ⏹ Stop
        </button>
      )}

      <h3>Recognized Text: {text}</h3>
      <h3>Detected Emotion: {emotion} {emoji}</h3>
      <p>{text || "No speech detected yet."}</p>
    
    </div>
  )
}

export default SpeechToText