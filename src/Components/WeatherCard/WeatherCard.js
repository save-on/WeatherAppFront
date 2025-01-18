import React, { useContext } from "react";
import "./WeatherCard.css";
import { weatherOptions } from "../../Utils/Constants.js";
import { CurrentTemperatureUnitContext } from "../../Contexts/CurrentTemperatureUnitContext.js";

const weatherCard = ({ day, type, weatherTemp = "" }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const weatherOption = weatherOptions.find((item) => {
    return item.day === day && item.type === type;
  });

  return (
    <section className="weather" id="weather">
      <div className="weather_info">
        {weatherTemp}° {currentTemperatureUnit}
      </div>
      {/* <img src={imageSrcUrl} className="weather_image" alt="weather"></img> */}
      {weatherOption.component}
    </section>
  );
};

export default weatherCard;
