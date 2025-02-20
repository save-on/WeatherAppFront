import ModalWithForm from "../ModalWithForm/ModalWithForm.js";
import { useForm } from "../../hooks/useForm.js";
import { useFormValidator, useValidator } from "../../hooks/useFormValidator.js";

const AddPackingList = ({ handleCloseModal, onAddPackingList, isOpen, isLoading }) => {
    const {values, handleChanges } = useForm({
        name: "",
        packingList_image: "",
        affiliate_link: "",
        weather_condition: "",
    });

    const { formRef, errors, isDisabled } = useFormValidator(values);

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddPackingList(values);
    };

    const handleFileUpload = (e) => {
      console.log("handleFileUpload triggered!");
        const file = e.target.files[0];
        if (file) {
          console.log("Selected file: ", file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setValues((prevValues) => ({
                  ...prevValues,
                  packingList_image: reader.result,
                }));
                console.log("Base64 String: ", reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    
    return (
        <ModalWithForm 
        title="New Packing List"
        onClose={handleCloseModal}
        isOpen={isOpen}
        onSubmit={handleSubmit}
        buttonText="Add Packing List"
        formRef={formRef}
        >
          <ul className="inputs">
        <label className="input-header" htmlFor="name">
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
        <label className="input-header" htmlFor="packingList_image">
          Packing List Image
        </label>
        <li>
          <input
            className="input"
            id="packingList_image"
            type="file"
            name="packingList_image"
            required
            placeholder="Packing List Image"
            accept="image/*"
            onChange={handleFileUpload}
          />
          {values.packingList_image && (
            <div>
                <p>Selected File Preview:</p>
                <img src={values.packingList_image} alt="Preview" width="100" />
            </div>
            
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
        <label className="input-header" htmlFor="location">
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
              {isLoading ? "Saving" : "Save Packing List"}
            </button>
          </div>
        </div>
      </div>
        </ModalWithForm>
    )

};

export default AddPackingList;