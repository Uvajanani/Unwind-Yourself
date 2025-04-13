// import path from "path";
// import { fileURLToPath } from "url";
// import { exec, execSync  } from "child_process";
// import { promises as fs } from "fs";
// import axios from "axios";

// // Fix for __dirname in ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const scriptPath = path.join(__dirname, "../python_scripts/speech_to_text.py");
// const outputFilePath = path.join(__dirname, "../output.txt");

// // let pythonProcess = null;

// export const convertSpeechToText = async (req, res) => {
//     try {
//         exec(`python ${scriptPath}`, async (error, stdout, stderr) => {
//             if (error) {
//                 console.error(`Error: ${stderr}`);
//                 return res.status(500).json({ error: "Speech recognition failed" });
//             }

//             try {
//                 // Read the latest text from `output.txt`
//                 const data = await fs.readFile(outputFilePath, "utf8");
//                 const lines = data.trim().split("\n");
//                 const latestText = lines[lines.length - 1]; // Get the last spoken text
                
//                 console.log("Latest text:", latestText);

//                 const emotionResponse = await post("http://127.0.0.1:5000/analyze", {
//                     text: latestText }
//                 )
                

//                 // const emotionData = await emotionResponse.json();
//                 // const detectedEmotion = emotionData.predicted_emotion;
//                 // const emotionEmoji = emotionData.emoji;

//                 // Return text, detected emotion, and emoji to the frontend
//                 res.json({
//                     text: latestText,
//                     emotion: emotionResponse.data.predicted_emotion,
//                     emoji: emotionResponse.data.emoji
//                 });

                
//             } catch (fileError) {
//                 res.status(500).json({ error: "Error reading output file" });
//             }
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };


// export const stopSpeechRecognition = (req, res) => {
//     if (pythonProcess) {
//         pythonProcess.kill(); // Kill the running Python process
//         pythonProcess = null;
//         res.json({ message: "Speech recognition stopped" });
//     } else {
//         res.json({ message: "No active speech recognition process" });
//     }
// };


import User from "../models/userModel.js";

export const saveSpeechEmotion = async (req, res) => {
  const { userId, emotionLabel } = req.body;

  try {
    if (!userId || !emotionLabel) {
      return res.status(400).json({ error: "Missing userId or emotionLabel" });
    }

    const validEmotions = [
      'anger', 'disgust', 'fear', 'joy', 'neutral', 'sad', 'shame', 'surprise'
    ];

    if (!validEmotions.includes(emotionLabel)) {
      return res.status(400).json({ error: "Invalid emotionLabel" });
    }

    // Update the corresponding emotion count in the user's speechEmotions field
    const updateField = `speechEmotions.${emotionLabel}`;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $inc: { [updateField]: 1 } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("✅ Updated user speechEmotions:", updatedUser.speechEmotions);
    res.status(200).json({ message: '✅ Emotion saved successfully' });

  } catch (error) {
    console.error("❌ Error saving speech emotion:", error);
    res.status(500).json({ error: 'Failed to save emotion', details: error.message });
  }
};


export const getSpeechEmotions = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const speechData = user.speechEmotions || {};
    res.status(200).json({ probabilities: speechData });
  } catch (error) {
    console.error("❌ Error fetching speech emotion data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};
