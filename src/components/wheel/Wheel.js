import React, { useState } from "react";
import Styles from "./Wheel.scss"; 

const Wheel = (props) => {
  /*
    TO DO LIST:
    -list names alphabetically + capitalize first letter of each word
    -add, remove, exclude people
    -firebase back end
    -routes to create 3 iterations of this wheel for each pillar
  */

  // STATE
  const [wheelState, setWheelState] = useState({
    showItems: false,
    spinning: false,
    selected: 0,
    rotationDeg: 0,
    wheelPosition: { transform: 'rotate(0deg)'}
  })

  // EVENTS
  const handleClickWheel = () => {
    let randomNum = Math.floor(Math.random() * props.data.length)

    setWheelState({
      ...wheelState,
      showItems: true,
      spinning: true,
      selected: randomNum,
      rotationDeg: wheelState.rotationDeg + (360*5),
      wheelPosition: {
        transform: `rotate(calc(${wheelState.rotationDeg + (360 * 5) + (randomNum * (-360 / props.data.length))}deg))`
      }
    })
  };

  // MAPS
  let userNames = [];

  props.data.forEach(user => {
    userNames.push(user.name)
  })

  const wheelItems = userNames.map( (user, index) => {
    const wheelItemPlacement = { 
      transform: `translateY(-50%) rotate(calc(${index}*360deg/${userNames.length}))`
    }

    return (
    <div key={index} 
        className={`wheel-item animated ${wheelState.showItems && 'fadeIn'} ${wheelState.selected === index ? 'selected' : ''}`}
        style={wheelItemPlacement}>
      {user}
    </div>
  )})
  

  let wheelPosition = {
    transform: `rotate(calc(${wheelState.selected}*360deg/${props.data.length}))`,
    transform: `rotate(calc(5*360deg + -360deg*var(--selected-item)/var(--nb-item, 1)))`
  }

  // MAIN
  return (

    <main>
      <div className="container main-container">
        <h3 className="notice">Click the wheel to spin</h3>
        <div className="wheel-container">

          <div 
            className= {`wheel animated fadeIn ${wheelState.spinning ? 'spinning ' : ''}`} 
            onClick={handleClickWheel}
            style={wheelState.wheelPosition} >
            
            {wheelItems}
          </div>
        </div>

        <div className="person-selected">
          <div className="person-selected__name">
            <button
              className=" "
              tabIndex="0"
              type="button">
              <span>SELECT {userNames[wheelState.selected]}</span>
              <span> {wheelState.selected}</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Wheel;
