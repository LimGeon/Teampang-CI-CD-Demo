import React, { Component } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import './Timepicker.css';

// list of items
const list = [];
let selectedList = [];
const minimumTime = 18;
const maximumTime = 22;

for(let i = 0; i<24; i++){
  let input = {name: i}
  list.push(input)
  if(minimumTime <= i && i<=maximumTime){
    selectedList.push(-1);
  }else{
    selectedList.push(0);
  }
};

// One item component
// selected prop will be passed
const MenuItem = ({text, isSelected}) => {
  return <div
    className={`menu-item ${isSelected === 1 ? 'active' : (isSelected === 0 ? 'inable' : '')}`}
    >{text}</div>;
};

// All items component
// Important! add unique key
export const Menu = (list) =>
  list.map((el, index) => {
    const {name} = el;
    return <MenuItem text={name} key={name} isSelected={selectedList[index]} />;
  });

const selected = '';

class Timepicker extends Component {
  constructor(props) {
    super(props);
    // call it again if items count changes
    this.menuItems = Menu(list, selected, selectedList);
  }

  state = {
    selected,
    selectedList
  };

  onSelect = key => {
    this.setState({ selected: key });
    selectedList[key]*=-1;
    this.setState({selectedList: selectedList})
    this.menuItems = Menu(list, selected, selectedList);
    this.props.sendAvailableTime(this.state.selectedList);
  }
  

  render() {
    //this.setState({selectedList: this.props.nowAvailableTime});
    const { selected } = this.state;
    // Create menu from items
    const menu = this.menuItems;
    selectedList = this.props.nowAvailableTime;
    return (
      <div className="Timepicker">
        <p>시간 선택 - {this.props.selectedMonth}월 {this.props.selectedDay}일</p>
        <ScrollMenu
          data={menu}
          selected={selected}
          onSelect={this.onSelect}
        />
      </div>
    );
  }
}

export default Timepicker;