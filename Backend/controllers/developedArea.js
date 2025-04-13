import userModel from "../models/userModel.js";

export const updateDevelopedArea = async (req, res) => {
  const { userId, area, value } = req.body;

  console.log("Incoming request:", { userId, area, value });

  if (!userId || !area || typeof value !== "number" || value < 0 || value > 100) {
    return res.status(400).json({ success: false, message: "Invalid data" });
  }

  if (!["meditation", "blogging", "moodTracker"].includes(area)) {
    return res.status(400).json({ success: false, message: "Invalid area" });
  }

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      console.log("User not found for ID:", userId);
      return res.status(404).json({ success: false, message: "User not found" });
    }

    console.log("User found:", user.name);

    // Ensure developedAreas exists (safety check)
    if (!user.developedAreas) {
      user.developedAreas = {
        meditation: 0,
        blogging: 0,
        moodTracker: 0
      };
    }

    user.developedAreas[area] = value;
    await user.save();

    res.json({ success: true, message: `${area} progress updated to ${value}%`, user });
  } catch (error) {
    console.error("Error updating developed area:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

  

export const getDevelopedAreas = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, developedAreas: user.developedAreas });
  } catch (error) {
    console.error("Error fetching developed areas:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

  