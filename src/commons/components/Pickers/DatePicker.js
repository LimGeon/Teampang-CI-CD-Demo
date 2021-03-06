import React, { useState } from "react";
import "./DatePicker.css"
import { Calendar} from "react-modern-calendar-datepicker";

const DatePicker = (props) => {
    
      const minimumDate = props.minimumDate;
      const maximumDate = props.maximumDate;

  const [selectedDay, setSelectedDay] = useState(minimumDate);

  props.sendSelectedDate(selectedDay);
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

export default DatePicker;
