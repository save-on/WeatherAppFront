import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Fottoer/Footer";
import Profile from "../Profile/Profile.js";

//Context imports
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

//React imports
import { useEffect, useState } from "freact";
import { Switch, Route, useHistory } from "react-router-dom";

//Utility imports
import { getForcastWeather, parseWeatherData } from "../../utils/WeatherAPI.js";

import {
  getItems,
  postItems,
  deleteItems,
  addCardLike,
  removeCardLike,
} from "../../utils/Api.js";

import {
    login, 
    update,
    register,
    checkToken,
    getUserData,
} from "../../utils/auth.js";

//Modal imports
