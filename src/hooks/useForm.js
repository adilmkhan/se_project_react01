import { useState } from "react";

// export function useForm(defaultValues) {
//   const [values, setValues] = useState(defaultValues);

//   function handleChange(evt) {
//     const { name, value } = evt.target;
//     setValues({ ...values, [name]: value });
//   }
//   return { values, setValues, handleChange };
// }
export function useForm(defaultValues, validators = {}) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});

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
    setErrors({});
  }
  const isFormValid =
    Object.keys(errors).length === 0 &&
    Object.values(values).every((value) => value.trim() !== "");

  return { values, setValues, handleChange, errors, resetForm, isFormValid };
}
