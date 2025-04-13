import userModel from "../models/userModel.js";

export const updateEmotionScore = async (req, res) => {
  const { userId, source, emotion } = req.body; 

  if (!userId || !source || !emotion) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  const emotionField = source === "text" ? "textEmotions" : "speechEmotions";

  try {
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user[emotionField][emotion] += 10;
    user.weeklyEmotionScore += 10;
    user.monthlyEmotionScore[emotion] += 10;

    await user.save();
    res.json({ success: true, message: "Emotion scores updated", user });
  } catch (error) {
    console.error("Error updating emotion score:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const getEmotionScores = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ success: false, message: "Missing userId" });
  }

  try {
    const user = await userModel.findById(userId, "textEmotions speechEmotions weeklyEmotionScore monthlyEmotionScore");

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({
      success: true,
      emotionScores: {
        textEmotions: user.textEmotions,
        speechEmotions: user.speechEmotions,
        weeklyEmotionScore: user.weeklyEmotionScore,
        monthlyEmotionScore: user.monthlyEmotionScore,
      }
    });
  } catch (error) {
    console.error("Error fetching emotion scores:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
