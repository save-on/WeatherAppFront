import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  title,
  onClose,
  name,
  onSubmit,
  formRef,
  errMessage,
}) => {


  return (
    <div className={`modal modal_type_${name}`}>
      <div className={`modal__content_type_${name}`}>
        <h3 className={`modal-form-header_type_${name}`}>
          {title}
          <button className={`close_type_${name}`} type="button" onClick={onClose}></button>
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
