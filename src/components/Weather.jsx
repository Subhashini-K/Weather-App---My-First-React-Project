import React, { useEffect, useState, useRef } from "react";
import "./Weather.css";
import search_icon from "../assets/images/search.png";
import cloudy_icon from "../assets/images/cloudy.png";
import humidity_icon from "../assets/images/humidity.png";
import wind_icon from "../assets/images/wind.png";
import clearSky_icon from "../assets/images/clear-sky.png";
import drizzle_icon from "../assets/images/drizzle.png";
import rainy_icon from "../assets/images/rainy.png";
import sun_icon from "../assets/images/sun.png";
import snow_icon from "../assets/images/snowflake.png";

const Weather = () => {
  const weathericons = {
    "01d": sun_icon,
    "01n": sun_icon,
    "02d": clearSky_icon,
    "02n": clearSky_icon,
    "03d": cloudy_icon,
    "03n": cloudy_icon,
    "04d": cloudy_icon,
    "04n": cloudy_icon,
    "09d": drizzle_icon,
    "09n": drizzle_icon,
    "10d": rainy_icon,
    "10n": rainy_icon,
    "11d": rainy_icon,
    "11n": rainy_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);
  const search = async (city) => {
    if (city === "") {
      alert("Please enter a city name!");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = weathericons[data.weather[0].icon] || clearSky_icon;
      setWeatherData({
        humidity: data.main.humidity,
        temperature: Math.floor(data.main.temp),
        wind_speed: data.wind.speed,
        city: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      alert("City not found");
    }
  };

  // useEffect(()=>{
  //     search("Mumbai")
  // },[])

  return (
    <div className="weather-container">
      <div className="input-container">
        <div className="input">
          <input ref={inputRef} type="text" placeholder="Search"></input>
        </div>
        <div className="search">
          <img
            src={search_icon}
            alt="search"
            onClick={() => {
              search(inputRef.current.value);
            }}
            height="25px"
            width="25px"
          />
        </div>
      </div>

      {weatherData ? (
        <>
          <div className="weather-image">
            <img src={weatherData.icon} alt="cloudy" width="200px" />
          </div>
          <div className="temperature">
            <h1>{weatherData.temperature}°C</h1>
          </div>
          <div className="location">
            <h1>{weatherData.city}</h1>
          </div>
          <div className="coords">
            <div className="humidity">
              <div className="humidity-logo">
                <img
                  src={humidity_icon}
                  alt="humidity"
                  height="50px"
                  width="50px"
                />
              </div>
              <div className="humidity-description">
                <h3>{weatherData.humidity}%</h3>
                <h3>Humidity</h3>
              </div>
            </div>
            <div className="wind-speed">
              <div className="wind-logo">
                <img
                  src={wind_icon}
                  alt="wind speed"
                  height="50px"
                  width="50px"
                />
              </div>
              <div className="wind-description">
                <h3>{weatherData.wind_speed} km/h</h3>
                <h3>Wind Speed</h3>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
