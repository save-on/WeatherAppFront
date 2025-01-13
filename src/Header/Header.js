import "./Header.css";
import logoImage from "../../images/Logo.svg";
import avatarImage from "../../images/avatar.svg";
import { CurrentUserContext } from "../../contexts'CurrentUserContext";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

const Header = ({ onCreateModal, city, loggedIn, onRegister, onLogin }) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <Link to="/">
            <img scr={logoImage} alt="logo" />
          </Link>
        </div>
        <div className="header__date">
          {currentDate}, {city}
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
              src={currentUser?.avatar} // logics of image change is here
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
