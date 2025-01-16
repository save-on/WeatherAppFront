import { CurrentUserContext } from "../../Contexts/CurrentUserContext.js";
import "./ItemModal.css";
import React, { useContext } from "react";

const ItemModal = ({ selectedCard, onClose, onDeleteClick, loggedIn }) => {
  return (
    <div className={"modal"}>
      <div className="preview-image-content">
        <button
          className="preview-image-close"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="image-preview"
          src={selectedCard.imageUrl}
          alt="image-preview"
        ></img>
        <div className="preview-image-name">
          {selectedCard.name}
          {loggedIn && (
            <button className="delete-button" onClick={onDeleteClick}>
              Delete Item
            </button>
          )}
        </div>
        <div className="preview-image-weather-type">
          {" "}
          Weather Type: {selectedCard.weather}{" "}
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
