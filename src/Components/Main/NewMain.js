import "./NewMain.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm.js";
import DateRangePicker from "../DateRangePicker/DateRangePicker.js";
import { useForm } from "../../hooks/useForm.js";
import { useState, useRef, useEffect } from "react";

function NewMain({}) {
  const { values, handleChanges, setValues } = useForm({
    location: "",
    activity: "",
  });

  const [travelDates, setTravelDates] = useState({ startDate: null, endDate: null});
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const dateInputRef = useRef(null);
  const datePickerRef = useRef(null);

  const handleDateChange = (start, end) => {
    setTravelDates({startDate: start, endDate: end});
  };

  const handleDateInputClick = () => {
    setIsDatePickerVisible(!isDatePickerVisible);
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dateInputRef.current && !dateInputRef.current.contains(e.target) &&
          datePickerRef.current && !datePickerRef.current.contains(e.target)) {
        setIsDatePickerVisible(false);
      }
    };

   

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dateInputRef, datePickerRef]);

  const formatDateForInput = (date) => {
    if (date instanceof Date) {
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    }
    return "";
  };

  const handleSubmit = () => {
    console.log("Location: ", values.location);
    console.log("Start Date: ", travelDates.startDate);
    console.log("End Date: ", travelDates.endDate);
    console.log("Activity: ", values.activity);
  }


  return (
    <div className="newMain">
      <div className="newMain__title">
        <p className="newMain__title-text">Pack Smarter. Travel Lighter.</p>
      </div>
      <div className="newMain__title-description">
        <p>
          From city escapes to backcountry hikes, your perfect packing list is a
          click away.
        </p>
      </div>
      <div className="newMain__container">
        <ul className="newMain__inputs">
          <label className="newMain__input-header" htmlFor="location">
            Where
          </label>
          <li className="newMain__list__inputs">
            <input
              className="newMain__input"
              type="text"
              name="location"
              minLength="2"
              maxLength="50"
              required
              placeholder="Destination"
              id="location"
              value={values.location}
              onChange={handleChanges}
            />
          </li>
          <label className="newMain__input-header" htmlFor="date">
            When
          </label>
          <li className="newMain__list__inputs">
           <input 
           className="newMain__input"
           type="text"
           placeholder="Select Dates"
           readOnly
           ref={dateInputRef}
           onClick={handleDateInputClick}
           value={travelDates.startDate && travelDates.endDate ? `${formatDateForInput(travelDates.startDate)} - ${formatDateForInput(travelDates.endDate)}`
          : travelDates.startDate ? formatDateForInput(travelDates.startDate) : ""}
           />
           {isDatePickerVisible && (
            <div ref={datePickerRef} style={{position: 'absolute', zIndex: 10}} >
              <DateRangePicker onDateChange={handleDateChange} />
            </div>
           )}
          </li>
          <label className="newMain__input-header" htmlFor="activity">
            <p className="newMain__input__activity__title-text">
              What will you be doing?
            </p>{" "}
            <p className="newMain__input__activity-text">(Optional)</p>
          </label>
          <li className="newMain__list__inputs">
            <input
              className="newMain__input"
              type="text"
              name="activity"
              placeholder="Activities"
              id="activity"
              value={values.activity}
              onChange={handleChanges}
            />
          </li>
        </ul>
        <div className="newMain__submitButton">
            <button className="submitButton">
                Create My Packing List
            </button>
        </div>
      </div>
    </div>
  );
}

export default NewMain;
