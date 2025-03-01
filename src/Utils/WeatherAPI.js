import { processServerRequest } from "./Api.js";

const APIKey = "8948385378cb8d6c557940f79b21048f";

export const getForecastWeather = ({ latitude, longitude }) => {
  return processServerRequest(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIKey}`
  );
};

export const filterWeatherData = (data) => {
  const { name, main, weather, sys } = data;
  const result = {};
  result.city = name;
  result.temp = {
    F: `${Math.round(main.temp)}°F`,
    C: `${tempConversion(main.temp)}°C`,
  };
  result.type = setWeatherType(main.temp);
  result.condition = weather[0].main.toLowerCase();
  result.isDay = isDay(sys, Date.now());
  result.coord = data.coord;
  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

const setWeatherType = (temp) => {
  if (temp >= 86) {
    return "hot";
  } else if (temp < 86 && temp >= 66) {
    return "warm";
  } else {
    return "cold";
  }
};

const tempConversion = (temp) => {
  return Math.round((temp - 32) * (5 / 9));
};
