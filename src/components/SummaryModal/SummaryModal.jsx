import "../../components/ModalWithForm/ModalWithForm";

function SummaryModal({ isOpen, handleCloseClick, article }) {
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
          {article.title}
        </h2>
        <p className="modal__summary-text">{article.summary}</p>
      </div>
    </div>
  );
}

export default SummaryModal;
