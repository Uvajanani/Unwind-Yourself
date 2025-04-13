import { createContext, useState, useEffect } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const url = "http://localhost:4000";
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const initialUser = localStorage.getItem("chatUser") ? JSON.parse(localStorage.getItem("chatUser")) : null;
    const [user, setUser] = useState(initialUser);
    const [id, setId] = useState(initialUser?._id || "");


    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        }
    }, [token]);

    useEffect(() => {
        if (user && typeof user === "object" && user.name) {
            localStorage.setItem("chatUser", JSON.stringify(user));
            localStorage.setItem("userId", user._id); 
            setId(user._id);
        }
    }, [user]);


    const [input, setInput] = useState("");                 
    const [recentPrompt, setRecentPrompt] = useState("");   
    const [prevPrompts, setPrevPrompts] = useState([]);     
    const [showResult, setShowResult] = useState(false);   
    const [loading, setLoading] = useState(false);            
    const [resultData, setResultData] = useState("");     
    const [emotionData, setEmotionData] = useState(null);




    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    };

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    };


    const detectEmotion = async (text) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/analyze', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text }),
            });
            if (!response.ok) throw new Error("Failed to fetch emotion data");
            const data = await response.json();
            return data; 
        } catch (error) {
            console.error("Emotion detection error:", error);
            return null;
        }
    };

    const saveTextEmotion = async (userId, emotionData) => {
        try {
          const response = await fetch(`${url}/api/emotion/save-text-emotion`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, emotionData }),
          });
      
          if (!response.ok) throw new Error("Failed to save emotion data");
          const data = await response.json();
          console.log("Saved emotion data to DB:", data);
        } catch (err) {
          console.error("Save emotion error:", err);
        }
      };  
      
      
    

      const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
      
        let response;
        let message = prompt !== undefined ? prompt : input;
      
        setRecentPrompt(message);
        if (prompt === undefined) {
          setPrevPrompts(prev => [...prev, input]);
        }
      
        try {
          response = await run(message);
      
          console.log("API Response:", response);
      
          let botReply = response.botReply || "Something went wrong.";
          let responseArray = botReply.split("**");
          let newResponse = "";
      
          for (let i = 0; i < responseArray.length; i++) {
            newResponse += (i % 2 === 1) ? `<b>${responseArray[i]}</b>` : responseArray[i];
          }
      
          let newResponse2 = newResponse.replace(/\*/g, "<br>");
          let newResponseArray = newResponse2.split(" ");
      
          for (let i = 0; i < newResponseArray.length; i++) {
            delayPara(i, newResponseArray[i] + " ");
          }
      
          const emotionResult = {
            predicted_emotion: response.predictedEmotion,
            emoji: response.emoji,
            probabilities: response.probabilities,
            text: botReply,
          };
      
          setEmotionData(emotionResult);
      
          if (emotionResult && id) {
            await saveTextEmotion(id, emotionResult);
          }
      
        } catch (error) {
          console.error("Error in onSent:", error);
          setResultData("Error processing request.");
        } finally {
          setLoading(false);
          setInput("");
        }
      };
          

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        url,
        token,
        setToken,
        user,
        setUser,
        emotionData,
        id,
        setId,
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;
