import { useContext, useEffect, useState } from "react";
import "./WeatherCard.css";
import { weatherOptions } from "../../Utils/Constants.js";
import { CurrentTemperatureUnitContext } from "../../Contexts/CurrentTemperatureUnitContext.js";

const WeatherCard = ({ weatherData, coords, handleBackgroundVideoChange }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const [filteredOption, setFilteredOption] = useState();

  const weatherOption = weatherOptions.find((item) => {
    return (
      item.day === weatherData?.isDay && item.type === weatherData?.condition
    );
  });

  useEffect(() => {
    if (weatherOption === undefined) {
      setFilteredOption(weatherOptions[0]);
      handleBackgroundVideoChange(weatherOptions[0]);
    } else {
      setFilteredOption(weatherOption);
      handleBackgroundVideoChange(weatherOption);
    }
  }, [weatherData]);
 

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
        alt={weatherOption?.type}
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
