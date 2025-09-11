import type { DayForecast, Location } from "@shared/schemas/weather";

interface Props {
  today: DayForecast;
  location: Location;
}

export default function WeatherCard({ today, location }: Props) {
  return (
    <div className="weather-card">
      <h2>
        {location.name}, {location.region}
      </h2>
      <p>Date: {today.date}</p>
      <p>
        Max: {today.day.maxtemp_c}°C, Min: {today.day.mintemp_c}°C
      </p>
      <p>Condition: {today.day.condition.text}</p>

      <h3>Hourly</h3>
      <ul>
        {today.hour.map((hour) => (
          <li key={hour.time}>
            {hour.time} - {hour.temp_c}°C - {hour.condition.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
