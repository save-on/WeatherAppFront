import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  // buttonText = "",
  title,
  onClose,
  name,
  // handleSubmit,
  // isOpen,
  onSubmit,
  formRef,
}) => {
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__content">
        <h3 className="add__garment-header">
          {title}
          <button className="close" type="button" onClick={onClose}></button>
        </h3>
        <form ref={formRef} className="modal-form" onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
