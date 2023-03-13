import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Wheel from '../../components/wheel/Wheel'
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

const Evolve = () => {
  const [usersData, setUsersData] = useState([])

  const handleCreateUser = async (e, value) => {
    e.preventDefault(e)
    if(value === null || value.match(/^ *$/) !== null) {
      alert('Please add a name')
    } else {
      await addDoc(collection(db, 'evolve'), {
        name: value,
        disabled: false
      })
    }
  }

  const handleDeleteUser = async id => {
    await deleteDoc(doc(db, 'evolve', id))
  }

  const handleToggleDisableUser = async (user) => {
    await updateDoc(doc(db, 'evolve', user.id), {
      disabled: !user.disabled
    })
  }

  useEffect(()=>{
    const q = query(collection(db, 'evolve'))
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
  },[])

  return (
    <>
      <Sidebar 
      data={usersData} 
      toggleDisable={handleToggleDisableUser}
      createUser={handleCreateUser}
      deleteUser={handleDeleteUser} />

      <Wheel data={usersData} pillar='evolve' />
    </>
  )
}

export default Evolve