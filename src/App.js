// import React, { useState } from "react";
// import DatePicker from "./commons/components/Pickers/DatePicker";
// import Timepicker from "./Timepicker";



// const App = () => {
//   const [selectedDate, setSelectedDate] = useState(0);
//   const [availableDateTime, setAvailableDateTime] = useState({});
//   const selectedDate_string = String(selectedDate.year)+'-'+String(selectedDate.month)+'-'+String(selectedDate.day);
//   const getAvailableTime = (x) => {
//     const newX = x.slice(0);
//     const new_availableDateTime = {...availableDateTime, [selectedDate_string]:newX}
//     setAvailableDateTime(new_availableDateTime);

//     console.log("key 값: " + selectedDate_string);
//     console.log("value값: " + x);
//     console.log(availableDateTime);
//     console.log(" "); 
    
//   };
  
  
  
//   const getSelectedDate = (x) => {
//     setSelectedDate(x)
//   };


//   const minimumDate = {
//     year: 2021,
//     month: 2,
//     day: 9
//   };

//   const maximumDate = {
//     year: 2021,
//     month: 2,
//     day: 17
//   };

//   const minimumTime = 18;
//   const maximumTime = 22;

//   let nowAvailableTime
//   if(selectedDate_string in availableDateTime){
//     nowAvailableTime = availableDateTime[selectedDate_string];
//   }
//   else{
//     nowAvailableTime = Array.from({length: 24}, () => 0);
//     for(let i = minimumTime; i<=maximumTime; i++){
//       nowAvailableTime[i] = -1;
//     }
//   }

//   return (
//     <div>
//       <DatePicker
//         minimumDate = {minimumDate} //부모 -> 자식
//         maximumDate = {maximumDate} //부모 -> 자식
//         sendSelectedDate = {getSelectedDate} //자식 -> 부모
//       />
//       <Timepicker
//         selectedYear={selectedDate.year}
//         selectedMonth={selectedDate.month}
//         selectedDay={selectedDate.day}
//         minimumTime = {minimumTime}
//         maximumTime = {maximumTime}
//         nowAvailableTime = {nowAvailableTime}
//         sendAvailableTime = {getAvailableTime}
//       />
//     </div>

//   );
// };

// export default App;


import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NameInput from './commons/pages/NameInput.js';
import DateTimeInput from './commons/pages/DateTimeInput.js';
 
class App extends Component {
    render() {
        return (    
            <Switch>
                <Route exact path="/join/:invite_code" component={NameInput}/>
                <Route exact path="/join/:name/:invite_code" component={DateTimeInput}/>
            </Switch>
        );
    }
}

export default App;
