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

export const getCurrentTime = (timezone, timeRef) => {
  let session;

  const standardTimeMap = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  if (timezone) {
    const hourShift = timezone / 60 / 60;
    timeRef.hours += hourShift;

    if (timeRef.hours >= 24) {
      timeRef.hours -= 24;
    } else if (timeRef.hours < 0) {
      timeRef.hours += 24;
    }
  }

  if (timeRef.hours < 12 || timeRef.hours === 24) {
    session = "AM";
  } else {
    session = "PM";
  }

  const standardHour = standardTimeMap[timeRef.hours % 12];
  const minutes =
    timeRef.minutes < 10 ? `0${timeRef.minutes}` : timeRef.minutes;

  return `${standardHour}:${minutes} ${session}`;
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
