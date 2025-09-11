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

  if (!forecast) return <p style={{ color: "#ffffff" }}>Loading...</p>;

  const today = forecast.forecast.forecastday[0];

  return (
    <div className="container">
      <h1>Weather Dashboard</h1>
      <Clock />
      <div className="dashboard-grid">
        <WeatherCard today={today} location={forecast.location} />
        <Radar />
      </div>
    </div>
  );
}
