import "./TripsDropbox.css";

import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";


const TripsDropbox = ({
  isOpened,
  handleCloseModal,
  userTrips,
  handleOpenAddTripModal,
}) => {
  //const currentUser = useContext(CurrentUserContext);
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

  const handleAddTripClick = () => {
    if (handleOpenAddTripModal) {
      handleOpenAddTripModal();
    }
    //handleCloseModal();
  };

  const handleTripButtonClick = (tripId) => {
    navigate(`/mytrips/${tripId}`);
    handleCloseModal();
  };

  return (
    <ul
      className={`tripdropbox ${isOpened && "tripdropbox_visible"}`}
      ref={dropboxRef}
    >
      <ul className="tripdropbox__list">
        {userTrips && userTrips.length > 0 ? (
          userTrips.map((trip) => (
            <li className="tripdropbox__list-item" key={trip.id}>
              <button
                className="tripdropbox__button"
                type="button"
                onClick={() => handleTripButtonClick(trip.id)}
              >
                {trip.destination}
              </button>
            </li>
          ))
        ) : (
          <li className="tripdropbox__list-item">
            <p className="tripdropbox__no-trips-message">No Trips saved yet.</p>
          </li>
        )}
        <li className="tripdropbox__list-item">
          <button
            className="tripdropbox__button"
            type="button"
            onClick={handleAddTripClick}
          >
            Add Trip
          </button>
        </li>
      </ul>
    </ul>
  );
};

export default TripsDropbox;
