import ModalWithForm from "../ModalWithForm/ModalWithForm.js";
import { useForm } from "../../hooks/useForm.js";
import { useFormValidator } from "../../hooks/useFormValidator.js";

const AddItemModal = ({ handleCloseModal, onAddItem, isOpen }) => {
  const { values, handleChanges } = useForm({
    name: "",
    clothing_image: "",
    weather_condition: "",
  });
  const { formRef } = useFormValidator();

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(values);
  };

  return (
    <ModalWithForm
      title="New Garment"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      buttonText="Add Garment"
      formRef={formRef}
    >
      <ul className="inputs">
        <label className="input-header" htmlFor="name">
          Name
        </label>
        <li>
          <input
            className="input"
            type="text"
            name="name"
            minLength="2"
            maxLength="30"
            placeholder="Name"
            id="name"
            value={values.name}
            onChange={handleChanges}
          />
        </li>
        <label className="input-header" htmlFor="input-url">
          Image
        </label>
        <li>
          <input
            className="input"
            type="url"
            name="clothing_image"
            placeholder="Image Url"
            id="input-url"
            value={values.clothing_image}
            onChange={handleChanges}
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
