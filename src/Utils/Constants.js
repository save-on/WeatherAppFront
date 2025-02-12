import { ReactComponent as SunnyDay } from "../Images/sunnyday.svg";
import { ReactComponent as CloudyDay } from "../Images/cloudyday.svg";
import { ReactComponent as CloudyNight } from "../Images/cloudynight.svg";
import { ReactComponent as FogDay } from "../Images/fogday.svg";
import { ReactComponent as FogNight } from "../Images/fognight.svg";
import { ReactComponent as RainDay } from "../Images/rainday.svg";
import { ReactComponent as RainNight } from "../Images/rainnight.svg";
import { ReactComponent as SnowDay } from "../Images/snowday.svg";
import { ReactComponent as SnowNight } from "../Images/snownight.svg";
import { ReactComponent as StormDay } from "../Images/stormday.svg";
import { ReactComponent as StormNight } from "../Images/stormnight.svg";
import { ReactComponent as Moon } from "../Images/moon.svg";

export const weatherOptions = [
  {
    component: <SunnyDay />,
    day: true,
    type: "clear",
  },
  {
    component: <CloudyDay />,
    day: true,
    type: "clouds",
  },
  {
    component: <FogDay />,
    day: true,
    type: "fog",
  },
  {
    component: <RainDay />,
    day: true,
    type: "rain",
  },
  {
    component: <SnowDay />,
    day: true,
    type: "snow",
  },
  {
    component: <StormDay />,
    day: true,
    type: "thunderstorm",
  },
  {
    component: <Moon />,
    day: false,
    type: "clear",
  },
  {
    component: <CloudyNight />,
    day: false,
    type: "clouds",
  },
  {
    component: <FogNight />,
    day: false,
    type: "fog",
  },
  {
    component: <RainNight />,
    day: false,
    type: "rain",
  },
  {
    component: <SnowNight />,
    day: false,
    type: "snow",
  },
  {
    component: <StormNight />,
    day: false,
    type: "thunderstorm",
  },
];
