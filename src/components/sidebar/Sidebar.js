import React, { useState } from 'react'
import Styles from './Sidebar.scss'
import {  FaCog, FaRegTrashAlt  } from 'react-icons/fa'
import { SlClose } from 'react-icons/sl'
import { RiUserAddLine } from 'react-icons/ri'
import { AiOutlineEye, AiFillEyeInvisible } from 'react-icons/ai'

const Sidebar = (props) => {
  /*
    TO DO:
    settings form to add, remove, edit people on the list.
    ability to diable people that are on the list and disable the last person chosen  
  */

    const [settingsState, setSettingsState] = useState({
      open: true, //make false by default after dev
      addingUser: false,
      newUserName: ''
    })

    const handleMenuOpen = () => {
      setSettingsState({
        ...settingsState,
        open: !settingsState.open
      })
    }

    const handleShowInput = () => {
      setSettingsState({
        ...settingsState,
        addingUser: !settingsState.addingUser
      })
    }

    const handleNewUserName = name => {
      setSettingsState({
        ...settingsState,
        newUserName: name
      })
    }

    const handleAddUser = () => {
      if(settingsState.newUserName !== '') {
        alert(settingsState.newUserName + ' ADDED')
        setSettingsState({
          ...settingsState,
          newUserName: '',
          addingUser: false
        })
      } else {
        alert('THIS IS BLANK, SON!')
      }

    }

    const userList = props.data.map( (user, index) => (
      <div className='user' key={index}>
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
          {settingsState.addingUser ?
            <span className='sidebar-add'>
              <input type='text' className='sidebar-add-input' value={settingsState.newUserName} onChange={e => handleNewUserName(e.target.value)} /> <RiUserAddLine onClick={handleAddUser} />
            </span> :
            <span className='sidebar-add' onClick={handleShowInput}>Add New User<RiUserAddLine style={{marginLeft:'.5rem'}}/></span>}

          {userList}
        </form>
      </div>
    </>
  )
}

export default Sidebar