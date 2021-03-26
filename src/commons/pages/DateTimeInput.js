import React, { useState, useEffect } from "react";
import "../../assets/css/DateTimeInput.css"
import { Calendar } from "react-modern-calendar-datepicker";
import ScrollMenu from 'react-horizontal-scrolling-menu';


const minimumDate = {
  year: 2021,
  month: 3,
  day: 9
};

const maximumDate = {
  year: 2021,
  month: 12,
  day: 17
};

const list = [];
const minimumTime = 4;
const maximumTime = 8;

let initSelectedList = []
for (let i = 0; i < 24; i++) {
  let input = { name: i }
  list.push(input)
  if (minimumTime <= i && i <= maximumTime) {
    initSelectedList.push(-1);
  } else {
    initSelectedList.push(0);
  }
};

let availableDateTime = {};
let availableDay = [];

const DateTimeInput = (props) => {

  const [selectedDay, setSelectedDay] = useState(minimumDate);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedList, setSelectedList] = useState(initSelectedList);
  const [selectFlag, setSelectFlag] = useState(1);

  const MenuItem = ({ text, isSelected }) => {
    return <div><div class="time-item">{text}</div><div
      className={`menu-item ${isSelected === 1 ? 'active' : (isSelected === 0 ? 'inable' : '')}`}
    ><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M26.4527 15.2514C26.0607 14.8935 25.4529 14.9211 25.095 15.313L18.7954 22.2118L15.6654 18.8392C15.3043 18.4501 14.6963 18.4275 14.3073 18.7885C13.9183 19.1495 13.8956 19.7576 14.2566 20.1466L18.0279 24.2101C18.0635 24.2577 18.1041 24.3026 18.1496 24.3441C18.5415 24.702 19.1493 24.6744 19.5072 24.2825L26.5143 16.609C26.8722 16.2171 26.8446 15.6092 26.4527 15.2514Z" fill={isSelected === 1 ? "white" : (isSelected === 0 ? '#EDEDED' : "white")}/>
    </svg></div></div>;
  };

  const Menu = (list) =>
    list.map((el, index) => {
      const { name } = el;
      return <MenuItem text={name} key={name} isSelected={selectedList[index]} />;
    });


  const menu = Menu(list, selectedTime, selectedList);

  const onSelectTime = key => {
    setSelectedTime(key);
    setSelectFlag(selectFlag*-1);
  }

  useEffect(() => {
    let newSelectedList = [...selectedList];
    newSelectedList[selectedTime] *= -1;
    setSelectedList(newSelectedList);
    availableDateTime[`${selectedDay.year}-${selectedDay.month}-${selectedDay.day}`] = [...newSelectedList];
    let existAvailableTime = false;
    for(let i=0; i<24; i++){
      if(availableDateTime[`${selectedDay.year}-${selectedDay.month}-${selectedDay.day}`][i] === 1){
        existAvailableTime = true;
      }
    }

    const idx = availableDay.findIndex(function(item) {return item.name === `${selectedDay.year}-${selectedDay.month}-${selectedDay.day}`});
    if(existAvailableTime === true){
      let availableDay_tmp = {year: selectedDay.year, month: selectedDay.month, day: selectedDay.day, className: 'availableDay', name: `${selectedDay.year}-${selectedDay.month}-${selectedDay.day}`};
      if(idx === -1){
        availableDay.push(availableDay_tmp);
      }
    }
    else if(existAvailableTime === false){
      delete availableDateTime[`${selectedDay.year}-${selectedDay.month}-${selectedDay.day}`];
      if(idx !== -1){
        availableDay.splice(idx,1);
      }
    }
    console.log(availableDateTime);
  }, [selectedTime, selectFlag]);

  useEffect(() => {
    if(`${selectedDay.year}-${selectedDay.month}-${selectedDay.day}` in availableDateTime){
      setSelectedList(availableDateTime[`${selectedDay.year}-${selectedDay.month}-${selectedDay.day}`])
    }
    else{
      setSelectedList(initSelectedList);
    }
  }, [selectedDay]);

  
  return (
    <div>
      <div class="calendar-margin">
        <Calendar
          value={selectedDay}
          onChange={setSelectedDay}
          colorPrimary="#8ec5ff"
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          customDaysClassName={availableDay}
          calendarClassName="responsive-calendar"
        />
      </div>
      <div className="Timepicker">
        <p class ="month-day">시간 선택 - {selectedDay.month}월 {selectedDay.day}일</p>
        <ScrollMenu
          data={menu}
          selected={selectedTime}
          onSelect={onSelectTime}
          inertiaScrolling={true}
          inertiaScrollingSlowdown={0.7}
        />
      </div>
    </div>
  );
};

export default DateTimeInput;
