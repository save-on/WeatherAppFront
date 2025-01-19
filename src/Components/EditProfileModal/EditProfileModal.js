import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../../Contexts/CurrentUserContext.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm.js";

const EditProfileModal = ({ onClose, updateUser, isLoading }) => {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [avatar, setAvatar] = useState("");
  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateUser({ name, avatar });
  };

  useEffect(() => {
    setName(currentUser.name);
    setAvatar(currentUser.avatar);
  }, [currentUser.name, currentUser.avatar]);

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
            placeholder={name}
            minlength="1"
            maxlength="50"
            required
            value={name}
            onChange={handleNameChange}
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
            name="url"
            placeholder={avatar}
            minlength="1"
            maxlength="400"
            required
            value={avatar}
            onChange={handleAvatarChange}
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
