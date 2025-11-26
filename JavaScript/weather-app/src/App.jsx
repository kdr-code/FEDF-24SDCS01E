/*
Vite + React single-file example component: WeatherApp

Instructions (short):
1. Create project: npm create vite@latest weather-app -- --template react or use yarn/pnpm.
2. cd weather-app
3. npm install
4. Create a .env file in project root with:
   VITE_OPENWEATHER_API_KEY=your_openweather_api_key_here
   (Get an API key for free from https://openweathermap.org/)
5. Replace src/App.jsx with this component and run npm run dev.

Files used in this example:
- index.html (created by Vite)
- src/main.jsx (standard Vite React entry)
- src/App.jsx (replace with this file)
- src/index.css (optional styling)

This component demonstrates:
- fetch API with async/await
- error handling for network and bad input
- saving last searched city to localStorage and automatically loading it on page load
- simple, accessible UI
*/

import React, { useEffect, useState } from 'react';
import './App.css';

export default function App() {
  const [city, setCity] = useState('');
  const [queryCity, setQueryCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);

  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const kelvinToCelsius = (k) => Math.round(k - 273.15);

  async function fetchWeatherByCity(cityName) {
    if (!cityName) {
      setError('Please enter a city name.');
      return;
    }
    if (!apiKey) {
      setError('API key is missing.');
      return;
    }

    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}`;
      console.log(url);
      const res = await fetch(url);

      if (!res.ok) {
        if (res.status === 404)
           throw new Error('City not found. Check the spelling.');
        throw new Error(`Weather API error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();

      const simplified = {
        name: data.name,
        country: data.sys?.country,
        tempC: kelvinToCelsius(data.main.temp),
        feelsLikeC: kelvinToCelsius(data.main.feels_like),
        description: data.weather?.[0]?.description ?? 'N/A',
        humidity: data.main?.humidity,
        windSpeed: data.wind?.speed,
      };

      setWeather(simplified);
      setCity(simplified.name);

      localStorage.setItem('weather_last_city', simplified.name);
    } catch (err) {
      setError(err.message || 'Unknown error while fetching weather');
    } finally {
      setLoading(false);
    }
  }

  const handleFetch = () => {
    const trimmed = queryCity.trim();
    if (!trimmed) {
      setError('Please enter a city name.');
      return;
    }
    fetchWeatherByCity(trimmed);
  };

  useEffect(() => {
    const last = localStorage.getItem('weather_last_city');
    if (last) {
      setQueryCity(last);
      fetchWeatherByCity(last);
    }
  }, []);

  return (
    <div className="app-container">
      <h1 className="app-title">📡 Weather Finder</h1>
      <p className="app-subtitle">Enter a city name and press <strong>Get Weather</strong>.</p>

      <div className="input-section">
        <input
          aria-label="city-input"
          type="text"
          placeholder="e.g., Vijayawada or Guntur"
          value={queryCity}
          onChange={(e) => setQueryCity(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleFetch()}
          className="city-input"
        />
        <button onClick={handleFetch} disabled={loading} className="fetch-button">
          {loading ? 'Loading…' : 'Get Weather'}
        </button>
      </div>

      {error && <div role="alert" className="error-message">{error}</div>}

      {weather && (
        <section className="weather-card">
          <h2 className="weather-title">
            {weather.name}, {weather.country}
          </h2>
          <p className="weather-description">{weather.description}</p>
      	  <dl className="weather-details">
            <div>
              <dt>Temperature</dt>
              <dd>{weather.tempC}°C</dd>
            </div>

            <div>
              <dt>Feels like</dt>
              <dd>{weather.feelsLikeC}°C</dd>
            </div>

            <div>
              <dt>Humidity</dt>
              <dd>{weather.humidity}%</dd>
            </div>

            <div>
              <dt>Wind</dt>
              <dd>{weather.windSpeed} m/s</dd>
            </div>
          </dl>

          <div className="clear-section">
            <button
              onClick={() => {
                localStorage.removeItem('weather_last_city');
                setWeather(null);
                setCity('');
                setQueryCity('');
                setError(null);
              }}
              className="clear-button"
            >
              Clear
            </button>
          </div>
        </section>
      )}

      <footer className="app-footer">
        <div>Note: This example uses OpenWeatherMap's current weather endpoint. Set your API key in <code>.env</code>.</div>
      </footer>
    </div>
  );
}
