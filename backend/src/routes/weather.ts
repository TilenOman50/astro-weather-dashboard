import { Router } from "express";
import axios from "axios";

const router = Router();

// Current weather route
router.get("/", async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res
      .status(400)
      .json({ error: "Missing lat or lon query parameter" });
  }

  try {
    const apiKey = process.env.WEATHER_API_KEY;
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`
    );

    res.json(response.data);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

// Forecast route
router.get("/forecast", async (req, res) => {
  const { lat, lon, days = 1 } = req.query; // default 3 days

  if (!lat || !lon) {
    return res
      .status(400)
      .json({ error: "Missing lat or lon query parameter" });
  }

  try {
    const apiKey = process.env.WEATHER_API_KEY;
    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=${days}&aqi=no&alerts=no`
    );

    res.json(response.data);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch forecast data" });
  }
});

export default router;
