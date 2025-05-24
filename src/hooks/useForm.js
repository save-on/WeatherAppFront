import { useState } from "react";

export const useForm = (initialValues = {}) => {
  const [values, setValues] = useState({
    location: "",
    activity: "",
    travelDates: { startDate: null, endDate: null },
    ...initialValues,
  });

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleDateChange = (name, newDateRangeObject) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: newDateRangeObject,
    }));
  };

  const resetForm = () => {
    console.log("4. useForm setValues called with: ", newDateRangeObject);
    setValues({
      location: "",
      activity: "",
      travelDates: { startDate: null, endDate: null },
      ...initialValues,
    });
  };

  return { values, handleChanges, handleDateChange, setValues, resetForm };
};
