import type {
  ForecastWeatherResponse,
  DayForecast,
} from "@shared/schemas/weather";

interface Props {
  forecast: ForecastWeatherResponse;
}

export default function WeatherCard({ forecast }: Props) {
  const today = forecast.forecast.forecastday[0];

  // Flatten next 10 hours across today and tomorrow if needed
  const now = new Date();
  const next10Hours: typeof today.hour = [];

  for (const day of forecast.forecast.forecastday) {
    for (const hour of day.hour) {
      const hourDate = new Date(hour.time);
      if (hourDate >= now && next10Hours.length < 10) {
        next10Hours.push(hour);
      }
    }
  }

  // Helper to format time in 24-hour format
  const formatTime = (time: string) => {
    const date = new Date(time);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="weather-card">
      {/* Current weather */}
      <h2>Current Weather</h2>
      <p>
        Location: {forecast.location.name}, {forecast.location.country}
      </p>
      <p>
        Temp: {forecast.current.temp_c}°C / {forecast.current.temp_f}°F
      </p>
      <p>Condition: {forecast.current.condition.text}</p>
      <p>Humidity: {forecast.current.humidity}%</p>
      <p>Wind: {forecast.current.wind_kph} kph</p>

      {/* Today's summary */}
      <h2>Today's Forecast</h2>
      <p>Date: {today.date}</p>
      <p>
        Max: {today.day.maxtemp_c}°C, Min: {today.day.mintemp_c}°C
      </p>
      <p>Condition: {today.day.condition.text}</p>

      {/* Next 10 hours scrollable section */}
      <h3>Next 10 Hours</h3>
      <div className="hours-scroll">
        {next10Hours.map((hour) => (
          <div className="hour-card" key={hour.time}>
            <p>{formatTime(hour.time)}</p>
            <p>
              Temp: {hour.temp_c}°C / {hour.temp_f}°F
            </p>
            <p>Condition: {hour.condition.text}</p>
            <p>Humidity: {hour.humidity}%</p>
            <p>Wind: {hour.wind_kph} kph</p>
          </div>
        ))}
      </div>
    </div>
  );
}
