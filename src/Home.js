import React, { useState } from "react";
import "./style.css";
import axios from "axios";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const [data, setData] = useState({
    celsius: 8.07,
    name: "London",
    humidity: 91,
    speed: 4.12,
    image: "sunny",
  });
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleClick = () => {
    if (name !== "") {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=529d5a3956fc4473b67ad8d2d3c71d9c&units=metric`
        )
        .then((res) => {
          console.log(res.data.weather[0]);
          let imageIcon = "";
          if (res.data.weather[0].main === "Clouds") {
            imageIcon = "cloudy";
          } else if (res.data.weather[0].main === "Clear") {
            imageIcon = "sunny";
          } else if (res.data.weather[0].main === "Rain") {
            imageIcon = "rain";
          } else if (res.data.weather[0].main === "Drizzle") {
            imageIcon = "drizzle";
          } else if (res.data.weather[0].main === "Mist") {
            imageIcon = "mist";
          } else if (res.data.weather[0].main === "Haze") {
            imageIcon = "haze";
          } else if (res.data.weather[0].main === "Snow") {
            imageIcon = "snow";
          } else {
            imageIcon = "cloudy";
          }
          setData({
            ...data,
            celsius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image: imageIcon,
          });
          setError("");
        })
        .catch((err) => {
          if (err.response.status === 404) {
            setError("Invalid City Name");
          } else setError("");
          console.log(err);
        });
    }
  };
  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input
            type="text"
            placeholder="Enter City name"
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleClick} alt="">
            <img src={require("./Images/search.png")} alt="" />
          </button>
        </div>
        <div>
          <p>{error}</p>
        </div>
        <div className="winfo">
          <img src={require(`./Images/${data.image}.png`)} alt="" />

          <h1>{data.celsius}° C</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <img src={require("./Images/humidity.png")} alt="" />
              <div className="humidity">
                <p>{data.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src={require("./Images/wind.png")} alt="" />
              <div className="wind">
                <p>{data.speed} km/hr </p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
