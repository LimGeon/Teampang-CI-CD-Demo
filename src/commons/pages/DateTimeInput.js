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
        <path d="M26.4527 15.2514C26.0607 14.8935 25.4529 14.9211 25.095 15.313L18.7954 22.2118L15.6654 18.8392C15.3043 18.4501 14.6963 18.4275 14.3073 18.7885C13.9183 19.1495 13.8956 19.7576 14.2566 20.1466L18.0279 24.2101C18.0635 24.2577 18.1041 24.3026 18.1496 24.3441C18.5415 24.702 19.1493 24.6744 19.5072 24.2825L26.5143 16.609C26.8722 16.2171 26.8446 15.6092 26.4527 15.2514Z" fill={isSelected === 1 ? "white" : (isSelected === 0 ? '#EDEDED' : "white")} />
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
    setSelectFlag(selectFlag * -1);
  }

  useEffect(() => {
    let newSelectedList = [...selectedList];
    newSelectedList[selectedTime] *= -1;
    setSelectedList(newSelectedList);
    availableDateTime[`${selectedDay.year}-${selectedDay.month}-${selectedDay.day}`] = [...newSelectedList];
    let existAvailableTime = false;
    for (let i = 0; i < 24; i++) {
      if (availableDateTime[`${selectedDay.year}-${selectedDay.month}-${selectedDay.day}`][i] === 1) {
        existAvailableTime = true;
      }
    }

    const idx = availableDay.findIndex(function (item) { return item.name === `${selectedDay.year}-${selectedDay.month}-${selectedDay.day}` });
    if (existAvailableTime === true) {
      let availableDay_tmp = { year: selectedDay.year, month: selectedDay.month, day: selectedDay.day, className: 'availableDay', name: `${selectedDay.year}-${selectedDay.month}-${selectedDay.day}` };
      if (idx === -1) {
        availableDay.push(availableDay_tmp);
      }
    }
    else if (existAvailableTime === false) {
      delete availableDateTime[`${selectedDay.year}-${selectedDay.month}-${selectedDay.day}`];
      if (idx !== -1) {
        availableDay.splice(idx, 1);
      }
    }
    console.log(availableDateTime);
  }, [selectedTime, selectFlag]);

  useEffect(() => {
    if (`${selectedDay.year}-${selectedDay.month}-${selectedDay.day}` in availableDateTime) {
      setSelectedList(availableDateTime[`${selectedDay.year}-${selectedDay.month}-${selectedDay.day}`])
    }
    else {
      setSelectedList(initSelectedList);
    }
  }, [selectedDay]);


  return (
    <div>
      <svg class="all-check" width="107" height="29" viewBox="0 0 107 29" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="106" height="28" rx="14" stroke="#5AA6F8" />
        <path d="M29.8695 16.801V14.403H32.8065V9.772H26.0085V14.403H28.9565V16.801H24.9525V17.549H33.8955V16.801H29.8695ZM26.8775 10.487H31.9265V13.688H26.8775V10.487ZM42.8927 12.621H37.2167V10.267H42.7717V9.53H36.2927V13.347H42.8927V12.621ZM44.0147 14.634H35.0717V15.371H39.0647V18.77H39.9667V15.371H44.0147V14.634ZM54.8668 16.328H55.7798V8.958H54.8668V11.268H52.7108V12.016H54.8668V16.328ZM53.4148 13.996C52.0068 13.468 51.0278 12.17 51.0278 10.795V9.541H50.1258V10.762C50.1258 12.258 49.1358 13.677 47.6618 14.205L48.1348 14.92C49.2898 14.447 50.1588 13.534 50.5878 12.346C51.0168 13.413 51.8418 14.26 52.9418 14.689L53.4148 13.996ZM50.3348 17.857V15.514H49.4328V18.594H56.0108V17.857H50.3348ZM65.2279 8.958V11.521H63.9079V9.134H63.0499V14.865H63.9079V12.258H65.2279V14.931H66.0969V8.958H65.2279ZM62.3899 13.413C61.3669 13.622 60.4759 13.677 59.0679 13.677V12.335H61.8949V11.642H59.0679V10.399H62.0049V9.673H58.1989V14.414H58.8259C60.4099 14.414 61.3339 14.37 62.4779 14.139L62.3899 13.413ZM59.4639 16.174H65.1949V18.814H66.0969V15.448H59.4639V16.174ZM73.741 9.849H71.277V8.848H70.375V9.849H67.922V10.542H73.741V9.849ZM75.545 11.29V8.914H74.643V14.37H75.545V12.038H77.008V11.29H75.545ZM73.191 12.599C73.191 11.587 72.278 10.982 70.826 10.982C69.418 10.982 68.472 11.587 68.472 12.599C68.472 13.611 69.418 14.216 70.826 14.216C72.278 14.216 73.191 13.611 73.191 12.599ZM69.33 12.599C69.33 11.983 69.902 11.653 70.826 11.653C71.75 11.653 72.333 11.983 72.333 12.599C72.333 13.215 71.75 13.545 70.826 13.545C69.902 13.545 69.33 13.215 69.33 12.599ZM70.188 17.065H75.545V14.876H69.275V15.547H74.654V16.405H69.308V18.704H75.908V18.011H70.188V17.065ZM85.5212 8.947V12.841H84.1242V9.167H83.2772V18.308H84.1242V13.578H85.5212V18.803H86.3902V8.947H85.5212ZM79.2072 13.49H82.0122V10.025H78.3052V10.762H81.1322V12.753H78.3382V16.449H78.9872C80.2082 16.449 81.3192 16.405 82.6832 16.174L82.6172 15.426C81.3522 15.646 80.3402 15.69 79.2072 15.701V13.49ZM94.8703 16.801V14.128C95.7063 13.699 96.1683 12.995 96.1683 12.104C96.1683 10.575 94.6833 9.574 92.5823 9.574C90.4923 9.574 88.9963 10.575 88.9963 12.104C88.9963 12.995 89.4803 13.71 90.3163 14.139V16.801H88.1163V17.549H97.0813V16.801H94.8703ZM92.5823 10.278C94.1663 10.278 95.3103 11.004 95.3103 12.104C95.3103 13.204 94.1663 13.93 92.5823 13.93C90.9983 13.93 89.8653 13.204 89.8653 12.104C89.8653 11.004 90.9983 10.278 92.5823 10.278ZM91.2183 14.48C91.6473 14.579 92.0983 14.634 92.5823 14.634C93.0333 14.634 93.4953 14.579 93.9683 14.48V16.801H91.2183V14.48Z" fill="#5AA6F8" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0465 17.4999C12.9042 17.4999 12.768 17.4334 12.6705 17.3162L10.162 14.2951C9.96646 14.0606 9.97729 13.6913 10.1847 13.4708C10.3925 13.2503 10.7191 13.262 10.9135 13.4965L13.0414 16.0579L17.3786 10.6901C17.5715 10.4515 17.8975 10.4358 18.108 10.6528C18.3179 10.8698 18.3324 11.239 18.1405 11.4764L13.4272 17.3098C13.3308 17.4299 13.1936 17.4988 13.0502 17.4999H13.0465Z" fill="#5AA6F8" />
      </svg>
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
        <p class="month-day">시간 선택 - {selectedDay.month}월 {selectedDay.day}일</p>
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
