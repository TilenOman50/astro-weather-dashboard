import type { ForecastWeatherResponse } from "@shared/schemas/weather";

const BASE_URL = "";

export async function fetchForecast(
  lat: number,
  lon: number
): Promise<ForecastWeatherResponse> {
  const res = await fetch(`${BASE_URL}/weather/forecast?lat=${lat}&lon=${lon}`);

  if (!res.ok) {
    const errorData = await res
      .json()
      .catch(() => ({ error: "Unknown error" }));
    throw new Error(errorData.error || `HTTP ${res.status}: ${res.statusText}`);
  }

  return res.json();
}
