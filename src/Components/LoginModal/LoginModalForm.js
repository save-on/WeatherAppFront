import ModalWithForm from "../ModalWithForm/ModalWithForm.js";
import { useForm } from "../../hooks/useForm.js";
import { useFormValidator } from "../../hooks/useFormValidator.js";

const LoginModal = ({
  onClose,
  loginUser,
  openRegisterModal,
  isLoading,
  errMessage,
  setErrMessage,
  isBlurredBackground,
}) => {
  
  const { values, handleChanges } = useForm({
    email: "",
    password: "",
  });
  const { formRef, errors, isDisabled } = useFormValidator(values);

  const onLogin = (e) => {
    e.preventDefault();
    loginUser(values);
  };

  return (
    <ModalWithForm
      title="Login"
      onClose={onClose}
      onSubmit={onLogin}
      buttonText="Log In"
      name="login"
      formRef={formRef}
      errMessage={errMessage}
      isBlurredBackground={isBlurredBackground}
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
            placeholder="   Email"
            id="email"
            value={values.email}
            onChange={handleChanges}
            required
          />
          {errors.email && (
            <p className="modal-form_input-error">{errors.email}</p>
          )}
        </li>
        <label className="input-header" htmlFor="password">
          Password
        </label>
        <li>
          <input
            className="input"
            type="password"
            name="password"
            placeholder="   Password"
            id="password"
            minLength="6"
            maxLength="50"
            value={values.password}
            onChange={handleChanges}
            required
          />
          {errors.password && (
            <p className="modal-form_input-error">{errors.password}</p>
          )}
        </li>
      </ul>
      <div className="modal-form-buttons">
        <button
          className="modal-form-submit"
          disabled={isDisabled}
          type="submit"
        >
          {isLoading ? "Logging In..." : "Login"}
        </button>
      </div>
      <p className="modal-form-forgot-password">
        Did you forget your password?
      </p>
        <div className="modal-form-signup">
       <p className="modal-form-signup-text">Sign Up</p>
        <p className="modal-form-signup-text-description">Click below to sign up for a new account</p>

        <button
          className="modal__signup"
          type="button"
          onClick={() => {
            openRegisterModal();
            setErrMessage("");
          }}
        >
          Create account
        </button>
        
 
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
