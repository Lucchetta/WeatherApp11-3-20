import React, { useState } from "react";
import axios from "axios";

export default function SearchEngine(props) {
  const [city, setCity] = useState("");
  const [result, setResult] = useState(false);
  const [weather, setWeather] = useState({});

  function showTemp(response) {
    setResult(true);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.main.speed,
      humidity: response.data.main.humidity,
      description: response.data.weather.description,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=87a4d33f9276aba60312862a75e60dce&units=metric`;
    axios.get(url).then(showTemp);
  }
  function updateCity(event) {
    setCity(event.target.value);
  }
  let form = (
    <form onSubmit={handleSubmit}>
      <input type="search" onChange={updateCity} placeholder="Enter a city" />
      <button type="submit">Search</button>
    </form>
  );

  if (result === true) {
    return (
      <div>
        {form}
        <ul>
          <li>Temerature: {Math.round(weather.temperature)}°C</li>
          <li>Wind speed: {weather.wind}km/h</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>
            {" "}
            <img src={weather.icon} alt="Weather Icon" />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
