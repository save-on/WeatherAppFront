import { useContext } from "react";
import { Link } from "react-router";
import "./SideBar.css";
import CurrentUserContext from "../../Contexts/CurrentUserContext.js";
import defaultAvatar from "../../Images/default-avatar.jpg";
import { useNavigate } from "react-router";

const SideBar = ({ onSignOut, onEditProfile }) => {
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();
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
        <div className="sidebar__button-container">
          <button
            className="sidebar__change_profile_data-button"
            onClick={onEditProfile}
          >
            Change Profile Data{" "}
          </button>

          <Link to="packing-lists" className="sidebar__packing-lists__link">
          Packing Lists
          </Link>

          <button
            className="sidebar__change_profile_data-button"
            onClick={() => {
              navigate("/favorites");
            }}
          >
            Favorites{" "}
          </button>

          <button className="sidebar__logout-button" onClick={onSignOut}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default SideBar;
