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
    url: new URL("../Images/sunnyday.svg", import.meta.url),
    day: true,
    type: "sunny",
  },
  {
    url: new URL("../Images/cloudyday.svg", import.meta.url),
    day: true,
    type: "cloudy",
  },
  {
    url: new URL("../Images/fogday.svg", import.meta.url),
    day: true,
    type: "fog",
  },
  {
    url: new URL("../Images/rainday.svg", import.meta.url),
    day: true,
    type: "rain",
  },
  {
    url: new URL("../Images/snowday.svg", import.meta.url),
    day: true,
    type: "snow",
  },
  {
    url: new URL("../Images/stormday.svg", import.meta.url),
    day: true,
    type: "storm",
  },
  {
    url: new URL("../Images/moon.svg", import.meta.url),
    day: false,
    type: "moon",
  },
  {
    url: new URL("../Images/cloudynight.svg", import.meta.url),
    day: false,
    type: "cloudynight",
  },
  {
    url: new URL("../Images/fognight.svg", import.meta.url),
    day: false,
    type: "fognight",
  },
  {
    url: new URL("../Images/rainnight.svg", import.meta.url),
    day: false,
    type: "rainnight",
  },
  {
    url: new URL("../Images/snownight.svg", import.meta.url),
    day: false,
    type: "snownight",
  },
  {
    url: new URL("../Images/stormnight.svg", import.meta.url),
    day: false,
    type: "stormnight",
  },
];
