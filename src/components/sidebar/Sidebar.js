import React, { useState } from 'react'
import Styles from './Sidebar.scss'
import {  FaCog, FaRegTrashAlt  } from 'react-icons/fa'
import { SlClose } from 'react-icons/sl'
import { AiOutlineEye, AiFillEyeInvisible } from 'react-icons/ai'

const Sidebar = (props) => {
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

    const userList = props.data.map( user => (
      <div className='user'>
        <strong className={user.disabled ? 'disabled' : ''}>{user.name}</strong>

        <span className='user-icons'>
          <span className='user-icon'>{user.disabled ? <AiOutlineEye /> : <AiFillEyeInvisible />}</span>
          <span className='user-icon'><FaRegTrashAlt /></span>
        </span>
      </div>
    ));


  return (
  <>
      <span className='sidebar-icon' onClick={handleMenuOpen}>
        { settingsState.open ? <SlClose size="2rem" fill='#2c2c2c' /> : <FaCog size="2rem" /> }
      </span>

      <div className={`sidebar ${settingsState.open && 'show'}`}>
        <form className='sidebar-settings'>
        <h2 className='sidebar-settings-title'>user settings</h2>
        {userList}
        </form>
      </div>
    </>
  )
}

export default Sidebar