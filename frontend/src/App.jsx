import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!country.trim()) {
      setError("Please enter a city name");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=1259e663983344aba4b41734263108&q=${country}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "City not found");
      }

      setWeather(data);
    } catch (err) {
      setWeather(null);
      setError(err.message);
    } finally {
      setLoading(false);   
    }
  };

  return (
    <div className="app">
      {/* Search Section */}
      <form className="search-box" onSubmit={onSubmitHandler}>
        <input
          type="text"
          placeholder="Search city..."
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

        <button type="submit">
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {/* Weather Card */}
      {weather && (
        <div className="weather-card">
          {/* Header */}

          <div className="header">
            <div>
              <p className="small-text">Current Location</p>

              <h2>{weather.location.name}</h2>

              <p className="country">
                {weather.location.region}, {weather.location.country}
              </p>
            </div>

            <p className="time">
              {weather.location.localtime}
            </p>
          </div>

          {/* Main Weather */}

          <div className="main-weather">
            <img
              src={`https:${weather.current.condition.icon}`}
              alt={weather.current.condition.text}
            />

            <div className="temperature-section">
              <h1>{weather.current.temp_c}°</h1>

              <p className="condition">
                {weather.current.condition.text}
              </p>

              <p className="feels">
                Feels like {weather.current.feelslike_c}°
              </p>
            </div>
          </div>

          {/* Weather Info Cards */}

          <div className="weather-info">
            <div className="info-card">
              <span>💧</span>

              <p>Humidity</p>

              <h3>{weather.current.humidity}%</h3>
            </div>

            <div className="info-card">
              <span>💨</span>

              <p>Wind</p>

              <h3>{weather.current.wind_kph}</h3>

              <small>km/h</small>
            </div>

            <div className="info-card">
              <span>👁</span>

              <p>Visibility</p>

              <h3>{weather.current.vis_km}</h3>

              <small>km</small>
            </div>

            <div className="info-card">
              <span>🌡</span>

              <p>Pressure</p>

              <h3>{weather.current.pressure_mb}</h3>

              <small>mb</small>
            </div>
          </div>

          {/* Bottom Info */}

          <div className="bottom-info">
            <div>
              <p>UV Index</p>
              <h3>{weather.current.uv}</h3>
            </div>

            <div>
              <p>Cloud</p>
              <h3>{weather.current.cloud}%</h3>
            </div>

            <div>
              <p>Wind Direction</p>
              <h3>{weather.current.wind_dir}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;