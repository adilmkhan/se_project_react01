import "../../components/ModalWithForm/ModalWithForm.css";

function RegisterSuccessModal({ isOpen, handleCloseClick, handleLoginClick }) {
  function routingCloseHanlder() {
    handleCloseClick();
    setTimeout(() => {
      handleLoginClick();
    }, 500);
  }

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__container modal-register-success">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__button-close_add"
          aria-label="Close modal"
        ></button>
        <h2 className="modal__form-title modal__regiser-success-title">
          Registration successfully completed!
        </h2>
        <button
          onClick={routingCloseHanlder}
          type="button"
          className="modal__or-signup modal__regiser-success-btn"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export default RegisterSuccessModal;
