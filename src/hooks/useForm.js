import { useState } from "react";

export const useForm = (inputValues) => {
  const [values, setValues] = useState(inputValues);

  const handleChanges = (e) => {
    const {name, value} = e.target;
    setValues((prevValues) =>({
      ...prevValues,
      [name]: value,
    }));
  };
  return {values, handleChanges, setValues};
};