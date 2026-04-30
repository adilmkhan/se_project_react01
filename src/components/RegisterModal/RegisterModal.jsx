import { useForm } from "../../hooks/useForm.js";
import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import {
  validateEmail,
  validatePassword,
  validateName,
} from "../../utils/validation.js";

const RegisterModal = ({
  isOpen,
  onSignup,
  handleCloseClick,
  handleLoginClick,
}) => {
  const defaultValues = {
    email: "",
    password: "",
    name: "",
  };

  const validators = {
    email: validateEmail,
    password: validatePassword,
    name: validateName,
  };
  const { values, handleChange, errors, resetForm, isFormValid } = useForm(
    defaultValues,
    validators,
  );

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  function handleSignup(evt) {
    evt.preventDefault();
    onSignup(values);
  }
  return (
    <ModalWithForm
      title="Sign up"
      name="sign-up"
      isOpen={isOpen}
      handleCloseClick={handleCloseClick}
      onSubmit={handleSignup}
      buttonText="Sign up"
      routing="Sign in"
      routingHandler={handleLoginClick}
      isFormValid={isFormValid}
      errors={errors}
    >
      <label htmlFor="register-email" className="modal__form-label">
        Email{" "}
      </label>
      <input
        type="email"
        className={`modal__form-input ${errors.email ? "input-error" : ""}`}
        id="register-email"
        name="email"
        placeholder="Enter Email"
        required
        minLength="2"
        maxLength="30"
        value={values.email}
        onChange={handleChange}
      />
      {errors.email && <span className="error-message">{errors.email}</span>}
      <label htmlFor="register-password" className="modal__form-label">
        Password{" "}
      </label>
      <input
        type="password"
        className={`modal__form-input ${errors.password ? "input-error" : ""}`}
        id="register-password"
        name="password"
        placeholder="Enter Password"
        required
        minLength="2"
        maxLength="30"
        value={values.password}
        onChange={handleChange}
      />
      {errors.password && (
        <span className="error-message">{errors.password}</span>
      )}
      <label htmlFor="register-name" className="modal__form-label">
        Username{" "}
      </label>
      <input
        type="text"
        className={`modal__form-input ${errors.name ? "input-error" : ""}`}
        id="register-name"
        name="name"
        placeholder="Enter your username"
        required
        minLength="2"
        maxLength="30"
        value={values.name}
        onChange={handleChange}
      />
      {errors.name && <span className="error-message">{errors.name}</span>}
    </ModalWithForm>
  );
};

export default RegisterModal;
