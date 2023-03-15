import React, { useState, useEffect } from 'react'
import Styles from './Home.scss'
import { Link } from 'react-router-dom'
import {  FaCog, FaRegTrashAlt  } from 'react-icons/fa'
import Sidebar from '../../components/sidebar/Sidebar'
import { db } from '../../firebase'
import { 
  query, 
  collection, 
  onSnapshot, 
  updateDoc, 
  deleteDoc,
  doc,
  addDoc 
} from 'firebase/firestore'

const Home = () => {
  const [menuState, setMenuState] = useState({
    open: false,
    pillar: ''
  })
  const [usersData, setUsersData] = useState([])
  
  useEffect(()=> {
      if(menuState.open) {
      const q = query(collection(db, menuState.pillar))
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let usersArr = []
        querySnapshot.forEach((doc) => {
          usersArr.push({...doc.data(), id: doc.id})
        });
        const sortedUsersArr = [...usersArr].sort((a, b) =>
          a.name > b.name ? 1 : -1,
        );
        setUsersData(sortedUsersArr)
      })
      return () => unsubscribe()
    }
  },[menuState])

  const handleMenuOpen = pillar => {
    setMenuState({
      ...menuState,
      open: !menuState.open,
      pillar
    })
  }

  const handleCreateUser = async (e, value) => {
    e.preventDefault(e)
    if(value === null || value.match(/^ *$/) !== null) {
      alert('Please add a name')
    } else {
      await addDoc(collection(db, menuState.pillar), {
        name: value,
        disabled: false
      })
    }
  }

  const handleDeleteUser = async id => {
    await deleteDoc(doc(db, menuState.pillar, id))
  }

  const handleToggleDisableUser = async (user) => {
    await updateDoc(doc(db, menuState.pillar, user.id), {
      disabled: !user.disabled
    })
  }


  return (
    <>
      <div className='home'>
        <h1>R&R Pillar<br />Wheels of Fortune</h1>
        <p>Click the name of a pillar to go to the wheel, or click a gear icon to edit it's list of names.</p>

        <div className="pillar">
          <Link to='wanderlust'>WanderLust</Link>
          <span className='pillar-icon'>
            <FaCog size="2rem" onClick={()=> handleMenuOpen('wanderlust')} />
          </span>
        </div>
        <div className="pillar">
          <Link to='digital'>Digital</Link>
          <span className='pillar-icon'>
            <FaCog size="2rem" onClick={()=> handleMenuOpen('digital')} />
          </span>
        </div>
        <div className="pillar">
          <Link to='evolve'>Evolve</Link>
          <span className='pillar-icon'>
            <FaCog size="2rem" onClick={()=> handleMenuOpen('evolve')} />
          </span>
        </div>
        <div className="pillar">
          <Link to='purpose'>Purpose</Link>
          <span className='pillar-icon'>
            <FaCog size="2rem" onClick={()=> handleMenuOpen('purpose')} />
          </span>
        </div>
      </div>

      <Sidebar 
        open={menuState.open}
        pillar={menuState.pillar}
        data={usersData} 
        toggleMenu={()=> handleMenuOpen('')}
        toggleDisable={handleToggleDisableUser}
        createUser={handleCreateUser}
        deleteUser={handleDeleteUser} />
    </>
  )
}

export default Home