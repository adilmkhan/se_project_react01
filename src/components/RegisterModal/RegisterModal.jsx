import { useForm } from "../../hooks/useForm.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

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
    avatarLink: "",
  };
  const { values, handleChange } = useForm(defaultValues);

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
    >
      <label htmlFor="register-email" className="modal__form-label">
        Email{" "}
      </label>
      <input
        type="email"
        className="modal__form-input"
        id="register-email"
        name="email"
        placeholder="Enter Email"
        required
        minLength="2"
        maxLength="30"
        value={values.email}
        onChange={handleChange}
      />
      <label htmlFor="register-password" className="modal__form-label">
        Password{" "}
      </label>
      <input
        type="password"
        className="modal__form-input"
        id="register-password"
        name="password"
        placeholder="Enter Password"
        required
        minLength="2"
        maxLength="30"
        value={values.password}
        onChange={handleChange}
      />
      <label htmlFor="register-name" className="modal__form-label">
        Username{" "}
      </label>
      <input
        type="text"
        className="modal__form-input"
        id="register-name"
        name="name"
        placeholder="Enter your username"
        required
        minLength="2"
        maxLength="30"
        value={values.name}
        onChange={handleChange}
      />
    </ModalWithForm>
  );
};

export default RegisterModal;
