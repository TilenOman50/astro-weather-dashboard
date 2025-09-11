import React, { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";
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

  if (!forecast) return <p>Loading...</p>;

  const today = forecast.forecast.forecastday[0];

  return (
    <div className="container">
      <h1>Weather Dashboard</h1>
      <WeatherCard today={today} location={forecast.location} />
    </div>
  );
}
