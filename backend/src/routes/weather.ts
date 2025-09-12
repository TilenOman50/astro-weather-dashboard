import { Router } from "express";
import axios from "axios";
import {
  CurrentWeatherResponseSchema,
  ForecastWeatherSchema,
  DayForecastSchema,
  ForecastWeatherResponse,
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

// Forecast (next 10 hours across days)
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
    const now = new Date();
    let remainingHours = 10;
    const filteredForecastDays: typeof parsed.forecast.forecastday = [];

    for (const day of parsed.forecast.forecastday) {
      const nextHours = day.hour.filter((h) => {
        const hourTime = new Date(h.time);
        return hourTime.getTime() >= now.getTime();
      });

      if (nextHours.length === 0) continue;

      if (nextHours.length > remainingHours) {
        filteredForecastDays.push({
          ...day,
          hour: nextHours.slice(0, remainingHours),
        });
        break;
      } else {
        filteredForecastDays.push({
          ...day,
          hour: nextHours,
        });
        remainingHours -= nextHours.length;
      }
    }

    const filteredForecast: ForecastWeatherResponse = {
      ...parsed,
      forecast: {
        forecastday: filteredForecastDays,
      },
    };

    res.json(filteredForecast);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch forecast data" });
  }
});

export default router;
