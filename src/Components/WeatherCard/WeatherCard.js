import { useContext, useEffect, useState } from "react";
import "./WeatherCard.css";
import { weatherOptions } from "../../Utils/Constants.js";
import { CurrentTemperatureUnitContext } from "../../Contexts/CurrentTemperatureUnitContext.js";

const WeatherCard = ({ weatherData, handleBackgroundVideoChange }) => {
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
        {weatherData?.temp !== undefined
          ? currentTemperatureUnit === "F"
            ? weatherData.temp[currentTemperatureUnit]
            : weatherData.temp[currentTemperatureUnit]
          : null}
      </div>
      {weatherData.coord === null
        ? weatherOptions[0].component
        : filteredOption?.component === undefined
        ? weatherOptions[0].component
        : filteredOption?.component}
    </section>
  );
};

export default WeatherCard;
