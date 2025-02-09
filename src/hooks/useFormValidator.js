import { useRef, useState } from "react";

export const useFormValidator = () => {
  const formRef = useRef(null);
  const formElements = formRef?.current?.elements;
  const [errors, setErrors] = useState({});
  formElements.forEach((element) => {
    console.log(element);
  });
  return { formRef };
};
