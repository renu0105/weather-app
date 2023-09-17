import "./App.css";
import search_icon from "../src/1024px-Search_Icon.png";
import weather_icon from "../src/weather-icon.png";
import { useState } from "react";

function App() {
  const [weather, setWeather] = useState({});

  const [input, setInput] = useState("");
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = () => {
    fetchWeather(input);
  };

  const fetchWeather = async (inp) => {
    try {
      const apiKey = "abf1f9d96ab1f63b68deb2218fddde11";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${inp}&appid=${apiKey}`
      );

      if (!response.ok) {
        alert("Network response was not ok");
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="container">
      <div className="input-container">
        <input
          type="text"
          placeholder="search the placename"
          onChange={handleChange}
          value={input}
        />
        <img
          onClick={handleClick}
          className="search-icon"
          src={search_icon}
          alt="search"
        ></img>
      </div>

      <div className="weather-app">
        <img className="weather-icon" src={weather_icon} alt="weather"></img>
      </div>

      {weather.main && (
        <div className="weather-name">
          <h2>
            Weather in {weather.name}, {weather.sys.country}
          </h2>
          <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)}°c</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
