"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentWeatherResponseSchema = exports.ForecastWeatherSchema = exports.DayForecastSchema = exports.LocationSchema = exports.CurrentWeatherSchema = exports.HourSchema = exports.ConditionSchema = void 0;
const zod_1 = require("zod");
// Reusable condition schema
exports.ConditionSchema = zod_1.z.object({
    text: zod_1.z.string(),
    icon: zod_1.z.string(),
    code: zod_1.z.number(),
});
// Hourly forecast
exports.HourSchema = zod_1.z.object({
    time_epoch: zod_1.z.number(),
    time: zod_1.z.string(),
    temp_c: zod_1.z.number(),
    temp_f: zod_1.z.number(),
    is_day: zod_1.z.number(),
    condition: exports.ConditionSchema,
    wind_mph: zod_1.z.number(),
    wind_kph: zod_1.z.number(),
    wind_degree: zod_1.z.number(),
    wind_dir: zod_1.z.string(),
    pressure_mb: zod_1.z.number(),
    pressure_in: zod_1.z.number(),
    precip_mm: zod_1.z.number(),
    precip_in: zod_1.z.number(),
    humidity: zod_1.z.number(),
    cloud: zod_1.z.number(),
    feelslike_c: zod_1.z.number(),
    feelslike_f: zod_1.z.number(),
    vis_km: zod_1.z.number(),
    vis_miles: zod_1.z.number(),
    uv: zod_1.z.number(),
    gust_mph: zod_1.z.number(),
    gust_kph: zod_1.z.number(),
    dewpoint_c: zod_1.z.number(),
    dewpoint_f: zod_1.z.number(),
    chance_of_rain: zod_1.z.number().optional(), // ✅ new
    chance_of_snow: zod_1.z.number().optional(), // ✅ new
});
// Current weather
exports.CurrentWeatherSchema = zod_1.z.object({
    last_updated_epoch: zod_1.z.number(),
    last_updated: zod_1.z.string(),
    temp_c: zod_1.z.number(),
    temp_f: zod_1.z.number(),
    is_day: zod_1.z.number(),
    condition: exports.ConditionSchema,
    wind_mph: zod_1.z.number(),
    wind_kph: zod_1.z.number(),
    wind_degree: zod_1.z.number(),
    wind_dir: zod_1.z.string(),
    pressure_mb: zod_1.z.number(),
    pressure_in: zod_1.z.number(),
    precip_mm: zod_1.z.number(),
    precip_in: zod_1.z.number(),
    humidity: zod_1.z.number(),
    cloud: zod_1.z.number(),
    feelslike_c: zod_1.z.number(),
    feelslike_f: zod_1.z.number(),
    vis_km: zod_1.z.number(),
    vis_miles: zod_1.z.number(),
    uv: zod_1.z.number(),
    gust_mph: zod_1.z.number(),
    gust_kph: zod_1.z.number(),
    dewpoint_c: zod_1.z.number(),
    dewpoint_f: zod_1.z.number(),
    chance_of_rain: zod_1.z.number().optional(), // ✅ new
    chance_of_snow: zod_1.z.number().optional(), // ✅ new
});
// Location
exports.LocationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    region: zod_1.z.string(),
    country: zod_1.z.string(),
    lat: zod_1.z.number(),
    lon: zod_1.z.number(),
    tz_id: zod_1.z.string(),
    localtime_epoch: zod_1.z.number(),
    localtime: zod_1.z.string(),
});
// Day forecast with hourly data
exports.DayForecastSchema = zod_1.z.object({
    date: zod_1.z.string(),
    date_epoch: zod_1.z.number(),
    day: zod_1.z.object({
        maxtemp_c: zod_1.z.number(),
        maxtemp_f: zod_1.z.number(),
        mintemp_c: zod_1.z.number(),
        mintemp_f: zod_1.z.number(),
        avgtemp_c: zod_1.z.number(),
        avgtemp_f: zod_1.z.number(),
        maxwind_mph: zod_1.z.number(),
        maxwind_kph: zod_1.z.number(),
        totalprecip_mm: zod_1.z.number(),
        totalprecip_in: zod_1.z.number(),
        avgvis_km: zod_1.z.number(),
        avgvis_miles: zod_1.z.number(),
        avghumidity: zod_1.z.number(),
        condition: exports.ConditionSchema,
        uv: zod_1.z.number(),
        daily_chance_of_rain: zod_1.z.number().optional(), // ✅ new
        daily_chance_of_snow: zod_1.z.number().optional(), // ✅ new
    }),
    astro: zod_1.z.object({
        sunrise: zod_1.z.string(),
        sunset: zod_1.z.string(),
        moonrise: zod_1.z.string(),
        moonset: zod_1.z.string(),
        moon_phase: zod_1.z.string(),
        moon_illumination: zod_1.z.preprocess((val) => String(val), zod_1.z.string()),
    }),
    hour: zod_1.z.array(exports.HourSchema),
});
// Forecast weather response
exports.ForecastWeatherSchema = zod_1.z.object({
    location: exports.LocationSchema,
    current: exports.CurrentWeatherSchema,
    forecast: zod_1.z.object({
        forecastday: zod_1.z.array(exports.DayForecastSchema),
    }),
});
// Current weather response
exports.CurrentWeatherResponseSchema = zod_1.z.object({
    location: exports.LocationSchema,
    current: exports.CurrentWeatherSchema,
});
