import "./NewMain.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm.js";
import DateRangePicker from "../DateRangePicker/DateRangePicker.js";
import { useForm } from "../../hooks/useForm.js";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NewMain({ onTripDetailsSubmit, onNewTripAttempt }) {
  const { values, handleChanges, handleDateChange } = useForm();

  const [travelDates, setTravelDates] = useState({
    startDate: null,
    endDate: null,
  });
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const dateInputRef = useRef(null);
  const datePickerRef = useRef(null);
  const [activities, setActivities] = useState([]);
  const [currentActivityInput, setCurrentActivityInput] = useState("");
  const activityInputRef = useRef(null);

  const onDateChange = (start, end) => {
    console.log("DateRangePicker onDateChange -  start: ", start, "end: ", end);
    handleDateChange("travelDates", { startDate: start, endDate: end });
  };

  const handleDateInputClick = () => {
    setIsDatePickerVisible(!isDatePickerVisible);
  };

  const handleCloseDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dateInputRef.current &&
        !dateInputRef.current.contains(e.target) &&
        datePickerRef.current &&
        !datePickerRef.current.contains(e.target)
      ) {
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
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    }
    return "";
  };

  const handleActivityInputChange = (e) => {
    setCurrentActivityInput(e.target.value);
  };

  const handleAddActivity = (e) => {
    if (
      (e.key === "Enter" || e.key === ",") &&
      currentActivityInput.trim() !== ""
    ) {
      setActivities([...activities, currentActivityInput.trim()]);
      setCurrentActivityInput("");
      if (activityInputRef.current) {
        activityInputRef.current.focus();
      }
    }
  };

  const handleRemoveActivity = (indexToRemove) => {
    setActivities(activities.filter((_, index) => index !== indexToRemove));
    if (activityInputRef.current) {
      activityInputRef.current.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("2. handleSubmit - values.travelDates BEFORE constructing tripData: ", values.travelDates);

    const tripData = {
      location: values.location,
      startDate: values.travelDates.startDate
        ? values.travelDates.startDate.toISOString()
        : null,
      endDate: values.travelDates.endDate
        ? values.travelDates.endDate.toISOString()
        : null,
      activities: activities.join(", "),
    };
    console.log("3. Trip data being sent from Newmain: ", tripData);
    onNewTripAttempt(tripData);
  };

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
        <form onSubmit={handleSubmit}>
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
                placeholder="   Destination"
                id="location"
                value={values.location || ""}
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
                placeholder="   Select Dates"
                readOnly
                ref={dateInputRef}
                onClick={handleDateInputClick}
                value={
                  values.travelDates &&
                  values.travelDates.startDate &&
                  values.travelDates.endDate
                    ? `${formatDateForInput(
                        values.travelDates.startDate
                      )} - ${formatDateForInput(values.travelDates.endDate)}`
                    : values.travelDates && values.travelDates.startDate
                    ? formatDateForInput(values.travelDates.startDate)
                    : ""
                }
              />
              {isDatePickerVisible && (
                <div className="dateRangePicker__wrapper" ref={datePickerRef}>
                  <DateRangePicker
                    onDateChange={onDateChange}
                    onClose={handleCloseDatePicker}
                    selectedStartDate={values.travelDates?.startDate}
                    selectedEndDate={values.travelDates?.endDate}
                  />
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
              <div className="activities-input-container">
                <div className="activity-tags-inside-input">
                  {activities.map((activity, index) => (
                    <span key={index} className="activity-tag-inside">
                      <button
                        type="button"
                        className="remove-activity-inside"
                        onClick={() => handleRemoveActivity(index)}
                      >
                        X
                      </button>
                      {activity}
                    </span>
                  ))}
                  <input
                    className="activity-input-field"
                    type="text"
                    name="activity"
                    placeholder="   Activities"
                    id="activity"
                    value={currentActivityInput}
                    onChange={handleActivityInputChange}
                    onKeyDown={handleAddActivity}
                    ref={activityInputRef}
                  />
                </div>
              </div>
            </li>
          </ul>
          <div className="newMain__submitButton">
            <button
              type="submit"
              className="submitButton"
              onClick={handleSubmit}
            >
              Create My Packing List
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewMain;
