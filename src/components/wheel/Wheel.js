import React, { useState } from "react";
import Styles from "./Wheel.scss"; 

const Wheel = (props) => {
  const [wheelState, setWheelState] = useState({
    showItems: false,
    spinning: false,
    selected: 0,
    rotationDeg: 0,
    wheelPosition: { transform: 'rotate(0deg)'}
  })

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

  let userNames = [];
  props.data.forEach(user => {
    if(!user.disabled) 
    userNames.push(user.name)
  })

  const wheelItems = userNames.sort().map( (user, index) => {
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

  // RENDER
  return (
    <main>
      <div className="container main-container">
        <h3 className="notice">
          {userNames.length < 1 ? 
          'Click settings to add names to the wheel' :
          'Click the wheel to spin!'}
          
          </h3>
        <div className="wheel-container">

          <div 
            className= {`wheel animated fadeIn ${wheelState.spinning ? 'spinning ' : ''}`} 
            onClick={handleClickWheel}
            style={wheelState.wheelPosition} >
            
            {wheelItems}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Wheel;
