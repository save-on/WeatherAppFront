import { useContext, useEffect } from "react";
import CurrentUserContext from "../../Contexts/CurrentUserContext.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm.js";
import { useForm } from "../../hooks/useForm.js";
const EditProfileModal = ({ onClose, updateUser, isLoading }) => {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChanges, setValues } = useForm({
    name: "",
    avatar: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    updateUser(values);
  };

  useEffect(() => {
    setValues(currentUser);
  }, [currentUser]);

  return (
    <ModalWithForm
      name="edit-profile"
      title="Change profile data"
      onClose={onClose}
      buttonText="Save Changes"
      onSubmit={onSubmit}
    >
      <ul className="edit-modal__input-container">
        <label className="modal__input-title" htmlFor="name">
          Name *
        </label>
        <li className="modal__inputs">
          <input
            className="modal__input"
            id="name"
            type="text"
            name="name"
            placeholder={values.name}
            minLength="1"
            maxLength="50"
            required
            value={values.name}
            onChange={handleChanges}
          ></input>
        </li>

        <label className="modal__input-title" htmlFor="avatar">
          Avatar *
        </label>
        <li className="modal__inputs">
          <input
            className="modal__input"
            id="avatar"
            type="url"
            name="avatar"
            placeholder={values.avatar}
            minLength="1"
            maxLength="400"
            required
            value={values.avatar}
            onChange={handleChanges}
          ></input>
        </li>
      </ul>
      <div>
        <button className="modal__input-container-button" type="submit">
          {isLoading ? "Saving" : "Save Changes"}
        </button>
      </div>
    </ModalWithForm>
  );
};

export default EditProfileModal;
