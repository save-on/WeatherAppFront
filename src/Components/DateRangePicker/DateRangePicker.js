import "./DateRangePicker.css";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

function DateRangePicker({}) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateSelection = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (onDateChange) {
      onDateChange(start, end);
    }
  };

  const formatDate = (date) => {
    if (date instanceof Date) {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return date.toLocaleDateString(undefined, options);
    }
    return "";
  };

  return (
    <div className="dateRangePicker__container">
      <div className="dateRangePicker__selected-dates">
      </div>
      <DatePicker
        selected={startDate}
        onDateChange={handleDateSelection}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        minDate={new Date()}
      />
    </div>
  );
}

export default DateRangePicker;
