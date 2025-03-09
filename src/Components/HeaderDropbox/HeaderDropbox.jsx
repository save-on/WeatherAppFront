import { useContext, useEffect, useRef } from "react";
import "./HeaderDropbox.css";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import defaultAvatar from "../../Images/default-avatar.jpg";
import { useNavigate } from "react-router";

const HeaderDropbox = ({ isOpened, handleCloseModal, onSignOut }) => {
  const currentUser = useContext(CurrentUserContext);
  const dropboxRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpened) return;

    const handleClickOutside = (e) => {
      if (dropboxRef.current && !dropboxRef.current.contains(e.target)) {
        handleCloseModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpened, handleCloseModal]);

  return (
    <ul
      className={`headerdropbox ${isOpened && "headerdropbox_visible"}`}
      ref={dropboxRef}
    >
      <li className="headerdropbox__user-info">
        <img
          className="headerdropbox__user-avatar"
          src={currentUser?.avatar || defaultAvatar}
          alt=""
        />
        <div className="headerdropbox__user">
          <p className="headerdropbox__user-name">{currentUser.name}</p>
          <button
            className="headerdropbox__profile-button"
            type="button"
            onClick={() => {
              navigate("/profile");
              handleCloseModal();
            }}
          >
            View profile
          </button>
        </div>
      </li>
      <ul className="headerdropbox__list">
        <li className="headerdropbox__list-item">
          <button className="headerdropbox__button" type="button">
            favorites
          </button>
        </li>
        <li className="headerdropbox__list-item">
          <button className="headerdropbox__button" type="button">
            packing lists
          </button>
        </li>
      </ul>
      <li className="headerdropbox__signout">
        <button
          className="headerdropbox__signout-button"
          type="button"
          onClick={() => {
            onSignOut();
            handleCloseModal();
          }}
        >
          Sign out
        </button>
      </li>
    </ul>
  );
};

export default HeaderDropbox;
