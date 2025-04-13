import axios from "axios";

export const detectEmotion = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ error: "Text is required" });
        }

        const response = await axios.post("http://127.0.0.1:5000/analyze", { text });

        return res.json(response.data);
    } catch (error) {
        console.error("Error detecting emotion:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


