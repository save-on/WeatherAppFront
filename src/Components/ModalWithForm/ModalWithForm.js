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
      <div className="modal__content">
        <h3 className="add__garment-header">
          {title}
          <button className="close" type="button" onClick={onClose}></button>
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
