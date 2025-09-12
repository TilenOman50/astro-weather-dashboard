import React, { useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard";
import Radar from "./components/Radar";
import Clock from "./components/Clock";
import type { ForecastWeatherResponse } from "@shared/schemas/weather";
import { fetchForecast } from "./utils/api";

const lat = 45.956;
const lon = 14.659;

export default function App() {
  const [forecast, setForecast] = useState<ForecastWeatherResponse | null>(
    null
  );

  useEffect(() => {
    fetchForecast(lat, lon).then(setForecast).catch(console.error);
  }, []);

  if (!forecast)
    return <p style={{ color: "#ffffff", textAlign: "center" }}>Loading...</p>;

  return (
    <div className="container">
      <h1>Weather Dashboard</h1>
      <Clock />
      <div className="dashboard-grid">
        {/* Pass the full forecast object */}
        <WeatherCard forecast={forecast} />
        <Radar />
      </div>
    </div>
  );
}
