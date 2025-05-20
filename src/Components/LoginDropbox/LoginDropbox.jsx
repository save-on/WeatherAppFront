import { useContext, useEffect, useRef } from "react";
import "./LoginDropbox.css";
import AvatarDefault from "../../Images/profile_default.svg";

const LoginDropbox = ({ isOpened, handleCloseModal, onRegister, onLogin }) => {
  const dropboxRef = useRef(null);

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
    <div className="loginDropbox__container">
    <ul
      className={`logindropbox ${isOpened && "logindropbox__container_visible"}`}
      ref={dropboxRef}
    >
      
        <button className="loginDropbox__button" onClick={onLogin}>
          Login
        </button>
        <button className="loginDropbox__button" onClick={onRegister}>
          Sign Up
        </button>
     
    </ul>
    </div>

  );
};

export default LoginDropbox;
