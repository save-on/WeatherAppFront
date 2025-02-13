import "./Header.css";
import LogoImage from "../../Images/Logo.svg";
import TravelWearLogo from "../../Images/TravelWearLogo.PNG"
import CurrentUserContext from "../../Contexts/CurrentUserContext.js";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.js";
import { Link } from "react-router";
import { useContext } from "react";
import defaultAvatar from "../../Images/default-avatar.jpg";

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
}) => {
  const currentUser = useContext(CurrentUserContext);
  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <Link to="/">
            <img src={TravelWearLogo} alt="logo" className="header__logo-image" />
          </Link>
        </div>
        <div className="header__date">
          {currentDate} {weatherData.city}
        </div>
      </div>
      <div className="header__avatar-logo">
        <ToggleSwitch />
        {loggedIn ? (
          <div className="header__buttons">
            <button
              className="header__button"
              type="button"
              onClick={onCreateModal}
            >
              + Add Clothes
            </button>
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
            <button className="header__button" type="button" onClick={onLogin}>
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
