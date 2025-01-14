import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

const RegisterModal = ({
  onClose,
  registerUser,
  openLoginModal,
  isLoading,
}) => {
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [avatar, setAvatar] = useState("");
  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const onRegister = (e) => {
    e.preventDefault();
    registerUser({ email, password, name, avatar });
  };

  return (
    <ModalWithForm
      name="register"
      title="Sign Up"
      onClose={onClose}
      buttonText="Sign Up"
      onSubmit={onSubmit}
    >
      <div>
        <label className="modal__input-title" htmlFor="email">
          Email
        </label>
        <input
          className="input"
          name="email"
          id="email"
          type="email"
          placeholder="Email"
          minLength="1"
          maxLength="50"
          required
          value={email}
          onChange={handleEmailChange}
        ></input>
      </div>
      <div>
        <label className="modal__input-title" htmlFor="password">
          Password
        </label>
        <input
          className="input"
          name="password"
          id="password"
          type="password"
          placeholder="Password"
          minLength="1"
          maxLength="50"
          required
          value={password}
          onChange={handlePasswordChange}
        ></input>
      </div>
      <div>
        <label className="modal__input-title" htmlFor="name">
          Name
        </label>
        <input
          className="input"
          name="name"
          id="name"
          type="text"
          placeholder="Name"
          minLength="1"
          maxLength="50"
          required
          value={name}
          onChange={handleNameChange}
        ></input>
      </div>
      <div>
        <label className="modal__input-title" htmlFor="avatar">
          Avatar URL
        </label>
        <input
          className="input"
          name="url"
          id="avatar"
          type="url"
          placeholder="Avatar URL"
          required
          value={avatar}
          onChange={handleAvatarChange}
        ></input>
      </div>
      <div className="modal-form-buttons">
        <button className="modal-form-submit" type="submit">
          {isLoading ? "Submitting..." : "Sign Up"}
        </button>
        <button className="modal__login" type="button" onClick={openLoginModal}>
          Or Log In
        </button>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
