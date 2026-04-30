import { useState } from "react";

export function useForm(defaultValues, validators = {}) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({
    server: "This email is not available",
  }); //testing;

  function handleChange(evt) {
    const { name, value } = evt.target;

    // Update values
    setValues((prev) => ({ ...prev, [name]: value }));

    // Check if this field has a validator
    const validator = validators[name];
    if (validator) {
      const errorMessage = validator(value);

      setErrors((prev) => {
        const newErrors = { ...prev };

        if (errorMessage) {
          newErrors[name] = errorMessage;
        } else {
          delete newErrors[name];
        }

        return newErrors;
      });
    }
  }
  function resetForm() {
    setValues(defaultValues);
    // setErrors({
    //   server: "This email is not available",
    // }); //Temporary Testing
    setErrors({});
  }
  const isFormValid =
    Object.keys(errors).length === 0 &&
    Object.values(values).every((value) => value.trim() !== "");

  return {
    values,
    setValues,
    handleChange,
    setErrors,
    errors,
    resetForm,
    isFormValid,
  };
}
