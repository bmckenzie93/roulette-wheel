import React, { useState } from "react";
import Styles from "./Wheel.scss"; 

const Wheel = ({data}) => {
  /*
    TO DO LIST:

    -FIX SPIN: spin 5 times then land correctly

    -list names alphabetically + capitalize first letter of each word
    -corner cog icon to admin sidebar to add and remove people
    -firebase back end
    -routes to create 3 iterations of this wheel for each pillar
    -exclution option for people
  */

  // STATES

  const [wheelState, setWheelState] = useState({
    showItems: false,
    spinning: false,
    selected: 0,
    rotationDeg: 0,
    wheelPosition: { transform: 'rotate(0deg)'}
  })

  // EVENTS
  const handleClickWheel = () => {
    let randomNum = Math.floor(Math.random() * data.length)

    setWheelState({
      ...wheelState,
      showItems: true,
      spinning: true,
      selected: randomNum,
      rotationDeg: wheelState.rotationDeg + (360*5),
      wheelPosition: {
        transform: `rotate(calc(${wheelState.rotationDeg + (360 * 5) + (randomNum * (360 / data.length))}deg))`
      }
    })


  };

  // MAPS
  const wheelItems = data.map( (name, index) => {
    const wheelItemPlacement = { 
      transform: `translateY(-50%) rotate(calc(${index}*360deg/${data.length}))`
    }

    return (
    <div key={index} 
        className={`wheel-item animated ${wheelState.showItems && 'fadeIn'} ${wheelState.selected === index ? 'selected' : ''}`}
        style={wheelItemPlacement}>
      {name}
    </div>
  )})
  

  let wheelPosition = {
    transform: `rotate(calc(${wheelState.selected}*360deg/${data.length}))`,
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
              <span>SELECT {data[wheelState.selected]}</span>
              <span> {wheelState.selected}</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Wheel;
