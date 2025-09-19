import React, { useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard";
import Radar from "./components/Radar";
import ClearOutside from "./components/ClearOutside";
import Clock from "./components/Clock";
import type { ForecastWeatherResponse } from "@shared/schemas/weather";
import { fetchForecast } from "./utils/api";

const lat = 45.956;
const lon = 14.659;
const REFRESH_INTERVAL = 3 * 60; // 3 minutes in seconds

export default function App() {
  const [forecast, setForecast] = useState<ForecastWeatherResponse | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(REFRESH_INTERVAL);

  useEffect(() => {
    // Fetch immediately on mount
    fetchForecast(lat, lon)
      .then(setForecast)
      .catch((err) => {
        console.error("Failed to fetch forecast:", err);
        setError(
          "Failed to load weather data. Please check if the weather API key is configured."
        );
      });

    // Refresh interval - reload the entire page
    const refreshInterval = setInterval(() => {
      window.location.reload();
    }, REFRESH_INTERVAL * 1000);

    return () => clearInterval(refreshInterval);
  }, []);

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (error) {
    return (
      <div style={{ color: "#ffffff", textAlign: "center", padding: "20px" }}>
        <h2>Weather Dashboard</h2>
        <p style={{ color: "#ff6b6b" }}>{error}</p>
        <p style={{ fontSize: "14px", opacity: 0.8 }}>
          To fix this, set the WEATHER_API_KEY environment variable when running
          the Docker container:
        </p>
        <code
          style={{
            display: "block",
            background: "#333",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "4px",
            fontSize: "12px",
          }}
        >
          docker run --rm -p 4000:4000 -e WEATHER_API_KEY=your_api_key_here
          astro-weather-app
        </code>
      </div>
    );
  }

  if (!forecast)
    return <p style={{ color: "#ffffff", textAlign: "center" }}>Loading...</p>;

  return (
    <div className="container">
      <h1>Weather Dashboard</h1>
      <Clock />
      <div className="dashboard-grid">
        <WeatherCard forecast={forecast} secondsLeft={secondsLeft} />
        <Radar />
        {/* Key forces iframe to reload */}
        <ClearOutside lat={lat} lon={lon} height={800} />
      </div>
    </div>
  );
}
