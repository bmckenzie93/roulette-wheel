import React, { useState } from "react";
import Data from "../../Data/Data.js"
import Styles from "./Wheel.scss"; 

const Wheel = () => {
  // STATES
  const [nameArray, setNameArray] = useState(Data)
  const [wheelState, setWheelState] = useState({
    showItems: false,
    spinning: false,
    selected: 0,
  })

  // EVENTS
  const handleClickWheel = () => {
    let randomNum = Math.floor(Math.random() * (( nameArray.length  ) - 0) + 0)

    setWheelState({
      ...wheelState,
      showItems: true,
      spinning: true,
      selected: randomNum,
      placement: `transform: translateY(-50%) rotate(calc(${randomNum}*360deg/${nameArray.length}))`
    })
  }


  // MAPS
  const wheelItems = nameArray.map( (name, index) => {
    const wheelPlacement = { 
      transform: `translateY(-50%) rotate(calc(${index}*360deg/${nameArray.length}))`
    }

    return (
    <div key={index} 
        className={`wheel-item animated ${wheelState.showItems && 'fadeIn'} ${wheelState.selected === index && 'selected'}`}
        style={wheelPlacement}>
      {name}
    </div>
  )})

  // MAIN
  return (
    <main>
      <div className="container main-container">
        <h3 className="notice">Click the wheel to spin</h3>
        <div className="wheel-container">

          <div 
            className= {`wheel animated fadeIn ${wheelState.spinning && 'spinning '}`} 
            onClick={handleClickWheel} >
            
            {wheelItems}
          </div>
        </div>

        <div className="person-selected">
          <div className="person-selected__name">
            <button
              className=" "
              tabIndex="0"
              type="button">
              <span>SELECT {nameArray[wheelState.selected]}</span>
              <span> {wheelState.selected}</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Wheel;
