import { processServerResponse } from "./Api.js";

const coordinates = { latitude: 38.8816, longitude: -77.091 };
const APIKey = "8948385378cb8d6c557940f79b21048f";
const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=imperial&appid=${APIKey}`;

export const getForecastWeather = () => {
  const weatherApi = fetch(apiURL).then((res) => {
    return processServerResponse(res);
  });

  return weatherApi;
};

export const parseWeatherData = (data) => {
  const main = data.main;
  const temperature = main && main.temp;
  const weather = {
    temperature: {
      F: Math.round(temperature),
      C: Math.round(((temperature - 32) * 5) / 9),
    },
  };
  return weather;
};
