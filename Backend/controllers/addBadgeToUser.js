import userModel from "../models/userModel.js";

export const addBadgeToUser = async (req, res) => {
    const { userId, badge } = req.body;
  
    if (!userId || !badge) {
      return res.status(400).json({ success: false, message: "Missing badge or userId" });
    }
  
    try {
      const user = await userModel.findById(userId);
      if (!user) return res.status(404).json({ success: false, message: "User not found" });
  
      if (!user.badges.includes(badge)) {
        user.badges.push(badge);
        await user.save();
      }
  
      res.json({ success: true, message: "Badge added", user });
    } catch (error) {
      console.error("Error adding badge:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  

  export const getUserBadges = async (req, res) => {
    const { userId } = req.params;
  
    if (!userId) {
      return res.status(400).json({ success: false, message: "Missing userId" });
    }
  
    try {
      const user = await userModel.findById(userId, "badges");
      if (!user) return res.status(404).json({ success: false, message: "User not found" });
  
      res.json({ success: true, badges: user.badges });
    } catch (error) {
      console.error("Error fetching badges:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };