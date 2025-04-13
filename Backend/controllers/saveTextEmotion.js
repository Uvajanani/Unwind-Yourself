import userModel from "../models/userModel.js";

export const saveTextEmotion = async (req, res) => {
    try {
      const { userId, emotionData } = req.body;
    
      if (!userId || !emotionData) {
        return res.status(400).json({ message: "Missing userId or emotion data" });
      }
  
      const user = await userModel.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const newEmotions = emotionData?.probabilities || {};
  
      if (user.textEmotions && Object.keys(user.textEmotions).length > 0) {
        const averagedEmotions = {};
  
        for (let emotion in newEmotions) {
          const existingValue = user.textEmotions[emotion] || 0;
          const newValue = newEmotions[emotion] || 0;
  
          averagedEmotions[emotion] = ((existingValue + newValue) / 2).toFixed(4);
        }
  
        user.textEmotions = averagedEmotions;
      } else {
        user.textEmotions = newEmotions;
      }
  
      await user.save();
  
      return res.status(200).json({
        message: "Emotion data updated (averaged if existing)",
        textEmotions: user.textEmotions,
      });
    } catch (err) {
      console.error("saveTextEmotionToDB error:", err);
      return res.status(500).json({ message: "Server error" });
    }
  };
  

export const getUserTextEmotion = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User emotion data fetched successfully",
      probabilities: user.textEmotions || {},
    });
  } catch (error) {
    console.error("getUserTextEmotion error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
