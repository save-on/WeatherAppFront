import { useContext, useEffect, useRef } from "react";
import "./TripsDropbox.css";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import { useNavigate } from "react-router";

const TripsDropbox = ({ isOpened, handleCloseModal }) => {
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
      className={`tripdropbox ${isOpened && "tripdropbox_visible"}`}
      ref={dropboxRef}
    >
      <ul className="tripdropbox__list">
        <li className="tripdropbox__list-item">
          <button className="tripdropbox__button" type="button">
            CapeCode
          </button>
        </li>
        <li className="tripdropbox__list-item">
          <button className="tripdropbox__button" type="button">
            Yellowstone
          </button>
        </li>
        <li className="tripdropbox__list-item">
          <button className="tripdropbox__button" type="button">
            Bermuda
          </button>
        </li>
        <li className="tripdropbox__list-item">
          <button className="tripdropbox__button" type="button">
            Add Trip
          </button>
        </li>
      </ul>
    </ul>
  );
};

export default TripsDropbox;
