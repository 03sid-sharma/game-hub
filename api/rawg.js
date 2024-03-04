import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.get("https://api.rawg.io/api/games", {
      params: {
        ...req.query,
        key: process.env.VITE_RAWG_KEY,
      },
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response)
      res.status(error.response.status).json(error.response.data);
    else res.status(500).json({ error: "Internal Server Error" });
  }
}
