// import axios from "axios";
// import {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } from "@google/generative-ai"

// const apiKey ="AIzaSyDShwcn1TTQ-nXTv0_nDUOhfQiCu5TL3rY";
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-pro",
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 40,
//   maxOutputTokens: 8192,
//   responseMimeType: "text/plain",
// };

// async function run(prompt) {
//   try {
//     if (!prompt || prompt.trim() === "") {
//       return { botReply: "Prompt is empty.", predictedEmotion: "unknown" };
//     }

//     const chatSession = model.startChat({
//       generationConfig,
//       history: [],
//     });

//     const result = await chatSession.sendMessage(prompt);
//     const chatbotResponse = result.response.text();

//     // Safe call to emotion API
//     const emotionResponse = await axios.post("http://127.0.0.1:5000/detect-emotion", {
//       text: prompt,
//     });

//     console.log("Prompt being sent to Flask:", prompt);

//     return {
//       botReply: chatbotResponse,
//       predictedEmotion: emotionResponse.data.predicted_emotion,
//       emoji: emotionResponse.data.emoji,
//       probabilities: emotionResponse.data.probabilities,
//     };
//   } catch (error) {
//     console.error("Error in Gemini run():", error);
//     return { botReply: "Something went wrong.", predictedEmotion: "unknown" };
//   }
// }


// export default run;


import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai"

const apiKey ="AIzaSyDShwcn1TTQ-nXTv0_nDUOhfQiCu5TL3rY";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  const responseText = result.response.text();

  // Log it to verify
  console.log("Gemini Raw Text Response:", responseText);

  return {
    botReply: responseText,
    predictedEmotion: "unknown", // optional fallback
  };
}


export default run;