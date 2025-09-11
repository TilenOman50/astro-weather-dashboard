import { z } from "zod";

// Reusable condition schema
export const ConditionSchema = z.object({
  text: z.string(),
  icon: z.string(),
  code: z.number(),
});

// Hourly forecast
export const HourSchema = z.object({
  time_epoch: z.number(),
  time: z.string(),
  temp_c: z.number(),
  temp_f: z.number(),
  is_day: z.number(),
  condition: ConditionSchema,
  wind_mph: z.number(),
  wind_kph: z.number(),
  wind_degree: z.number(),
  wind_dir: z.string(),
  pressure_mb: z.number(),
  pressure_in: z.number(),
  precip_mm: z.number(),
  precip_in: z.number(),
  humidity: z.number(),
  cloud: z.number(),
  feelslike_c: z.number(),
  feelslike_f: z.number(),
  vis_km: z.number(),
  vis_miles: z.number(),
  uv: z.number(),
  gust_mph: z.number(),
  gust_kph: z.number(),
  dewpoint_c: z.number(),
  dewpoint_f: z.number(),
});

// Current weather
export const CurrentWeatherSchema = z.object({
  last_updated_epoch: z.number(),
  last_updated: z.string(),
  temp_c: z.number(),
  temp_f: z.number(),
  is_day: z.number(),
  condition: ConditionSchema,
  wind_mph: z.number(),
  wind_kph: z.number(),
  wind_degree: z.number(),
  wind_dir: z.string(),
  pressure_mb: z.number(),
  pressure_in: z.number(),
  precip_mm: z.number(),
  precip_in: z.number(),
  humidity: z.number(),
  cloud: z.number(),
  feelslike_c: z.number(),
  feelslike_f: z.number(),
  vis_km: z.number(),
  vis_miles: z.number(),
  uv: z.number(),
  gust_mph: z.number(),
  gust_kph: z.number(),
  dewpoint_c: z.number(),
  dewpoint_f: z.number(),
});

// Location
export const LocationSchema = z.object({
  name: z.string(),
  region: z.string(),
  country: z.string(),
  lat: z.number(),
  lon: z.number(),
  tz_id: z.string(),
  localtime_epoch: z.number(),
  localtime: z.string(),
});

// Day forecast with hourly data
export const DayForecastSchema = z.object({
  date: z.string(),
  date_epoch: z.number(),
  day: z.object({
    maxtemp_c: z.number(),
    maxtemp_f: z.number(),
    mintemp_c: z.number(),
    mintemp_f: z.number(),
    avgtemp_c: z.number(),
    avgtemp_f: z.number(),
    maxwind_mph: z.number(),
    maxwind_kph: z.number(),
    totalprecip_mm: z.number(),
    totalprecip_in: z.number(),
    avgvis_km: z.number(),
    avgvis_miles: z.number(),
    avghumidity: z.number(),
    condition: ConditionSchema,
    uv: z.number(),
  }),
  astro: z.object({
    sunrise: z.string(),
    sunset: z.string(),
    moonrise: z.string(),
    moonset: z.string(),
    moon_phase: z.string(),
    moon_illumination: z.preprocess((val) => String(val), z.string()), // ✅ fix
  }),
  hour: z.array(HourSchema),
});

// Forecast weather response
export const ForecastWeatherSchema = z.object({
  location: LocationSchema,
  current: CurrentWeatherSchema,
  forecast: z.object({
    forecastday: z.array(DayForecastSchema),
  }),
});

// Current weather response
export const CurrentWeatherResponseSchema = z.object({
  location: LocationSchema,
  current: CurrentWeatherSchema,
});

// TypeScript types
export type CurrentWeatherResponse = z.infer<
  typeof CurrentWeatherResponseSchema
>;
export type ForecastWeatherResponse = z.infer<typeof ForecastWeatherSchema>;

export type Hour = z.infer<typeof HourSchema>;
export type DayForecast = z.infer<typeof DayForecastSchema>;
export type Location = z.infer<typeof LocationSchema>;
