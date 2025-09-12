import React, { useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard";
import Radar from "./components/Radar";
import ClearOutside from "./components/ClearOutside";
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
        <WeatherCard forecast={forecast} />
        <Radar />
        <ClearOutside lat={lat} lon={lon} height={800} />
      </div>
    </div>
  );
}
