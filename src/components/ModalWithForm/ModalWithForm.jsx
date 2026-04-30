import "./ModalWithForm.css";

function ModalWithForm({
  buttonText,
  title,
  name,
  routing,
  routingHandler,
  isOpen,
  handleCloseClick,
  children,
  onSubmit,
  isFormValid,
}) {
  function routingCloseHanlder() {
    handleCloseClick();
    setTimeout(() => {
      routingHandler();
    }, 490);
  }
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__container">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__button-close_add"
          aria-label="Close modal"
        ></button>
        <h2 className="modal__form-title">{title}</h2>
        <form onSubmit={onSubmit} className="modal__form" name={name}>
          {children}
          <button
            type="submit"
            className={`modal__button modal__button-save ${!isFormValid ? "button-disabled" : ""}`}
            disabled={!isFormValid}
          >
            {buttonText}
          </button>
          <p className="modal__or">
            or{" "}
            <button
              onClick={routingCloseHanlder}
              type="button"
              className="modal__or-signup"
            >
              {routing}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
