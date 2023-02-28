import React, { useState } from "react";

import Styles from "./Wheel.scss"; 
import Data from "../../Data/Data.js"

const Wheel = () => {
  // STATES
  const [nameArray, setNameArray] = useState(Data)
  const [selectedNumber, setSelectedNumber] = useState(0)

  // EVENTS
  const handleSelectNumber = () => {
    const winner = Math.floor(Math.random() * (( nameArray.length + 1 ) - 0) + 0)
    setSelectedNumber(winner)
  }

  // MAPS
  const wheelItems = nameArray.map( (name, index) => {
    const wheelPlacement = { 
      transform: `translateY(-50%) rotate(calc(${index}*360deg/${nameArray.length}))`
    }

    return (
    <div key={index} 
        className="wheel-item animated fadeIn selected"
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

          <div className="wheel animated fadeIn spinning" onClick={handleSelectNumber}>
            {wheelItems}
          </div>
        </div>

        <div className="person-selected">
          <div className="person-selected__name">
            <button
              className=" "
              tabIndex="0"
              type="button">
              <span>SELECT 'SELECTED PERSON'</span>
              <span>{selectedNumber}</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Wheel;
