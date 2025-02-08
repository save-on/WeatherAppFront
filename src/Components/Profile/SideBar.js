import { useContext } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../Contexts/CurrentUserContext.js";
import defaultAvatar from "../../Images/default-avatar.jpg";

const SideBar = ({ onSignOut, onEditProfile }) => {
  const currentUser = useContext(CurrentUserContext);
  const userName = currentUser ? currentUser?.name : "No User";

  return (
    <div className="sidebar-container">
      <div className="profile__logo">
        <img
          className="profile__avatar-image"
          src={currentUser?.avatar || defaultAvatar}
          alt="Avatar"
        />
        <p className="profile__user-name">{userName}</p>
      </div>
      {currentUser && (
        <>
          <button
            className="sidebar__change_profile_data-button"
            onClick={onEditProfile}
          >
            Change Profile Data{" "}
          </button>
          <button className="sidebar__logout-button" onClick={onSignOut}>
            Log Out
          </button>
        </>
      )}
    </div>
  );
};

export default SideBar;
