import { processServerRequest } from "./Api.js";

const APIKey = "8948385378cb8d6c557940f79b21048f";

export const getForecastWeather = ({ latitude, longitude }) => {
  return processServerRequest(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIKey}`
  );
};

export const filterWeatherData = (data) => {
  const { name, main, weather, sys, timezone } = data;
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
  result.country = sys.country;
  result.timezone = timezone;
  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

export const getCurrentTime = (timezone, hours, minutes) => {
  let session;

  if (hours < 12) {
    session = "AM";
  } else {
    session = "PM";
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours > 12) {
    hours -= 12;
  }
  // if timezone then subtract or add
  return `${hours}:${minutes} ${session}`;
};
// got the hour get the rest of the time minutes and seconds
// get the timezone difference and subtract it from hours

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
