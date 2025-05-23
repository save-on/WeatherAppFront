import { useContext, useEffect, useRef } from "react";
import "./HeaderDropbox.css";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import defaultAvatar from "../../Images/default-avatar.jpg";
import { useNavigate } from "react-router";

const HeaderDropbox = ({
  isOpened,
  handleCloseModal,
  onSignOut,
  loggedIn,
  onLogin,
  onRegister,
}) => {
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
      <ul className="headerdropbox__list">
        {loggedIn ? (
          <>
            <li className="headerdropbox__list-item">
              <button
                className="headerdropbox__button"
                type="button"              >
                My profile
              </button>
            </li>
              <li className="headerdropbox__list-item">
              <button className="headerdropbox__button"
              type="button">
                Settings
              </button>
            </li>
            <li className="headerdropbox__list-item">
              <button
                className="headerdropbox__button"
                type="button"
                onClick={onSignOut}
              >
                Sign Out
              </button>
            </li>
          
          </>
        ) : (
          <>
            <li className="headerdropbox__list-item">
              <button
                className="headerdropbox__button"
                type="button"
                onClick={onLogin}
              >
                Login
              </button>
            </li>
            <li className="headerdropbox__list-item">
              <button
                className="headerdropbox__button"
                type="button"
                onClick={onRegister}
              >
                Sign Up
              </button>
            </li>
          </>
        )}
      </ul>
    </ul>
  );
};

export default HeaderDropbox;
