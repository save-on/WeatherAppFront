import AvatarDefault from "../../Images/profile_default.svg";
import "./NewHeader.css";
import { Link } from "react-router";
import HeaderDropbox from "../HeaderDropbox/HeaderDropbox.jsx";

function NewHeader({
  onRegister,
  loggedIn,
  isLoading,
  activeModal,
  handleCloseModal,
  handleOpenDropbox,
  onSignOut,
}) {
  return (
    <div className="newHeader">
      <p className="newHeader__title">Packly</p>
      <div className="newHeader__profile">
        {loggedIn ? (
          <div className="newHeader__profile">
            <Link to="/profile">
                <p>My Trips</p>
                </Link>
            <img
              className="newHeader__avatar_image"
              src={AvatarDefault}
              alt="avatar"
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
