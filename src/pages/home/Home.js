import React, { useState } from 'react'
import Styles from './Home.scss'
import { Link } from 'react-router-dom'
import {  FaCog, FaRegTrashAlt  } from 'react-icons/fa'
import { SlClose } from 'react-icons/sl'

const Home = () => {
  const [settingsState, setSettingsState] = useState({
    open: false
  })

  return (
    <div className='home'>
      <h1>R&R Pillar<br />Wheels of Fortune</h1>
      <p>Click the name of a pillar to go to it's wheel, or click the gear icon to edit it's list of names.</p>
      <div className="pillar">
        <Link to='wanderlust'>WanderLust</Link>
        <span className='pillar-icon'>
          { settingsState.open ? <SlClose size="2rem" fill='#2c2c2c' /> : <FaCog size="2rem" /> }
        </span>
      </div>
      <div className="pillar">
        <Link to='digital'>Digital</Link>
        <span className='pillar-icon'>
          { settingsState.open ? <SlClose size="2rem" fill='#2c2c2c' /> : <FaCog size="2rem" /> }
        </span>
      </div>
      <div className="pillar">
        <Link to='evolve'>Evolve</Link>
        <span className='pillar-icon'>
          { settingsState.open ? <SlClose size="2rem" fill='#2c2c2c' /> : <FaCog size="2rem" /> }
        </span>
      </div>
      <div className="pillar">
        <Link to='purpose'>Purpose</Link>
        <span className='pillar-icon'>
          { settingsState.open ? <SlClose size="2rem" fill='#2c2c2c' /> : <FaCog size="2rem" /> }
        </span>
      </div>
    </div>
  )
}

export default Home