import "./Header.css";
import TravelWearLogo from "../../Images/TravelWearLogo.PNG";
import CurrentUserContext from "../../Contexts/CurrentUserContext.js";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.js";
import { Link, useLocation } from "react-router";
import { useContext, useEffect, useRef, useState } from "react";
import defaultAvatar from "../../Images/default-avatar.jpg";
import { getCurrentTime } from "../../Utils/WeatherAPI.js";
import HeaderDropbox from "../HeaderDropbox/HeaderDropbox.jsx";

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
  handleOpenDropbox,
  activeModal,
  handleCloseModal,
  onSignOut,
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
            <Link to="/">
            
            <img
              src={TravelWearLogo}
              alt="logo"
              className="header__logo-image"
            />
            </Link>
            <p className="header__logo-name">Packly</p>
          </div>
          {location !== "/search/result" &&
            location !== "/profile" &&
            location !== "/favorites" && (
              <p className="header__date">
                {currentDate} {weatherData.city}
              </p>
            )}
          {location === "/search/result" && searchedCity.country && (
            <>
              <p className="header__date">
                {`${savedCity.name}, ${searchedCity.country}`}
              </p>
              <p className="header__time">{currentTime}</p>
            </>
          )}
        </div>
        <div className="header__avatar-logo">
          {locationData.locationAccess &&
            location !== "/profile" &&
            location !== "/favorites" && <ToggleSwitch />}
          {loggedIn ? (
            <div className="header__buttons">
              {location !== "/search/result" &&
                location !== "/favorites" &&
                location !== "/profile" && (
                  <button
                    className="header__button"
                    type="button"
                    onClick={onCreateModal}
                  >
                    + Add Clothes
                  </button>
                )}
              <img
                className="header__avatar-image"
                src={currentUser.avatar || defaultAvatar}
                alt={`${currentUser.name}'s avatar`}
                onClick={handleOpenDropbox}
              />
              <HeaderDropbox
                isOpened={activeModal === "dropbox"}
                handleCloseModal={handleCloseModal}
                onSignOut={onSignOut}
              />
            </div>
          ) : (
            <div>
              <button
                className="header__button"
                type="button"
                onClick={onRegister}
              >
                Sign Up For Free
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
