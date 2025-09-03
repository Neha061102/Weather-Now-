import React, { useState } from 'react';
import './card.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import thunder_icon from '../assets/thunder.png';
import fog_icon from '../assets/fog.png';

const Card = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    if (!city) return;

    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        alert("City not found");
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      const weatherRes = await fetch(
  `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m`
);
const weatherData = await weatherRes.json();

setWeather({
  city: name,
  country,
  temp: weatherData.current_weather.temperature,
  wind: weatherData.current_weather.windspeed,
  humidity: weatherData.hourly.relativehumidity_2m[0], 
  code: weatherData.current_weather.weathercode,
});

    } catch (error) {
      console.error(error);
      alert("Error fetching weather");
    }
  };

  const getWeatherIcon = (code) => {
  if (code === 0) return clear_icon; // Clear
  if ([1, 2, 3].includes(code)) return cloud_icon; // Cloudy
  if ([45, 48].includes(code)) return fog_icon; // Fog/Mist
  if ([51, 53, 55].includes(code)) return drizzle_icon; // Drizzle
  if ([61, 63, 65, 80, 81, 82].includes(code)) return rain_icon; // Rain & Showers
  if ([66, 67].includes(code)) return rain_icon; // Freezing rain
  if ([71, 73, 75, 77, 85, 86].includes(code)) return snow_icon; // Snow
  if ([95, 96, 99].includes(code)) return thunder_icon; // Thunderstorms
  return clear_icon; // Default
};


  return (
    <div className='card'>
      {/* Search */}
      <div className='search'>
        <input
          type='text'
          placeholder='Search City'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <img src={search_icon} alt="" onClick={getWeather} style={{cursor: "pointer"}} />
      </div>

      {/* Weather Info */}
      {weather ? (
        <>
          <img src={getWeatherIcon(weather.code)} alt="" className='weather-icon' />
          <p className='temp'>{weather.temp}°C</p>
          <p className='loc'>{weather.city}, {weather.country}</p>
          <div className='weath-data'>
            <div className='col'>
              <img src={humidity_icon} alt="" />
              <div>
                <p>{weather.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className='col'>
              <img src={wind_icon} alt="" />
              <div>
                <p>{weather.wind} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p style={{marginTop: "20px"}}>Enter a city to see weather</p>
      )}
    </div>
  );
};

export default Card;
