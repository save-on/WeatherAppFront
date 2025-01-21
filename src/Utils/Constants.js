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


export const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  },
  {
    _id: 5,
    name: "Winter coat",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
];

export const weatherOptions = [
  {
    component: <SunnyDay />,
    day: true,
    type: "sunny",
  },
  {
    component: <CloudyDay />,
    day: true,
    type: "cloudy",
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
    type: "storm",
  },
  {
    component: <Moon />,
    day: false,
    type: "moon",
  },
  {
    component:<CloudyNight/>,
    day: false,
    type: "cloudynight",
  },
  {
    component: <FogNight />,
    day: false,
    type: "fognight",
  },
  {
    component: <RainNight />,
    day: false,
    type: "rainnight",
  },
  {
    component: <SnowNight />,
    day: false,
    type: "snownight",
  },
  {
    component: <StormNight />,
    day: false,
    type: "stormnight",
  },
];

