import { useState } from "react";

export const useForm = (initialValues = {}) => {
  const [values, setValues] = useState({
    location: '',
    activity: '',
    travelDates: {startDate: null, endDate: null},
    ...initialValues,
  });

  const handleChanges = (e) => {
    const {name, value} = e.target;
    setValues((prevValues) =>({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleDateChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      travelDates: {
        ...prevValues.travelDates,
        [name]: value,
      },
    }));
  };

  const resetForm = () => {
    setValues({
      location: '',
      activity: '',
      travelDates: {startDate: null, endDate: null},
      ...initialValues,
    });
  };

  return {values, handleChanges, handleDateChange, setValues, resetForm};
};