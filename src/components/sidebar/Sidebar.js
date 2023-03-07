import React from 'react'
import Styles from './Sidebar.scss'
import {  FaCog } from 'react-icons/fa'

const Sidebar = () => {
  return (
  <>
      <span className='sidebar-icon'>
        <FaCog fill='#f4f4f4' size="2rem" /> 
      </span>
      
      <div className='sidebar'>
      </div>
    </>
  )
}

export default Sidebar