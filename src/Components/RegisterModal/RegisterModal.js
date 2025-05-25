import ModalWithForm from "../ModalWithForm/ModalWithForm.js";
import { useForm } from "../../hooks/useForm.js";
import { useFormValidator } from "../../hooks/useFormValidator.js";

const RegisterModal = ({
  onClose,
  registerUser,
  openLoginModal,
  isLoading,
  errMessage,
  setErrMessage,
  isBlurredBackground,
}) => {
  const { values, handleChanges } = useForm({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });
  const { formRef, errors, isDisabled } = useFormValidator(values);

  const onRegister = (e) => {
    e.preventDefault();
    registerUser(values);
  };

  return (
    <ModalWithForm
      name="register"
      title="Sign up to get your free personalized packing list!"
      onClose={onClose}
      buttonText="Sign Up"
      onSubmit={onRegister}
      formRef={formRef}
      errMessage={errMessage}
      isBlurredBackground={isBlurredBackground}
    >
      <ul className="inputs-signup">
        <li>
          <label className="input-header" htmlFor="name">
            Name
          </label>
          <input
            className="input"
            name="name"
            id="name"
            type="text"
            placeholder="   Name"
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
        <label className="input-header" htmlFor="email">
          Email
        </label>
        <li>
          <input
            className="input"
            name="email"
            id="email"
            type="email"
            placeholder="   Email"
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
            placeholder="   Password"
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
      </ul>
         <div className="modal-form-buttons">
        <button
          className="modal-form-submit-signup"
          disabled={isDisabled}
          type="submit"
        >
          {isLoading ? "Creating account..." : "Create account"}
        </button>
      </div>
       <p className="modal-form-forgot-password-signup">
        Did you forget your password?
      </p>
        <div className="modal-form-signup">
       <p className="modal-form-signup-text">Already have an account?</p>
        <p className="modal-form-signup-text-description">Click below to sign in</p>

        <button
          className="modal__signup"
          type="button"
          onClick={() => {
            openLoginModal();
            setErrMessage("");
          }}
        >
          Login
        </button>
        
 
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
