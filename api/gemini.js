import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.VITE_GEMINI_API_KEY}`,
      req.body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response)
      res.status(error.response.status).json(error.response.data);
    else 
      res.status(500).json({ error: "Internal Server Error" });
  }
}
