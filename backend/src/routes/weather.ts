import { Router } from "express";
import axios from "axios";
import {
  CurrentWeatherResponseSchema,
  ForecastWeatherSchema,
} from "@shared/schemas/weather";

const router = Router();

// Current weather
router.get("/", async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon)
    return res.status(400).json({ error: "Missing lat or lon" });

  try {
    const apiKey = process.env.WEATHER_API_KEY;
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`
    );

    const parsed = CurrentWeatherResponseSchema.parse(response.data);
    res.json(parsed);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

// Forecast
router.get("/forecast", async (req, res) => {
  const { lat, lon, days } = req.query;

  if (!lat || !lon)
    return res.status(400).json({ error: "Missing lat or lon" });

  try {
    const apiKey = process.env.WEATHER_API_KEY;
    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=${
        days || 3
      }`
    );

    const parsed = ForecastWeatherSchema.parse(response.data);
    res.json(parsed);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch forecast data" });
  }
});

export default router;
