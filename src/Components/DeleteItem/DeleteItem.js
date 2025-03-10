// import ModalWithForm from "../ModalWithForm/ModalWithForm.js"; // Not used?
// import React from "react";
import close from "../../Images/close.svg";
import "./DeleteItem.css";

const DeleteItemModal = ({
  onClose,
  onDeleteClick,
  selectedCard,
  isLoading,
}) => {
  const handleDelete = () => {
    onDeleteClick(selectedCard);
  };

  return (
    <div className={"modal delte"}>
      <div className="delete__modal-container">
        <div className="delete__modal">
          <button className="delete__modal-close">
            <img
              className="delete-button"
              src={close}
              onClick={onClose}
              alt="Close Button"
            />
          </button>
          <div className="delete__modal-content">
            <p className="delete__modal-text">
              Are you sure you want to delete this item?
              <br></br>
              This action is irreversible!
            </p>
          </div>
        </div>
        <div className="delete__modal-button">
          <button className="delete__button-confirm" onClick={handleDelete}>
            {isLoading ? "Deleting item..." : "Yes, delete item"}
          </button>
        </div>
        <div className="delete__modal-button">
          <button className="delete__button-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteItemModal;
