import type { ForecastWeatherResponse } from "@shared/schemas/weather";

interface Props {
  forecast: ForecastWeatherResponse;
  secondsLeft: number;
}

export default function WeatherCard({ forecast, secondsLeft }: Props) {
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

  // Format countdown as mm:ss
  const formatCountdown = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Calculate astro score and reason
  const calculateAstroScore = (hour: any) => {
    let score = 0;
    const reasons: string[] = [];

    // Cloud cover
    score += hour.cloud;
    if (hour.cloud > 70) reasons.push("Very cloudy");
    else if (hour.cloud > 40) reasons.push("Partly cloudy");

    // Dew point vs temp
    const dewDiff = Math.abs(hour.temp_c - hour.dewpoint_c);
    if (dewDiff < 2) {
      score += 40;
      reasons.push("High fog/dew risk");
    } else if (dewDiff < 5) {
      score += 20;
      reasons.push("Moderate dew risk");
    }

    // Humidity
    if (hour.humidity > 80) {
      score += 20;
      reasons.push("High humidity");
    } else if (hour.humidity > 60) {
      score += 10;
      reasons.push("Moderate humidity");
    }

    // Precipitation
    if (hour.precip_mm > 0 || (hour.chance_of_rain ?? 0) > 30) {
      score += 50;
      reasons.push("Rain expected");
    }

    return { score: Math.min(score, 100), reasons };
  };

  const getAstroColor = (hour: any) => {
    const { score } = calculateAstroScore(hour);
    if (score <= 30) return "green";
    if (score <= 60) return "yellow";
    return "red";
  };

  const getAstroReason = (hour: any) => {
    const { reasons } = calculateAstroScore(hour);
    return reasons.join(", ");
  };

  // Current weather astro info
  const currentColor = getAstroColor(forecast.current);
  const currentReason = getAstroReason(forecast.current);

  return (
    <div className="weather-card">
      {/* Current weather */}
      <h2>
        Current Weather{" "}
        <span style={{ fontSize: "0.8rem", color: "#888" }}>
          (refresh in {formatCountdown(secondsLeft)})
        </span>
      </h2>
      <p>
        Location: {forecast.location.name}, {forecast.location.country}
      </p>
      <p>
        Temp: {forecast.current.temp_c}°C (feels like{" "}
        {forecast.current.feelslike_c}°C)
      </p>
      <p>Condition: {forecast.current.condition.text}</p>
      <p>
        Humidity: {forecast.current.humidity}% (dew{" "}
        {forecast.current.dewpoint_c ?? "–"}°C)
      </p>
      <p>Cloud: {forecast.current.cloud}%</p>
      <p>Visibility: {forecast.current.vis_km} km</p>
      <p>
        Wind: {forecast.current.wind_kph} kph (gust {forecast.current.gust_kph}{" "}
        kph)
      </p>
      <p style={{ fontWeight: "bold", color: currentColor }}>{currentReason}</p>

      {/* Next 10 hours scrollable section */}
      <h3>Next 10 Hours</h3>
      <div className="hours-scroll">
        {next10Hours.map((hour) => {
          const boxColor = getAstroColor(hour);
          const reason = getAstroReason(hour);
          return (
            <div
              className="hour-card"
              key={hour.time}
              style={{ borderLeft: `5px solid ${boxColor}` }}
            >
              <p>{formatTime(hour.time)}</p>
              <p>
                Temp: {hour.temp_c}°C (feels like {hour.feelslike_c}°C)
              </p>
              <p>Condition: {hour.condition.text}</p>
              <p>
                Humidity: {hour.humidity}% (dew {hour.dewpoint_c ?? "–"}°C)
              </p>
              <p>Cloud: {hour.cloud}%</p>
              <p>Visibility: {hour.vis_km} km</p>
              <p>
                Wind: {hour.wind_kph} kph (gust {hour.gust_kph} kph)
              </p>
              <p>
                Chance of Rain: {hour.chance_of_rain ?? 0}% | Chance of Snow:{" "}
                {hour.chance_of_snow ?? 0}%
              </p>
              <p style={{ fontWeight: "bold", color: boxColor }}>{reason}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
