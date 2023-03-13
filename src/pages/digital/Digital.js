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

const Digital = () => {
  const [usersData, setUsersData] = useState([])

  const handleCreateUser = async (e, value) => {
    e.preventDefault(e)
    if(value === null || value.match(/^ *$/) !== null) {
      alert('Please add a name')
    } else {
      await addDoc(collection(db, 'digital'), {
        name: value,
        disabled: false
      })
    }
  }

  const handleDeleteUser = async id => {
    await deleteDoc(doc(db, 'digital', id))
  }

  const handleToggleDisableUser = async (user) => {
    await updateDoc(doc(db, 'digital', user.id), {
      disabled: !user.disabled
    })
  }

  useEffect(()=>{
    const q = query(collection(db, 'digital'))
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

      <Wheel data={usersData} pillar='digital' />
    </>
  )
}

export default Digital