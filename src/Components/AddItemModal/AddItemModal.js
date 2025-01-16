import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.js";

const AddItemModal = ({ handleCloseModal, onAddItem, isOpen }) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [imageUrl, setImageUrl] = useState("");
  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather: weatherType });
  };

  const [weatherType, setWeatherType] = useState("");
  const handleWeatherTypeChange = (e) => {
    setWeatherType(e.target.value);
  };

  return (
    <ModalWithForm
      title="New Garment"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      buttonText="Add Garment"
    >
      <ul className="inputs">
        <label className="input-header" htmlForm="name">
          Name
        </label>
        <li>
          <input
            className="input"
            type="text"
            name="name"
            minLength="1"
            maxLength="30"
            placeholder="Name"
            id="name"
            value={name}
            onChange={handleNameChange}
          />
        </li>
        <label className="input-header" htmlFor="input-url">
          Image
        </label>
        <li>
          <input
            className="input"
            type="url"
            name="url"
            placeholder="Image Url"
            id="input-url"
            value={imageUrl}
            onChange={handleUrlChange}
          />
        </li>
      </ul>

      <p className="weather-type-header input-header">Select Weather Type:</p>
      <div className="weather-inputs">
        <div>
          <input
            className="weather-type-button"
            name="weather-type-button"
            type="radio"
            id="hot"
            value="hot"
            checked={weatherType === "hot"}
            onChange={handleWeatherTypeChange}
          />
          <label
            className="radio-label"
            name="weather-type-button"
            htmlFor="hot"
          >
            Hot
          </label>
        </div>
        <div>
          <input
            className="weather-type-button"
            name="weather-type-button"
            type="radio"
            id="warm"
            value="warm"
            checked={weatherType === "warm"}
            onChange={handleWeatherTypeChange}
          />
          <label
            className="radio-label"
            name="weather-type-button"
            htmlFor="warm"
          >
            Warm
          </label>
        </div>
        <div>
          <input
            className="weather-type-button"
            name="weather-type-button"
            type="radio"
            id="cold"
            value="cold"
            checked={weatherType === "cold"}
            onChange={handleWeatherTypeChange}
          />
          <label
            className="radio-label"
            name="weather-type=button"
            htmlFor="cold"
          >
            Cold
          </label>
          <div className="button-container">
            <button type="submit" className="modal-form-submit">
              Add Garment
            </button>
          </div>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
