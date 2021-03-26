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
    return <div
      className={`menu-item ${isSelected === 1 ? 'active' : (isSelected === 0 ? 'inable' : '')}`}
    >{text}</div>;
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
    <div class ="all">
        <Calendar
          value={selectedDay}
          onChange={setSelectedDay}
          colorPrimary="#8ec5ff"
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          customDaysClassName={availableDay}
          calendarClassName="responsive-calendar"
        />
      <div className="Timepicker">
        <p class ="month-day">시간 선택 - {selectedDay.month}월 {selectedDay.day}일</p>
        <ScrollMenu
          data={menu}
          selected={selectedTime}
          onSelect={onSelectTime}
        />
      </div>
    </div>
  );
};

export default DateTimeInput;
