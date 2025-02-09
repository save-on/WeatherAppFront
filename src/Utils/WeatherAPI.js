import { processServerRequest } from "./Api.js";

//Videos
import SunnyDay from "../Videos/Sunny-Day.mp4";
import Rain from "../Videos/Animated-Rain.mp4";
import Snow from "../Videos/Snow-Cabin.mp4";
import Clouds from "../Videos/Cloudy-Sky.mp4";
// import Storm from "../Videos/Storm.mp4";
// import Fog from "../Videos/Fog.mp4";
import DefaultVideo from "../Videos/Sunset-Train.mp4";

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
  result.type = setWeatherType(weather[0].main.toLowerCase());
  // result.condition = weather[0].main.toLowerCase();
  result.isDay = isDay(sys, Date.now());
  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

// const setWeatherType = (temp) => {
//   if (temp >= 86) {
//     return "hot";
//   } else if (temp < 86 && temp >= 66) {
//     return "warm";
//   } else {
//     return "cold";
//   }
// };

const setWeatherType = (condition) => {
  const weatherTypes = {
    clear: "clear",
    rain: "rain", 
    snow: "snow", 
    clouds: "clouds", 
    thunderstorm: "storm", 
    drizzle: "rain", 
    mist: "fog", 
    haze: "fog",
  };
  return weatherTypes[condition] || "default";
};

const tempConversion = (temp) => {
  return Math.round((temp - 32) * (5 / 9));
};

export const changeVideoBackground = (weatherCondition) => {
  const videoElement = document.getElementById("background-video");
  if (!videoElement) {
    console.error("Video element not found.");
    return;
  }

  const videoSources = {
    clear: SunnyDay,
    rain: Rain,
    snow: Snow,
    clouds: Clouds,
    // storm: Storm,
    // fog: Fog, 
    default: DefaultVideo,
  }

  const videoSource = videoSources[weatherCondition] || videoSources.default;
  
  videoElement.pause();
  videoElement.src = videoSource;
  videoElement.load();
  videoElement.play().catch((error) => {
    console.error("Playback Failed: ", error);
  });
};


