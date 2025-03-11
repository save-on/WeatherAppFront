import { useContext, useEffect } from "react";
import CurrentUserContext from "../../Contexts/CurrentUserContext.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm.js";
import { useForm } from "../../hooks/useForm.js";
import { useFormValidator } from "../../hooks/useFormValidator.js";

const EditProfileModal = ({ onClose, updateUser, isLoading, errMessage }) => {

  const currentUser = useContext(CurrentUserContext);

  const { values, handleChanges, setValues } = useForm({
    name: "",
    avatar: "",
  });

  const { formRef, errors, isDisabled } = useFormValidator(values);

  const onSubmit = (e) => {
    e.preventDefault();
    updateUser(values);
  };

  useEffect(() => {
    setValues({
      name: currentUser.name,
      avatar: "",
    });
  }, [currentUser]);

  return (
    <ModalWithForm
      name="edit-profile"
      title="Change profile data"
      onClose={onClose}
      buttonText="Save Changes"
      onSubmit={onSubmit}
      formRef={formRef}
      errMessage={errMessage}
    >
      <ul className="inputs">
        <label className="input-header" htmlFor="name">
          Name *
        </label>
        <li>
          <input
            className="input"
            id="name"
            type="text"
            name="name"
            placeholder={values.name}
            minLength="2"
            maxLength="30"
            required
            value={values.name}
            onChange={handleChanges}
          />
          {errors.name && (
            <p className="modal-form_input-error">{errors.name}</p>
          )}
        </li>

        <label className="input-header" htmlFor="avatar">
          Avatar *
        </label>
        <li>
          <input
            className="input"
            id="avatar"
            type="url"
            name="avatar"
            placeholder={values.avatar || "Enter Avatar image URL"}
            minLength="1"
            maxLength="400"
            value={values.avatar || ""}
            onChange={handleChanges}
          />
        </li>
      </ul>
      <div>
        <button
          disabled={isDisabled}
          className="modal-form-submit"
          type="submit"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </ModalWithForm>
  );
};

export default EditProfileModal;
