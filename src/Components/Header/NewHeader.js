import AvatarDefault from "../../Images/profile_default.svg";
import AvatarHover from "../../Images/avatar-hover.svg";
import AvatarSelected from "../../Images/avatar-selected.svg";
import AvatarLoggedIn from "../../Images/avatar-loggedin.svg";
import "./NewHeader.css";
import { Link } from "react-router";
import { useContext, useState } from "react";
import HeaderDropbox from "../HeaderDropbox/HeaderDropbox.jsx";
import TripsDropbox from "../TripsDropBox/TripsDropbox.jsx";
import CurrentUserContext from "../../Contexts/CurrentUserContext.js";
import "../App/App.css";

function NewHeader({
  onRegister,
  onLogin,
  loggedIn,
  isLoading,
  activeModal,
  handleCloseModal,
  handleOpenDropbox,
  handleOpenTripDropbox,
  handleOpenAddTripModal,
  onSignOut,
  customStyle,
  userTrips,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [isSelected, setIsSelected] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isAvatarSelected = activeModal === "dropbox";

  const getAvatarSrc = () => {
    if (isAvatarSelected) {
      return AvatarSelected;
    }
    if (isHovered) {
      return AvatarHover;
    }
    return loggedIn ? currentUser.avatar || AvatarLoggedIn : AvatarDefault;
  };

  return (
    <div className={`newHeader ${customStyle}`}>
      <Link to="/" className={`newHeader__title-link ${customStyle}`}>
        <p className={`newHeader__title ${customStyle}`}>Packly</p>
      </Link>
      <div className="newHeader__profile">
        {loggedIn ? (
          <div className="newHeader__profile">
            <p
              className="newHeader__profile-myTrips-link"
              onClick={handleOpenTripDropbox}
            >
              My Trips
            </p>
            <TripsDropbox
              isOpened={activeModal === "tripdropbox"}
              handleCloseModal={handleCloseModal}
              loggedIn={loggedIn}
              userTrips={userTrips}
              handleOpenAddTripModal={handleOpenAddTripModal}
            />

            <img
              className="newHeader__avatar_image"
              src={currentUser.avatar || AvatarLoggedIn}
              alt={`${currentUser.name}'s avatar`}
              onClick={handleOpenDropbox}
            />
       
            <HeaderDropbox
              isOpened={activeModal === "dropbox"}
              handleCloseModal={handleCloseModal}
              onSignOut={onSignOut}
              loggedIn={loggedIn}
            />
          </div>
        ) : (
          <div className="newHeader__profile">
            <button className="newHeader__signUp_button" onClick={onRegister}>
              <p className="newHeader__signUp_button-text">Sign Up For Free</p>
            </button>
            {/* <img
              className="newHeader__avatar_image"
              src={AvatarDefault}
              alt="Avatar Default"
              onClick={handleOpenDropbox}
            /> */}
                 <button
              className={`newHeader__avatar-button ${
                isAvatarSelected ? "selected" : ""
              }`}
              onClick={handleOpenDropbox}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              type="button" // Important for buttons not submitting forms
              aria-pressed={isAvatarSelected} // Good for accessibility
              aria-label="User Profile"
            >
              <img
                className="newHeader__avatar_image"
                src={getAvatarSrc()}
                alt={
                  loggedIn ? `${currentUser.name}'s avatar` : "Avatar Default"
                }
              />
            </button>
            <HeaderDropbox
              isOpened={activeModal === "dropbox"}
              handleCloseModal={handleCloseModal}
              onRegister={onRegister}
              onLogin={onLogin}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default NewHeader;
