import AvatarDefault from "../../Images/profile_default.svg";
import "./NewHeader.css";
import { Link } from "react-router";
import { useContext } from "react";
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
  onSignOut,
  customStyle,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className={`newHeader ${customStyle}`}>
      <Link to="/" className={`newHeader__title-link ${customStyle}`}>
        <p className={`newHeader__title ${customStyle}`}>Packly</p>
      </Link>
      <div className="newHeader__profile">
        {loggedIn ? (
          <div className="newHeader__profile">
            {/* <Link className="newHeader__profile-myTrips-link" to="/mytrips">
              <p>My Trips</p>
            </Link> */}
            <p
              className="newHeader__profile-myTrips-link"
              onClick={handleOpenTripDropbox}
            >
              MyTrips
            </p>
            <TripsDropbox
              isOpened={activeModal === "tripdropbox"}
              handleCloseModal={handleCloseModal}
              loggeIn={loggedIn}
            />

            <img
              className="newHeader__avatar_image"
              src={currentUser.avatar || AvatarDefault}
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
            <img
              className="newHeader__avatar_image"
              src={AvatarDefault}
              alt="Avatar Default"
              onClick={handleOpenDropbox}
            />
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
