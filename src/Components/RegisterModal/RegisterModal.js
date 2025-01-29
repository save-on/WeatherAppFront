import ModalWithForm from "../ModalWithForm/ModalWithForm.js";
import { useForm } from "../../hooks/useForm.js";

const RegisterModal = ({
  onClose,
  registerUser,
  openLoginModal,
  isLoading,
}) => {
  const { values, handleChanges } = useForm({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  // const handleInputReset = () => {
  //   setValues({
  //     email: "",
  //     password: "",
  //     name: "",
  //     avatar: "",
  //   });
  // };

  const onRegister = (e) => {
    e.preventDefault();
    registerUser(values);
  };

  return (
    <ModalWithForm
      name="register"
      title="Sign Up"
      onClose={onClose}
      buttonText="Sign Up"
      onSubmit={onRegister}
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
          value={values.email}
          onChange={handleChanges}
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
          value={values.password}
          onChange={handleChanges}
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
          value={values.name}
          onChange={handleChanges}
        ></input>
      </div>
      <div>
        <label className="modal__input-title" htmlFor="avatar">
          Avatar URL
        </label>
        <input
          className="input"
          name="avatar"
          id="avatar"
          type="url"
          placeholder="Avatar URL"
          required
          value={values.avatar}
          onChange={handleChanges}
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
