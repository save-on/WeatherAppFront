import { useContext, useEffect } from "react";
import CurrentUserContext from "../../Contexts/CurrentUserContext.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm.js";
import { useForm } from "../../hooks/useForm.js";
import { useFormValidator } from "../../hooks/useFormValidator.js";

const PackingListsModal = ({ onClose, onAddPackingList, isOpen}) => {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChanges, setValues } = useForm({
    packingList_name: "",
    clothing_image: "",
    affiliate_link: "",
    weather_condition: "",
    location: "",
  });

  const { formRef, errors, isDisabled } = useFormValidator(values);

  //This needs to change for the packing list not the user
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPackingList(values);
  };

  return (
    <ModalWithForm
      title="Create a packing list"
      onClose={onClose}
      isOpen={isOpen}
      buttonText="Save Packing List"
      onSubmit={handleSubmit}
      formRef={formRef}
    >
      <ul className="inputs">
        <label className="input-header" htmlFor="name" >
          Packing List Name
        </label>
        <li>
          <input
            className="input"
            type="text"
            name="packingList_name"
            minLength="2"
            maxLength="30"
            required
            placeholder="Packing List Name"
            id="packing list name"
            value={values.name}
            onChange={handleChanges}
          />
          {errors.name && (
            <p className="modal-form_input-error">{errors.name}</p>
          )}
        </li>
        <label className="input-header" htmlFor="input-url">
          Clothing Item Image
        </label>
        <li>
          <input
            className="input"
            type="url"
            name="clothing_image"
            required
            placeholder="Clothing Item Image"
            id="input-url"
            value={values.clothing_image}
            onChange={handleChanges}
          />
          {errors.cloting_image && (
            <p className="modal-form_input-error">{errors.clothing_image}</p>
          )}
        </li>
        <label className="input-header" htmlFor="input_link">
          Affiliate Link
        </label>
        <li>
          <input
            className="input"
            type="url"
            name="affiliate_link"
            placeholder="Insert Link (Optional)"
            id="input_link"
            value={values.affiliate_link}
            onChange={handleChanges} 
          />
        </li>
        <label className="input-header" htmlFor="location" >
          Location
        </label>
        <input
          className="input"
          type="text"
          name="location"
          minLength="2"
          maxLength="30"
          required
          placeholder="Location"
          id="location"
          value={values.location}
          onChange={handleChanges}
        />
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
            required
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
            required
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
            required
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
              Save Packing List
            </button>
          </div>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default PackingListsModal;
