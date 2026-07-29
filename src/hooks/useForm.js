import { useCallback, useState } from "react";

export function useForm(defaultValues, validators = {}) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({}); //testing;

  function handleChange(evt) {
    const { name, value } = evt.target;

    setValues((prev) => ({ ...prev, [name]: value }));

    const validator = validators[name];
    if (validator) {
      const errorMessage = validator(value);

      setErrors((prev) => {
        const newErrors = { ...prev };

        delete newErrors.server;

        if (errorMessage) {
          newErrors[name] = errorMessage;
        } else {
          delete newErrors[name];
        }

        return newErrors;
      });
    }
  }
  const resetForm = useCallback(() => {
    setValues(defaultValues);
    setErrors({});
  }, [defaultValues]);
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
