import AvatarDefault from "../../Images/profile_default.svg";
import "./NewHeader.css";
import { Link } from "react-router";
import { useContext } from "react";
import HeaderDropbox from "../HeaderDropbox/HeaderDropbox.jsx";
import CurrentUserContext from "../../Contexts/CurrentUserContext.js";

function NewHeader({
  onRegister,
  loggedIn,
  isLoading,
  activeModal,
  handleCloseModal,
  handleOpenDropbox,
  onSignOut,
}) {
    const currentUser = useContext(CurrentUserContext);

  return (
    <div className="newHeader">
        <Link to="/" className="newHeader__title-link">
        <p className="newHeader__title">Packly</p>
        </Link>
      <div className="newHeader__profile">
        {loggedIn ? (
          <div className="newHeader__profile">
            <Link className="newHeader__profile-myTrips-link" to="/profile">
                <p>My Trips</p>
                </Link>
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
            />
          </div>
        ) : (
          <div className="newHeader__profile">
            <button className="newHeader__signUp_button" onClick={onRegister}>
              <p className="newHeader__signUp_button-text">Sign Up For Free</p>
            </button>
            <img className="newHeader__avatar_image" src={AvatarDefault} />
          </div>
        )}
      </div>
    </div>
  );
}

export default NewHeader;
