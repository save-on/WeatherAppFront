import "./DateRangePicker.css";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

function DateRangePicker({ onDateChange, onClose }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateRange, setDateRange] = useState(null);

  const handleDateSelection = (dates) => {
    const [start, end] = dates;

    if (start && !end) {
      setStartDate(start);
      setEndDate(null);
    } else if (start && end && end >= start) {
      setStartDate(start);
      setEndDate(end);

      if (onDateChange) {
        onDateChange(start, end);
      }
    } else if (start) {
      setStartDate(start);
      setEndDate(null);
    }
  };

  const handleCancel = () => {
    setStartDate(null);
    setEndDate(null);
    if (onClose) {
      onClose();
    }
  };

  const formatDateDisplay = (date) => {
    if (date) {
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    }
    return "";
  };

  return (
    <div className="dateRangePicker__container">
      <DatePicker
        selected={startDate}
        onChange={handleDateSelection}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        monthsShown={2}
        formatMonth={(date) => {
          const options = { month: "long" };
          return new Intl.DateTimeFormat("en-US", options).format(date);
        }}
      />
      <div className="dateRangePicker__footer">
        <div className="dateRangePicker__footer-left">
          {startDate && endDate ? (
            <>
              <span className="selected-date-box">
                {formatDateDisplay(startDate)}
              </span>{" "}
              To{" "}
              <span className="selected-date-box">
                {formatDateDisplay(endDate)}
              </span>
            </>
          ) : startDate ? (
            <>
              <span className="selected-date-box">
                {formatDateDisplay(startDate)}
              </span>{" "}
              To
            </>
          ) : (
            <>
              <span className="selected-date-box">Select Dates</span>
            </>
          )}
        </div>
        <div className="dateRangePicker__footer-right">
          <button
            type="button"
            className="dateRangePicker__button dateRangePicker__button-cancel"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="dateRangePicker__button dateRangePicker__button-submit"
            onClick={() => {
              if (startDate && endDate && onClose) onClose();
            }}
          >
            Select Dates
          </button>
        </div>
      </div>
    </div>
  );
}

export default DateRangePicker;
