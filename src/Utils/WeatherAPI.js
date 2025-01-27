import { processServerRequest } from "./Api.js";
import { weatherOptions } from "./Constants.js";

// const coordinates = ({ latitude, longitude });
const APIKey = "8948385378cb8d6c557940f79b21048f";
// const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=imperial&appid=${APIKey}`;

// export const getForecastWeather = () => {
//   const weatherApi = fetch(apiURL).then((res) => {
//     return processServerRequest(res);
//   });
//   return weatherApi;
// };

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

export const getForecastWeather = (latitude, longitude) => {
  return processServerRequest(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIKey}`
  )
  .then((data) => {
    const weatherCondition = data.weather[0].main.toLowerCase();
    changeVideoBackground(weatherCondition);
  })
  .catch((error) => {
    console.error('Failed to fetch weather data', error);
  });
};

export const changeVideoBackground = (weatherCondition) => {
  const videoElement = document.getElementById("background-video");
  let videoSource = "../Videos/Sunset-Train.mp4";

  switch (weatherCondition) {
    case "sunny":
      videoSource = "../Videos/Sunny-Day.mp4";
      break;
    case "rain":
      videoSource = "../Videos/Animated-Rain.mp4";
      break;
    case "snow":
      videoSource= "../Videos/Snow-Cabin.mp4";
      break;
    case "cloudy":
      videoSource= "../Videos/Cloudy-Sky.mp4";
      break;
    default:
      console.warn(`Unknown weather condition: ${WeatherCondition}`);
  }
if (videoElement) {
  videoElement.src = videoSource;
  videoElement.load();
  videoElement.play();
} else {
  console.error("Video element not found.");
};
  
};
