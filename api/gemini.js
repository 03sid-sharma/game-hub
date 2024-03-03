import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.create({
      baseURL: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${
        import.meta.env.VITE_GEMINI_API_KEY
      }`,
      headers: {
        "Content-Type": "application/json",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
