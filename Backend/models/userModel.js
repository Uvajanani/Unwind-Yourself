import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, default: null },
  gender: { type: String, default: null },
  overthinkingScore: { type: Number, default: 0 },
  avatar: { type: String, default: "avatar1.png" },

  textEmotions: {
    anger: { type: Number, default: 0 },
    disgust: { type: Number, default: 0 },
    fear: { type: Number, default: 0 },
    joy: { type: Number, default: 0 },
    neutral: { type: Number, default: 0 },
    sad: { type: Number, default: 0 },
    shame: { type: Number, default: 0 },
    surprise: { type: Number, default: 0 }
  },
  
  speechEmotions: {
    anger: { type: Number, default: 0 },
    disgust: { type: Number, default: 0 },
    fear: { type: Number, default: 0 },
    joy: { type: Number, default: 0 },
    neutral: { type: Number, default: 0 },
    sad: { type: Number, default: 0 },
    shame: { type: Number, default: 0 },
    surprise: { type: Number, default: 0 }
  },

  weeklyEmotionScore: { type: Number, default: 0 },

  monthlyEmotionScore: {
    anger: { type: Number, default: 0 },
    disgust: { type: Number, default: 0 },
    fear: { type: Number, default: 0 },
    joy: { type: Number, default: 0 },
    neutral: { type: Number, default: 0 },
    sad: { type: Number, default: 0 },
    shame: { type: Number, default: 0 },
    surprise: { type: Number, default: 0 }
  },

  badges: [{ type: String }],

  developedAreas: {
    meditation: { type: Number, default: 0 },     
    blogging: { type: Number, default: 0 },
    moodTracker: { type: Number, default: 0 }
  }
  

}, { minimize: false });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;

