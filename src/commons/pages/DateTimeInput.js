import React, { useState } from "react";
import "../../assets/css/DatePicker.css"
import { Calendar } from "react-modern-calendar-datepicker";

const DateTimeInput = (props) => {

  const minimumDate = {
    year: 2021,
    month: 2,
    day: 9
  };

  const maximumDate = {
    year: 2021,
    month: 2,
    day: 17
  };

  const [selectedDay, setSelectedDay] = useState(minimumDate);
  return (
    <div>
      <Calendar
        value={selectedDay}
        onChange={setSelectedDay}
        colorPrimary="#8ec5ff"
        minimumDate={minimumDate}
        maximumDate={maximumDate}
      />
    </div>
  );
};

export default DateTimeInput;
