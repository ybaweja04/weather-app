import React, { useState } from "react";
import "./Weather.css";

const api = {
  key: process.env.REACT_APP_WEATHER_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/",
};

const Weather = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then((response) => response.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const weatherClass = weather.weather?.[0]?.main.toLowerCase() || "default";

  return (
    <div className={`app ${weatherClass}`}>
      <div className="wholePage">
        <div className="welcome">
          <h1>CHECK THE WEATHERRRR!</h1>
        </div>
        <main>
          <div className="searchbox">
            <input
              type="text"
              placeholder="Search :)"
              className="searchBar"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={search}
            />
          </div>
          <div>
            {weather.name && (
              <>
                <div className="location-box">
                  <div className="location">
                    {weather.name}, {weather.sys?.country}
                  </div>
                  <div className="date">{dateBuilder(new Date())}</div>
                </div>
                <div className="weather-box">
                  <div className="temp">{Math.round(weather.main?.temp)}°C</div>
                  <div className="weather">
                    {weather.weather?.[0]?.main || "Loading..."}
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Weather;
