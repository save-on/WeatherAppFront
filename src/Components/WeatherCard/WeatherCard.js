import { useContext } from "react";
import "./WeatherCard.css";
import { weatherOptions } from "../../Utils/Constants.js";
import { CurrentTemperatureUnitContext } from "../../Contexts/CurrentTemperatureUnitContext.js";

const WeatherCard = ({ weatherData, coords }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const weatherOption = weatherOptions.find((item) => {
    return (
      item.day === weatherData.isDay && item.type === weatherData.condition
    );
  });

  let filteredOption;

  weatherOption === undefined
    ? (filteredOption = weatherOptions[weatherData.isDay ? "day" : "night"])
    : (filteredOption = weatherOption);

  return (
    <section className="weather" id="weather">
      <div className="weather_info">
        {currentTemperatureUnit === "F"
          ? weatherData.temp[currentTemperatureUnit]
          : weatherData.temp[currentTemperatureUnit]}
      </div>
      <img
        src={weatherOption?.url}
        className="weather_image"
        alt={weatherOption?.condition}
      ></img>
      {coords === null
        ? weatherOptions[0].component
        : filteredOption?.component === undefined
        ? weatherOptions[0].component
        : filteredOption?.component}
    </section>
  );
};

export default WeatherCard;
