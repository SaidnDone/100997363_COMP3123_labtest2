import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Toronto');

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ca0f0fbe6cfcc82515391780d2ed2c1a`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    fetchWeatherData();
  };

  const kelvinToCelsius = (kelvin) => {
    return Math.round(kelvin - 273.15);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter city"
              value={city}
              onChange={handleCityChange}
            />
            <button className="btn btn-primary" type="button" onClick={handleSearch}>
              Search
            </button>
          </div>
          {weatherData && (
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">{weatherData.name}</h2>
                <p className="card-text">Temperature: {kelvinToCelsius(weatherData.main.temp)} °C
                </p>
                <p className="card-text">Humidity: {weatherData.main.humidity}%</p>
                <p className="card-text">Air Pressure: {weatherData.main.pressure} hPa</p>
                <p className="card-text">
                    Min Temperature: {kelvinToCelsius(weatherData.main.temp_min)} °C
                </p>
                <p className="card-text">
                    Max Temperature: {kelvinToCelsius(weatherData.main.temp_max)} °C
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt="Weather Icon"
                  className="card-img-top"
                />
                <p className="card-text">Weather: {weatherData.weather[0].description}</p>
                <p className="card-text">Wind Speed: {weatherData.wind.speed} m/s</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
