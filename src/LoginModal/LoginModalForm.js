import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ onClose, loginUser, openRegisterModal, isLoading }) => {
  const [email, changeEmail] = useState("");
  const handleEmailChange = (e) => {
    changeEmail(e.target.value);
  };

  const [password, changePassword] = useState("");
  const handlePasswordChange = (e) => {
    changePassword(e.target.value);
  };

  const onLogin = (e) => {
    e.preventDefault();
    loginUser({ email, password });
  };

  return (
    <ModalWithForm
      title="Log In"
      onClose={onClose}
      onSubmit={onLogin}
      buttonText="Log In"
      name="login"
    >
      <ul className="inputs">
        <label className="input-header" htmlFor="email">
          Email
        </label>
        <li>
          <input
            className="input"
            type="email"
            name="email"
            minLength="1"
            maxLendth="50"
            placeholder="Email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </li>
        <label className="input-header" htmlFor="password">
          Password
        </label>
        <li>
          <input
            className="input"
            type="password"
            name="password"
            placeholder="Password"
            id="password"
            minLength="1"
            maxLength="50"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </li>
      </ul>
      <div className="modal-form-buttons">
        <button className="modal-form-submit" type="submit">
          {isLoading ? "Logging In..." : "Log In"}
        </button>
        <button
          className="modal__login"
          type="button"
          onClick={openRegisterModal}
        >
          or Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
