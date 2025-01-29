import ModalWithForm from "../ModalWithForm/ModalWithForm.js";
import { useForm } from "../../hooks/useForm.js";

const LoginModal = ({ onClose, loginUser, openRegisterModal, isLoading }) => {
  const { values, handleChanges, setValues } = useForm({
    email: "",
    password: "",
  });

  // const handleInputReset = () => {
  //   setValues({
  //     name: "",
  //     password: "",
  //   });
  // };

  const onLogin = (e) => {
    e.preventDefault();
    loginUser(values);
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
            maxLength="50"
            placeholder="Email"
            id="email"
            value={values.email}
            onChange={handleChanges}
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
            value={values.password}
            onChange={handleChanges}
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
