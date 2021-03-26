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

const DateTimeInput = (match) => {

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
      <div class="padding">
        <div class="container">
          <div class="item1">
            <svg class="back" width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.9998 19L0.999817 9.76923L10.4998 1" stroke="#828282" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <div class="item2">
            <svg class="logo" width="91" height="23" viewBox="0 0 91 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 3.33871C0 1.49479 1.49479 0 3.33871 0H11.3763C13.2886 0 14.8387 1.55015 14.8387 3.46237V6.67742H3.33871C1.49479 6.67742 0 5.18263 0 3.33871V3.33871Z" fill="#5AA6F8" />
              <path d="M0 11.4998C0 9.65592 1.49479 8.16113 3.33871 8.16113H14.8387V11.3762C14.8387 13.2884 13.2886 14.8386 11.3763 14.8386H3.33871C1.49479 14.8386 0 13.3438 0 11.4998V11.4998Z" fill="#5AA6F8" />
              <path d="M19.6613 -1.4594e-07C21.5052 -6.53394e-08 23 1.49479 23 3.33871L23 11.3763C23 13.2886 21.4498 14.8387 19.5376 14.8387L16.3226 14.8387L16.3226 3.33871C16.3226 1.49479 17.8174 -2.2654e-07 19.6613 -1.4594e-07V-1.4594e-07Z" fill="#ED6863" />
              <path d="M0 19.7846C0 17.8724 1.55015 16.3223 3.46237 16.3223H23V19.5373C23 21.4495 21.4498 22.9997 19.5376 22.9997H0V19.7846Z" fill="#5AA6F8" />
              <path d="M68.8312 2.23622H55.1264C53.6146 2.23622 52.3891 3.4335 52.3891 4.91041V5.80315H66.0939C67.6056 5.80315 68.8312 4.60587 68.8312 3.12896V2.23622ZM66.7275 6.67717H62.1818L61.9884 9.93701H59.2319L59.0385 6.67717H54.4927L54.6862 9.93701H52.3891V13.4803H68.8312V9.93701H66.5341L66.7275 6.67717ZM51.9055 15.748V19.2913H69.3147V15.748H51.9055Z" fill="#7A8390" />
              <path d="M89.1865 4.67419C89.1865 3.19728 87.961 2 86.4492 2H84.6407V9.34155C84.6407 10.8185 85.8663 12.0157 87.378 12.0157H89.1865V8.75591H91V5.33071H89.1865V4.67419ZM72.2125 6.65354C72.2125 5.20473 72.688 4.07874 73.6391 3.27559C74.6063 2.45669 75.9442 2.04724 77.6529 2.04724C79.3616 2.04724 80.6914 2.45669 81.6425 3.27559C82.6097 4.07874 83.0933 5.20473 83.0933 6.65354V7.48031C83.0933 8.92913 82.6097 10.063 81.6425 10.8819C80.6914 11.685 79.3616 12.0866 77.6529 12.0866C75.9442 12.0866 74.6063 11.685 73.6391 10.8819C72.688 10.063 72.2125 8.92913 72.2125 7.48031V6.65354ZM76.8066 7.71654C76.8066 7.9685 76.8791 8.17323 77.0242 8.33071C77.1854 8.47244 77.395 8.54331 77.6529 8.54331C77.9269 8.54331 78.1365 8.47244 78.2815 8.33071C78.4266 8.17323 78.4992 7.9685 78.4992 7.71654V6.41732C78.4992 6.14961 78.4266 5.94488 78.2815 5.80315C78.1365 5.66142 77.9269 5.59055 77.6529 5.59055C77.395 5.59055 77.1854 5.66142 77.0242 5.80315C76.8791 5.94488 76.8066 6.14961 76.8066 6.41732V7.71654ZM89.1865 16.3622C89.1865 15.3071 88.8238 14.4409 88.0984 13.7638C87.3891 13.0709 86.4864 12.7244 85.3903 12.7244H76.5406C75.4445 12.7244 74.5337 13.0709 73.8083 13.7638C73.0991 14.4409 72.7444 15.3071 72.7444 16.3622C72.7444 17.4173 73.0991 18.2913 73.8083 18.9843C74.5337 19.6614 75.4445 20 76.5406 20H85.3903C86.4864 20 87.3891 19.6614 88.0984 18.9843C88.8238 18.2913 89.1865 17.4173 89.1865 16.3622ZM84.1813 15.9134C84.3103 15.9134 84.4151 15.9606 84.4957 16.0551C84.5924 16.1339 84.6407 16.2362 84.6407 16.3622C84.6407 16.4882 84.5924 16.5984 84.4957 16.6929C84.4151 16.7717 84.3103 16.811 84.1813 16.811H77.7496C77.6206 16.811 77.5078 16.7717 77.4111 16.6929C77.3305 16.5984 77.2902 16.4882 77.2902 16.3622C77.2902 16.2362 77.3305 16.1339 77.4111 16.0551C77.5078 15.9606 77.6206 15.9134 77.7496 15.9134H84.1813Z" fill="#7A8390" />
              <path d="M49 2H44.1863V12.1605H49V2ZM31 9.24246C31 10.7233 32.2978 11.9237 33.8986 11.9237H43.1114V9.22369H35.8137V8.39474H42.8554V5.69474H35.8137V4.88947H43.1114V2.18947H31V9.24246ZM49 12.8711H34.4107C32.8099 12.8711 31.5121 14.0715 31.5121 15.5523V20H46.1014C47.7022 20 49 18.7996 49 17.3188V12.8711ZM44.1863 15.95V16.9211H36.3257V15.95H44.1863Z" fill="#7A8390" />
            </svg>
          </div>
          <div class="item3">

          </div>
        </div>
        <pre class="font">가능한 일정을 모두 선택해주세요.</pre>
        <svg class="all-check" width="107" height="29" viewBox="0 0 107 29" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="0.5" width="106" height="28" rx="14" stroke="#5AA6F8" />
          <path d="M29.8695 16.801V14.403H32.8065V9.772H26.0085V14.403H28.9565V16.801H24.9525V17.549H33.8955V16.801H29.8695ZM26.8775 10.487H31.9265V13.688H26.8775V10.487ZM42.8927 12.621H37.2167V10.267H42.7717V9.53H36.2927V13.347H42.8927V12.621ZM44.0147 14.634H35.0717V15.371H39.0647V18.77H39.9667V15.371H44.0147V14.634ZM54.8668 16.328H55.7798V8.958H54.8668V11.268H52.7108V12.016H54.8668V16.328ZM53.4148 13.996C52.0068 13.468 51.0278 12.17 51.0278 10.795V9.541H50.1258V10.762C50.1258 12.258 49.1358 13.677 47.6618 14.205L48.1348 14.92C49.2898 14.447 50.1588 13.534 50.5878 12.346C51.0168 13.413 51.8418 14.26 52.9418 14.689L53.4148 13.996ZM50.3348 17.857V15.514H49.4328V18.594H56.0108V17.857H50.3348ZM65.2279 8.958V11.521H63.9079V9.134H63.0499V14.865H63.9079V12.258H65.2279V14.931H66.0969V8.958H65.2279ZM62.3899 13.413C61.3669 13.622 60.4759 13.677 59.0679 13.677V12.335H61.8949V11.642H59.0679V10.399H62.0049V9.673H58.1989V14.414H58.8259C60.4099 14.414 61.3339 14.37 62.4779 14.139L62.3899 13.413ZM59.4639 16.174H65.1949V18.814H66.0969V15.448H59.4639V16.174ZM73.741 9.849H71.277V8.848H70.375V9.849H67.922V10.542H73.741V9.849ZM75.545 11.29V8.914H74.643V14.37H75.545V12.038H77.008V11.29H75.545ZM73.191 12.599C73.191 11.587 72.278 10.982 70.826 10.982C69.418 10.982 68.472 11.587 68.472 12.599C68.472 13.611 69.418 14.216 70.826 14.216C72.278 14.216 73.191 13.611 73.191 12.599ZM69.33 12.599C69.33 11.983 69.902 11.653 70.826 11.653C71.75 11.653 72.333 11.983 72.333 12.599C72.333 13.215 71.75 13.545 70.826 13.545C69.902 13.545 69.33 13.215 69.33 12.599ZM70.188 17.065H75.545V14.876H69.275V15.547H74.654V16.405H69.308V18.704H75.908V18.011H70.188V17.065ZM85.5212 8.947V12.841H84.1242V9.167H83.2772V18.308H84.1242V13.578H85.5212V18.803H86.3902V8.947H85.5212ZM79.2072 13.49H82.0122V10.025H78.3052V10.762H81.1322V12.753H78.3382V16.449H78.9872C80.2082 16.449 81.3192 16.405 82.6832 16.174L82.6172 15.426C81.3522 15.646 80.3402 15.69 79.2072 15.701V13.49ZM94.8703 16.801V14.128C95.7063 13.699 96.1683 12.995 96.1683 12.104C96.1683 10.575 94.6833 9.574 92.5823 9.574C90.4923 9.574 88.9963 10.575 88.9963 12.104C88.9963 12.995 89.4803 13.71 90.3163 14.139V16.801H88.1163V17.549H97.0813V16.801H94.8703ZM92.5823 10.278C94.1663 10.278 95.3103 11.004 95.3103 12.104C95.3103 13.204 94.1663 13.93 92.5823 13.93C90.9983 13.93 89.8653 13.204 89.8653 12.104C89.8653 11.004 90.9983 10.278 92.5823 10.278ZM91.2183 14.48C91.6473 14.579 92.0983 14.634 92.5823 14.634C93.0333 14.634 93.4953 14.579 93.9683 14.48V16.801H91.2183V14.48Z" fill="#5AA6F8" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0465 17.4999C12.9042 17.4999 12.768 17.4334 12.6705 17.3162L10.162 14.2951C9.96646 14.0606 9.97729 13.6913 10.1847 13.4708C10.3925 13.2503 10.7191 13.262 10.9135 13.4965L13.0414 16.0579L17.3786 10.6901C17.5715 10.4515 17.8975 10.4358 18.108 10.6528C18.3179 10.8698 18.3324 11.239 18.1405 11.4764L13.4272 17.3098C13.3308 17.4299 13.1936 17.4988 13.0502 17.4999H13.0465Z" fill="#5AA6F8" />
        </svg>
      </div>
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
      <div className="padding">
        <p class="month-day">시간 선택 - {selectedDay.month}월 {selectedDay.day}일</p>
        <ScrollMenu
          data={menu}
          selected={selectedTime}
          onSelect={onSelectTime}
          inertiaScrolling={true}
          inertiaScrollingSlowdown={0.7}
        />
        <svg class="guide" width="221" height="14" viewBox="0 0 221 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.799 4.016H20.643V3.268H22.799V0.958H23.712V8.328H22.799V4.016ZM20.874 6.689C20.324 6.47633 19.8473 6.16833 19.444 5.765C19.0407 5.35433 18.7327 4.88133 18.52 4.346C18.3073 4.94 17.9883 5.46067 17.563 5.908C17.145 6.348 16.6463 6.68533 16.067 6.92L15.594 6.205C15.9607 6.073 16.2943 5.88967 16.595 5.655C16.903 5.42033 17.1633 5.15267 17.376 4.852C17.596 4.544 17.7647 4.214 17.882 3.862C17.9993 3.50267 18.058 3.136 18.058 2.762V1.541H18.96V2.795C18.96 3.13967 19.0187 3.477 19.136 3.807C19.2533 4.12967 19.4147 4.434 19.62 4.72C19.8327 4.99867 20.0857 5.248 20.379 5.468C20.6723 5.688 20.995 5.864 21.347 5.996L20.874 6.689ZM23.943 9.857V10.594H17.365V7.514H18.267V9.857H23.943ZM34.0291 0.958V6.931H33.1601V4.258H31.8401V6.865H30.9821V1.134H31.8401V3.521H33.1601V0.958H34.0291ZM30.4101 6.139C30.1241 6.19767 29.8455 6.24533 29.5741 6.282C29.3101 6.31867 29.0351 6.348 28.7491 6.37C28.4631 6.38467 28.1588 6.39567 27.8361 6.403C27.5135 6.41033 27.1541 6.414 26.7581 6.414H26.1311V1.673H29.9371V2.399H27.0001V3.642H29.8271V4.335H27.0001V5.677C27.3521 5.677 27.6748 5.67333 27.9681 5.666C28.2615 5.65867 28.5401 5.644 28.8041 5.622C29.0681 5.6 29.3211 5.57433 29.5631 5.545C29.8125 5.50833 30.0655 5.46433 30.3221 5.413L30.4101 6.139ZM27.3961 7.448H34.0291V10.814H33.1271V8.174H27.3961V7.448ZM43.5763 4.357H36.9983V1.101H37.8893V2.036H42.6853V1.101H43.5763V4.357ZM42.6853 2.718H37.8893V3.664H42.6853V2.718ZM40.7273 5.886V6.854H43.5983V9.054H37.8013V10.011H43.8953V10.704H36.9213V8.394H42.7073V7.536H36.8883V6.854H39.8253V5.886H35.8103V5.16H44.7423V5.886H40.7273ZM55.1144 5.699H53.5304V10.814H52.6284V0.947H53.5304V4.951H55.1144V5.699ZM50.9784 2.003C50.9784 2.707 50.8941 3.389 50.7254 4.049C50.5568 4.709 50.2928 5.336 49.9334 5.93C49.5741 6.524 49.1121 7.07767 48.5474 7.591C47.9828 8.097 47.3008 8.548 46.5014 8.944L46.0064 8.24C47.2971 7.59467 48.2724 6.81733 48.9324 5.908C49.5998 4.99867 49.9848 3.94633 50.0874 2.751H46.4684V2.003H50.9784Z" fill="#8A8A8A" />
          <rect x="0.5" y="1.5" width="10" height="10" fill="#EDEDED" stroke="#C5C5C5" />
          <path d="M86.799 4.016H84.643V3.268H86.799V0.958H87.712V8.328H86.799V4.016ZM84.874 6.689C84.324 6.47633 83.8473 6.16833 83.444 5.765C83.0407 5.35433 82.7327 4.88133 82.52 4.346C82.3073 4.94 81.9883 5.46067 81.563 5.908C81.145 6.348 80.6463 6.68533 80.067 6.92L79.594 6.205C79.9607 6.073 80.2943 5.88967 80.595 5.655C80.903 5.42033 81.1633 5.15267 81.376 4.852C81.596 4.544 81.7647 4.214 81.882 3.862C81.9993 3.50267 82.058 3.136 82.058 2.762V1.541H82.96V2.795C82.96 3.13967 83.0187 3.477 83.136 3.807C83.2533 4.12967 83.4147 4.434 83.62 4.72C83.8327 4.99867 84.0857 5.248 84.379 5.468C84.6723 5.688 84.995 5.864 85.347 5.996L84.874 6.689ZM87.943 9.857V10.594H81.365V7.514H82.267V9.857H87.943ZM98.0291 0.958V6.931H97.1601V4.258H95.8401V6.865H94.9821V1.134H95.8401V3.521H97.1601V0.958H98.0291ZM94.4101 6.139C94.1241 6.19767 93.8455 6.24533 93.5741 6.282C93.3101 6.31867 93.0351 6.348 92.7491 6.37C92.4631 6.38467 92.1588 6.39567 91.8361 6.403C91.5135 6.41033 91.1541 6.414 90.7581 6.414H90.1311V1.673H93.9371V2.399H91.0001V3.642H93.8271V4.335H91.0001V5.677C91.3521 5.677 91.6748 5.67333 91.9681 5.666C92.2615 5.65867 92.5401 5.644 92.8041 5.622C93.0681 5.6 93.3211 5.57433 93.5631 5.545C93.8125 5.50833 94.0655 5.46433 94.3221 5.413L94.4101 6.139ZM91.3961 7.448H98.0291V10.814H97.1271V8.174H91.3961V7.448ZM108.995 5.699H107.411V10.814H106.509V0.947H107.411V4.951H108.995V5.699ZM104.859 2.003C104.859 2.707 104.775 3.389 104.606 4.049C104.438 4.709 104.174 5.336 103.814 5.93C103.455 6.524 102.993 7.07767 102.428 7.591C101.864 8.097 101.182 8.548 100.382 8.944L99.8873 8.24C101.178 7.59467 102.153 6.81733 102.813 5.908C103.481 4.99867 103.866 3.94633 103.968 2.751H100.349V2.003H104.859ZM117.849 4.423H111.15V1.156H112.052V3.697H117.849V4.423ZM118.872 5.567V6.304H109.951V5.567H118.872ZM114.395 7.184C115.444 7.184 116.269 7.34167 116.87 7.657C117.472 7.97233 117.772 8.416 117.772 8.988C117.772 9.56 117.472 10 116.87 10.308C116.269 10.6233 115.444 10.781 114.395 10.781C113.347 10.781 112.522 10.6233 111.92 10.308C111.319 10 111.018 9.56 111.018 8.988C111.018 8.416 111.319 7.97233 111.92 7.657C112.522 7.34167 113.347 7.184 114.395 7.184ZM114.395 10.077C115.173 10.077 115.778 9.98533 116.21 9.802C116.643 9.61133 116.859 9.34 116.859 8.988C116.859 8.636 116.643 8.36467 116.21 8.174C115.778 7.98333 115.173 7.888 114.395 7.888C113.618 7.888 113.013 7.98333 112.58 8.174C112.148 8.36467 111.931 8.636 111.931 8.988C111.931 9.34 112.148 9.61133 112.58 9.802C113.013 9.98533 113.618 10.077 114.395 10.077Z" fill="#8A8A8A" />
          <rect x="65.5" y="1.5" width="9" height="10" fill="white" stroke="#C5C5C5" />
          <path d="M150.799 4.016H148.643V3.268H150.799V0.958H151.712V8.328H150.799V4.016ZM148.874 6.689C148.324 6.47633 147.847 6.16833 147.444 5.765C147.041 5.35433 146.733 4.88133 146.52 4.346C146.307 4.94 145.988 5.46067 145.563 5.908C145.145 6.348 144.646 6.68533 144.067 6.92L143.594 6.205C143.961 6.073 144.294 5.88967 144.595 5.655C144.903 5.42033 145.163 5.15267 145.376 4.852C145.596 4.544 145.765 4.214 145.882 3.862C145.999 3.50267 146.058 3.136 146.058 2.762V1.541H146.96V2.795C146.96 3.13967 147.019 3.477 147.136 3.807C147.253 4.12967 147.415 4.434 147.62 4.72C147.833 4.99867 148.086 5.248 148.379 5.468C148.672 5.688 148.995 5.864 149.347 5.996L148.874 6.689ZM151.943 9.857V10.594H145.365V7.514H146.267V9.857H151.943ZM162.029 0.958V6.931H161.16V4.258H159.84V6.865H158.982V1.134H159.84V3.521H161.16V0.958H162.029ZM158.41 6.139C158.124 6.19767 157.845 6.24533 157.574 6.282C157.31 6.31867 157.035 6.348 156.749 6.37C156.463 6.38467 156.159 6.39567 155.836 6.403C155.513 6.41033 155.154 6.414 154.758 6.414H154.131V1.673H157.937V2.399H155V3.642H157.827V4.335H155V5.677C155.352 5.677 155.675 5.67333 155.968 5.666C156.261 5.65867 156.54 5.644 156.804 5.622C157.068 5.6 157.321 5.57433 157.563 5.545C157.812 5.50833 158.065 5.46433 158.322 5.413L158.41 6.139ZM155.396 7.448H162.029V10.814H161.127V8.174H155.396V7.448Z" fill="#8A8A8A" />
          <rect x="129.5" y="1.5" width="9.74629" height="9.74629" fill="#5AA6F8" stroke="#5AA6F8" />
          <path d="M188.954 0.947V10.814H188.085V5.655H186.743V10.319H185.896V1.211H186.743V4.918H188.085V0.947H188.954ZM184.807 2.223C184.807 2.861 184.745 3.48433 184.62 4.093C184.503 4.69433 184.301 5.27 184.015 5.82C183.729 6.37 183.348 6.89067 182.871 7.382C182.402 7.866 181.815 8.306 181.111 8.702L180.583 8.053C181.155 7.73033 181.643 7.382 182.046 7.008C182.449 6.62667 182.783 6.22333 183.047 5.798C183.311 5.36533 183.513 4.91433 183.652 4.445C183.791 3.96833 183.879 3.47333 183.916 2.96H180.957V2.223H184.807ZM198.798 8.163H197.896V0.958H198.798V8.163ZM196.081 4.06C196.081 4.41933 196.015 4.74933 195.883 5.05C195.751 5.34333 195.568 5.6 195.333 5.82C195.106 6.03267 194.834 6.20133 194.519 6.326C194.204 6.44333 193.863 6.502 193.496 6.502C193.129 6.502 192.788 6.44333 192.473 6.326C192.165 6.20133 191.894 6.03267 191.659 5.82C191.432 5.6 191.252 5.34333 191.12 5.05C190.995 4.74933 190.933 4.41933 190.933 4.06C190.933 3.708 190.995 3.38533 191.12 3.092C191.252 2.79133 191.432 2.53467 191.659 2.322C191.894 2.102 192.165 1.93333 192.473 1.816C192.788 1.69867 193.129 1.64 193.496 1.64C193.863 1.64 194.204 1.69867 194.519 1.816C194.834 1.93333 195.106 2.102 195.333 2.322C195.568 2.53467 195.751 2.79133 195.883 3.092C196.015 3.38533 196.081 3.708 196.081 4.06ZM191.813 4.06C191.813 4.302 191.853 4.52567 191.934 4.731C192.022 4.93633 192.139 5.11233 192.286 5.259C192.44 5.40567 192.62 5.51933 192.825 5.6C193.03 5.68067 193.254 5.721 193.496 5.721C193.738 5.721 193.962 5.68067 194.167 5.6C194.38 5.51933 194.563 5.40567 194.717 5.259C194.871 5.11233 194.988 4.93633 195.069 4.731C195.157 4.52567 195.201 4.302 195.201 4.06C195.201 3.818 195.157 3.598 195.069 3.4C194.988 3.202 194.871 3.02967 194.717 2.883C194.563 2.73633 194.38 2.62267 194.167 2.542C193.962 2.46133 193.738 2.421 193.496 2.421C193.254 2.421 193.03 2.46133 192.825 2.542C192.62 2.62267 192.44 2.73633 192.286 2.883C192.139 3.02967 192.022 3.202 191.934 3.4C191.853 3.598 191.813 3.818 191.813 4.06ZM199.095 9.857V10.594H192.451V7.426H193.353V9.857H199.095ZM208.917 6.007H208.015V0.947H208.917V6.007ZM206.145 3.499C206.145 3.82167 206.079 4.11867 205.947 4.39C205.823 4.654 205.647 4.88133 205.419 5.072C205.192 5.26267 204.921 5.413 204.605 5.523C204.297 5.62567 203.96 5.677 203.593 5.677C203.227 5.677 202.886 5.62567 202.57 5.523C202.262 5.413 201.995 5.26267 201.767 5.072C201.547 4.88133 201.371 4.654 201.239 4.39C201.115 4.11867 201.052 3.82167 201.052 3.499C201.052 3.169 201.115 2.872 201.239 2.608C201.371 2.33667 201.547 2.10567 201.767 1.915C201.995 1.717 202.262 1.56667 202.57 1.464C202.886 1.354 203.227 1.299 203.593 1.299C203.96 1.299 204.297 1.354 204.605 1.464C204.921 1.56667 205.192 1.717 205.419 1.915C205.647 2.10567 205.823 2.33667 205.947 2.608C206.079 2.872 206.145 3.169 206.145 3.499ZM201.921 3.499C201.921 3.70433 201.962 3.89867 202.042 4.082C202.13 4.258 202.248 4.412 202.394 4.544C202.548 4.66867 202.724 4.76767 202.922 4.841C203.128 4.91433 203.351 4.951 203.593 4.951C203.835 4.951 204.059 4.91433 204.264 4.841C204.47 4.76767 204.646 4.66867 204.792 4.544C204.939 4.412 205.053 4.258 205.133 4.082C205.221 3.89867 205.265 3.70433 205.265 3.499C205.265 3.28633 205.221 3.092 205.133 2.916C205.053 2.73267 204.939 2.57867 204.792 2.454C204.646 2.322 204.47 2.21933 204.264 2.146C204.059 2.07267 203.835 2.036 203.593 2.036C203.351 2.036 203.128 2.07267 202.922 2.146C202.724 2.21933 202.548 2.322 202.394 2.454C202.248 2.57867 202.13 2.73267 202.042 2.916C201.962 3.092 201.921 3.28633 201.921 3.499ZM209.247 9.967V10.682H202.548V8.207H208.026V7.206H202.526V6.491H208.917V8.878H203.439V9.967H209.247ZM218.156 3.51V0.958H219.069V6.832H218.156V4.247H216.209V3.51H218.156ZM216.308 6.458C215.758 6.26 215.278 5.96667 214.867 5.578C214.457 5.18933 214.145 4.742 213.932 4.236C213.72 4.808 213.397 5.314 212.964 5.754C212.532 6.194 212.026 6.524 211.446 6.744L210.973 6.029C211.34 5.897 211.674 5.71733 211.974 5.49C212.282 5.26267 212.546 5.006 212.766 4.72C212.986 4.42667 213.155 4.11133 213.272 3.774C213.397 3.43667 213.459 3.092 213.459 2.74V2.399H211.259V1.673H216.528V2.399H214.361V2.74C214.361 3.05533 214.42 3.367 214.537 3.675C214.655 3.983 214.816 4.27267 215.021 4.544C215.234 4.808 215.487 5.04633 215.78 5.259C216.074 5.46433 216.4 5.62933 216.759 5.754L216.308 6.458ZM215.813 7.14C216.319 7.14 216.774 7.18033 217.177 7.261C217.581 7.34167 217.925 7.46267 218.211 7.624C218.497 7.778 218.714 7.96867 218.86 8.196C219.014 8.42333 219.091 8.68367 219.091 8.977C219.091 9.27033 219.014 9.53067 218.86 9.758C218.714 9.98533 218.497 10.176 218.211 10.33C217.925 10.4913 217.581 10.6123 217.177 10.693C216.774 10.7737 216.319 10.814 215.813 10.814C215.307 10.814 214.849 10.7737 214.438 10.693C214.035 10.6123 213.69 10.4913 213.404 10.33C213.126 10.176 212.909 9.98533 212.755 9.758C212.601 9.53067 212.524 9.27033 212.524 8.977C212.524 8.68367 212.601 8.42333 212.755 8.196C212.909 7.96867 213.126 7.778 213.404 7.624C213.69 7.46267 214.035 7.34167 214.438 7.261C214.849 7.18033 215.307 7.14 215.813 7.14ZM215.813 10.11C216.569 10.11 217.155 10.011 217.573 9.813C217.991 9.615 218.2 9.33633 218.2 8.977C218.2 8.61767 217.991 8.339 217.573 8.141C217.155 7.93567 216.569 7.833 215.813 7.833C215.058 7.833 214.471 7.93567 214.053 8.141C213.635 8.339 213.426 8.61767 213.426 8.977C213.426 9.33633 213.635 9.615 214.053 9.813C214.471 10.011 215.058 10.11 215.813 10.11Z" fill="#8A8A8A" />
          <circle cx="174.5" cy="6.5" r="2.5" fill="#ED6863" />
          <path d="M136.402 4.57859C136.279 4.46669 136.089 4.47532 135.977 4.59785L134.003 6.75473L133.022 5.7003C132.909 5.57868 132.718 5.57158 132.596 5.68446C132.474 5.79734 132.467 5.98744 132.58 6.10907L133.762 7.37953C133.773 7.39439 133.786 7.40843 133.8 7.42141C133.923 7.53331 134.113 7.52468 134.226 7.40215L136.421 5.00305C136.533 4.88052 136.525 4.69048 136.402 4.57859Z" fill="white" />
        </svg>
        <button className="button1"> 다음 </button>
      </div>
    </div>
  );
};

export default DateTimeInput;
