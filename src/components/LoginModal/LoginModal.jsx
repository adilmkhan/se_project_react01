import { useForm } from "../../hooks/useForm.js";
import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import {
  validateEmail,
  validatePassword,
  validateName,
} from "../../utils/validation.js";

const LoginModal = ({
  isOpen,
  onSignin,
  handleCloseClick,
  handleRegisterClick,
}) => {
  const defaultValues = {
    email: "",
    password: "",
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

  function handleSignin(evt) {
    evt.preventDefault();
    onSignin(values);
  }

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Sign in"
      name="sign-in"
      isOpen={isOpen}
      handleCloseClick={handleCloseClick}
      onSubmit={handleSignin}
      routing="Sign up"
      routingHandler={handleRegisterClick}
      buttonText="Sign in"
      isFormValid={isFormValid}
      errors={errors}
    >
      <label htmlFor="email" className="modal__form-label">
        Email{" "}
      </label>
      <input
        type="email"
        className={`modal__form-input ${errors.email ? "input-error" : ""}`}
        id="email"
        name="email"
        placeholder="Enter Email"
        required
        minLength="2"
        maxLength="30"
        value={values.email}
        onChange={handleChange}
      />
      {errors.email && <span className="error-message">{errors.email}</span>}
      <label htmlFor="password" className="modal__form-label">
        Password{" "}
      </label>
      <input
        type="password"
        className={`modal__form-input ${errors.password ? "input-error" : ""}`}
        id="password"
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
    </ModalWithForm>
  );
};

export default LoginModal;
