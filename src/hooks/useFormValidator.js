import { useEffect, useRef, useState } from "react";

export const useFormValidator = (values) => {
  const formRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);

  const checkValidity = (element) => {
    setErrors((prev) => {
      const updatedErrors = { ...prev };
      if (!element.checkValidity()) {
        updatedErrors[element.name] = element.validationMessage;
      } else {
        delete updatedErrors[element.name];
      }
      return updatedErrors;
    });
  };

  useEffect(() => {
    if (formRef.current) {
      const formElements = Array.from(formRef.current.elements);

      const isFormEmpty = formElements.every((element) =>
        element.type === "radio" ? !element.checked : !element.value
      );

      if (isFormEmpty) {
        setIsDisabled(true);
        return;
      }

      const isValid = formElements.every((element) => element.checkValidity());
      setIsDisabled(!isValid);

      formElements.forEach((element) => {
        if (element.value || element.checked) {
          checkValidity(element);
        }
      });
    }
  }, [values]);

  return { formRef, errors, isDisabled };
};
