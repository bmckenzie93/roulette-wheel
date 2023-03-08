import React, { useState } from 'react'
import Styles from './Sidebar.scss'
import Data from "../../Data/Data.js"
import {  FaCog  } from 'react-icons/fa'
import { SlClose } from 'react-icons/sl'

const Sidebar = ({data}) => {
  /*
    TO DO:
    settings form to add, remove, edit people on the list.
    ability to diable people that are on the list and disable the last person chosen  
  */

    const [settingsState, setSettingsState] = useState({
      open: false
    })

    const handleMenuOpen = () => {
      console.log('menu open')
      setSettingsState({
        ...settingsState,
        open: !settingsState.open
      })
    }

  return (
  <>
      <span className='sidebar-icon' onClick={handleMenuOpen}>
        { settingsState.open ? <SlClose size="2rem" fill='#2c2c2c' /> : <FaCog size="2rem" /> }
      </span>

      <div className={`sidebar ${settingsState.open && 'show'}`}>
        <form className='sidebar-settings'>
        <h2 className='sidebar-settings-title'>settings</h2>

        </form>
      </div>
    </>
  )
}

export default Sidebar