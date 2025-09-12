import React, { useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard";
import Radar from "./components/Radar";
import ClearOutside from "./components/ClearOutside";
import Clock from "./components/Clock";
import type { ForecastWeatherResponse } from "@shared/schemas/weather";
import { fetchForecast } from "./utils/api";

const lat = 45.956;
const lon = 14.659;
const REFRESH_INTERVAL = 2 * 60; // 2 minutes in seconds

export default function App() {
  const [forecast, setForecast] = useState<ForecastWeatherResponse | null>(
    null
  );
  const [secondsLeft, setSecondsLeft] = useState(REFRESH_INTERVAL);

  useEffect(() => {
    // Fetch immediately on mount
    fetchForecast(lat, lon).then(setForecast).catch(console.error);

    // Refresh interval
    const refreshInterval = setInterval(() => {
      fetchForecast(lat, lon).then(setForecast).catch(console.error);
      setSecondsLeft(REFRESH_INTERVAL); // reset countdown
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

  if (!forecast)
    return <p style={{ color: "#ffffff", textAlign: "center" }}>Loading...</p>;

  return (
    <div className="container">
      <h1>Weather Dashboard</h1>
      <Clock />
      <div className="dashboard-grid">
        <WeatherCard forecast={forecast} secondsLeft={secondsLeft} />
        <Radar />
        <ClearOutside lat={lat} lon={lon} height={800} />
      </div>
    </div>
  );
}
