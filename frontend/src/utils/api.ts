import type { ForecastWeatherResponse } from "@shared/schemas/weather";

const BASE_URL = "http://localhost:4000";

export async function fetchForecast(
  lat: number,
  lon: number
): Promise<ForecastWeatherResponse> {
  const res = await fetch(`${BASE_URL}/weather/forecast?lat=${lat}&lon=${lon}`);
  return res.json();
}
