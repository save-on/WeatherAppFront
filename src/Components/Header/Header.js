import "./Header.css";
import TravelWearLogo from "../../Images/TravelWearLogo.PNG";
import CurrentUserContext from "../../Contexts/CurrentUserContext.js";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.js";
import { Link, useLocation } from "react-router";
import { useContext, useEffect, useRef, useState } from "react";
import defaultAvatar from "../../Images/default-avatar.jpg";
import { getCurrentTime } from "../../Utils/WeatherAPI.js";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

const Header = ({
  onCreateModal,
  weatherData,
  loggedIn,
  onRegister,
  onLogin,
  locationData,
  searchedCity,
  savedCity,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation().pathname;
  const timeRef = useRef({});
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      timeRef.current = new Date();
      timeRef.hours = timeRef.current.getUTCHours();
      timeRef.minutes = timeRef.current.getUTCMinutes();
      const time = getCurrentTime(searchedCity.timezone, timeRef);
      setCurrentTime(time);
    }, 1000);

    return () => clearInterval(interval);
  }, [searchedCity]);

  if (location)
    return (
      <header className="header">
        <div className="header__logo">
          <div>
            <img
              src={TravelWearLogo}
              alt="logo"
              className="header__logo-image"
            />
          </div>
          {location !== "/search/result" && (
            <p className="header__date">
              {currentDate} {weatherData.city}
            </p>
          )}
          {location === "/search/result" && (
            <>
              <p className="header__date">
                {`${savedCity.name}, ${searchedCity.country}`}
              </p>
              <p className="header__time">{currentTime}</p>
            </>
          )}
        </div>
        <div className="header__avatar-logo">
          {locationData.locationAccess && <ToggleSwitch />}
          {loggedIn ? (
            <div className="header__buttons">
              {location !== "/search/result" && (
                <button
                  className="header__button"
                  type="button"
                  onClick={onCreateModal}
                >
                  + Add Clothes
                </button>
              )}
              <Link to="/profile" className="header__name">
                {currentUser?.name || "Your Name"}
              </Link>
              <img
                className="header__avatar-image"
                src={currentUser?.avatar || defaultAvatar}
                alt="avatar"
              />
            </div>
          ) : (
            <div>
              <button
                className="header__button"
                type="button"
                onClick={onRegister}
              >
                Sign Up
              </button>
              <button
                className="header__button"
                type="button"
                onClick={onLogin}
              >
                Log In
              </button>
            </div>
          )}
        </div>
      </header>
    );
};

export default Header;
