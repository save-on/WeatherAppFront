import ModalWithForm from "../ModalWithForm/ModalWithForm.js";
import { useForm } from "../../hooks/useForm.js";
import { useFormValidator } from "../../hooks/useFormValidator.js";

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
  const { formRef, errors, isDisabled } = useFormValidator(values);

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
      formRef={formRef}
    >
      <ul className="inputs">
        <label className="input-header" htmlFor="email">
          Email
        </label>
        <li>
          <input
            className="input"
            name="email"
            id="email"
            type="email"
            placeholder="Email"
            required
            value={values.email}
            onChange={handleChanges}
          />
          {errors.email && (
            <p className="modal-form_input-error">{errors.email}</p>
          )}
        </li>
        <li>
          <label className="input-header" htmlFor="password">
            Password
          </label>
          <input
            className="input"
            name="password"
            id="password"
            type="password"
            placeholder="Password"
            minLength="6"
            maxLength="50"
            required
            value={values.password}
            onChange={handleChanges}
          />
          {errors.password && (
            <p className="modal-form_input-error">{errors.password}</p>
          )}
        </li>
        <li>
          <label className="input-header" htmlFor="name">
            Name
          </label>
          <input
            className="input"
            name="name"
            id="name"
            type="text"
            placeholder="Name"
            minLength="2"
            maxLength="50"
            required
            value={values.name}
            onChange={handleChanges}
          />
          {errors.name && (
            <p className="modal-form_input-error">{errors.name}</p>
          )}
        </li>
        <li>
          <label className="input-header" htmlFor="avatar">
            Avatar URL
          </label>
          <input
            className="input"
            name="avatar"
            id="avatar"
            type="url"
            placeholder="Avatar URL"
            value={values.avatar}
            onChange={handleChanges}
          />
        </li>
      </ul>
      <div className="modal-form-buttons">
        <button
          className="modal-form-submit"
          disabled={isDisabled}
          type="submit"
        >
          {isLoading ? "Submitting..." : "Sign Up"}
        </button>
        <button
          className="modal__signup"
          type="button"
          onClick={openLoginModal}
        >
          Or Log In
        </button>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
