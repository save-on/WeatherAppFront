import React from "react";
import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.js";
import { useForm } from "../../hooks/useForm.js";
import { useFormValidator } from "../../hooks/useFormValidator.js";

const CreatePackingListModal = ({
  onClose,
  onCreatePackingList,
  isOpen,
  isLoading,
  handleSelectedCard
}) => {
  const { values, handleChanges, setValues } = useForm({
    name: "",
    location: "",
    packinglist_image: "",
    weather_condition: ""
  });

  const { isDisabled } = useFormValidator(values);

  const [imageFile, setImageFile] = useState(null);

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt");

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('weather_condition', values.weather_condition);
    formData.append('location', values.location);

    if (imageFile) {
      formData.append('image', imageFile);
    }
    onCreatePackingList(formData)
  };



  return (
    <ModalWithForm
      title="Create New Packing List"
      onClose={onClose}
      isOpen={isOpen}
      buttonText="Create Packing List"
      onSubmit={handleSubmit}
    
    >
      <ul className="inputs">
        <label className="input-header" htmlFor="packingListName">
          Packing List Name
        </label>
        <li>
          <input
            className="input"
            type="text"
            name="name"
            minLength="2"
            maxLength="30"
            required
            placeholder="Packing List Name"
            id="packingListName"
            value={values.name}
            onChange={handleChanges}
          />
        </li>
        <label className="input-header" htmlFor="location">
          Location
        </label>
        <input
          className="input"
          type="text"
          name="location"
          minLength="2"
          maxLength="30"
          placeholder="Location (Optional)"
          id="location"
          value={values.location}
          onChange={handleChanges}
        />
      
      <label className="input-header" htmlFor="packingListImage">
        Packing List Image (Optional)
      </label>
      <li>
        <input 
        className="input"
          type="file"
          name="image"
          placeholder="Upload Image"
          id="packingListImage"
          accept="image/*"
          onChange={handleFileChange}
        />
      </li>
      </ul>
      <p className="weather-type-header input-header">Select Weather Type:</p>
      <div className="weather-inputs">
        <div>
          <input
            className="weather-type-button"
            name="weather_condition"
            type="radio"
            id="hot"
            value="hot"
            checked={values.weather_condition === "hot"}
            onChange={handleChanges}
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
            name="weather_condition"
            type="radio"
            id="warm"
            value="warm"
            checked={values.weather_condition === "warm"}
            onChange={handleChanges}
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
            name="weather_condition"
            type="radio"
            id="cold"
            value="cold"
        
            checked={values.weather_condition === "cold"}
            onChange={handleChanges}
          />
          <label
            className="radio-label"
            name="weather-type=button"
            htmlFor="cold"
          >
            Cold
          </label>
          <div className="button-container">
            <button
              disabled={isDisabled}
              type="submit"
              className="modal-form-submit"
            >
              {isLoading ? "Saving" : "Save Packing List"}
            </button>
          </div>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default CreatePackingListModal;
