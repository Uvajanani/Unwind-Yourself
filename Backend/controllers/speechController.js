
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

    const updateField = `speechEmotions.${emotionLabel}`;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $inc: { [updateField]: 1 } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("Updated user speechEmotions:", updatedUser.speechEmotions);
    res.status(200).json({ message: 'Emotion saved successfully' });

  } catch (error) {
    console.error("Error saving speech emotion:", error);
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
    console.error("Error fetching speech emotion data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};
