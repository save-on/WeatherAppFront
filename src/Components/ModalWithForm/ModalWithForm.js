import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  title,
  onClose,
  name,
  onSubmit,
  formRef,
  errMessage,
  isBlurredBackground,
}) => {


  return (
    <div className={`modal ${isBlurredBackground ? "modal--blurred" : ""}`}>
      <div className={`modal__content_type_${name}`}>
        <h3 className={`modal-form-header_type_${name}`}>
          {title}
          <button className={`close_type_${name}`} type="button" onClick={onClose}>X</button>
        </h3>
        <form
          ref={formRef}
          noValidate
          className="modal-form"
          onSubmit={onSubmit}
        >
          {children}
          <p className="modal-form_err-message">{errMessage}</p>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
