import axios from "axios";

export const assistWithAI = async (req, res) => {
  try {
    const { incidentDetails } = req.body;

    // Send request to Flask API with a secure connection (SSL/TLS)
    const response = await axios.post("http://localhost:5001/generate-report", {
      incidentDetails,
    });

    res.json({ message: response.data.message });
  } catch (err) {
    console.error("AI Error:", err);
    res.status(500).json({ error: "AI Error" });
  }
};
