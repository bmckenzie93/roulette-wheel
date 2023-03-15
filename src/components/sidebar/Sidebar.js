import React, { useState } from 'react'
import Styles from './Sidebar.scss'
import { FaRegTrashAlt } from 'react-icons/fa'
import { SlClose } from 'react-icons/sl'
import { RiUserAddLine } from 'react-icons/ri'
import { AiOutlineEye, AiFillEyeInvisible } from 'react-icons/ai'

const Sidebar = (props) => {
    const [settingsState, setSettingsState] = useState({
      showInput: false,
      newUserName: ''
    })

    const handleShowInput = () => {
      setSettingsState({
        ...settingsState,
        showInput: !settingsState.showInput
      })
    }

    const handleInput = e => {
      setSettingsState({
        ...settingsState,
        newUserName: e.target.value.toLowerCase()
      })
    }

    const userList = props.data.map((user, index) => (
      <li className='user' key={index}>
        <strong className={user.disabled ? 'disabled' : ''}>{user.name}</strong> 
        <span className='user-icons'>
          <span className='user-icon'>
            {user.disabled ? 
            <AiOutlineEye onClick={()=> props.toggleDisable(user)} /> : 
            <AiFillEyeInvisible onClick={()=> props.toggleDisable(user)} />}
          </span> 
          <span className='user-icon'><FaRegTrashAlt onClick={() => props.deleteUser(user.id)} /></span>
        </span>
      </li>
    ));
  return (
  <>
      <span className='sidebar-icon' onClick={props.toggleMenu}>
        { props.open && <SlClose size="2rem" fill='#2c2c2c' /> }
      </span>

      <div className={`sidebar ${props.open && 'show'}`}>
        <form className='sidebar-settings' onSubmit={props.createUser}>
          <h2 className='sidebar-settings-title'>{props.pillar} user settings</h2>
          {settingsState.showInput ?
            <span className='sidebar-add'>
              <input 
                type='text' 
                className='sidebar-add-input' 
                value={settingsState.newUserName} 
                onChange={e => handleInput(e)} /> 
              <RiUserAddLine onClick={e => props.createUser(
                e, 
                settingsState.newUserName,
                setSettingsState({
                  ...settingsState,
                  showInput: false,
                  newUserName: ''
                })
                )} />
            </span> :
            <span className='sidebar-add' onClick={handleShowInput}>Add New User<RiUserAddLine style={{marginLeft:'.5rem'}}/></span>}
            <h3>Total users: {props.data.length}</h3>
            <ul>
              {userList}
            </ul>
        </form>
      </div>
    </>
  )
}

export default Sidebar