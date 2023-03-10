import { useState, useEffect } from 'react'
import './App.scss';
import { db } from './firebase'
import { 
  query, 
  collection, 
  onSnapshot, 
  updateDoc, 
  deleteDoc,
  doc,
  addDoc 
} from 'firebase/firestore'
import Sidebar from './components/sidebar/Sidebar'
import Wheel from './components/wheel/Wheel'


export default function App() {
  const [usersData, setUsersData] = useState(['default item 1', 'default item 2'])

  useEffect(()=>{
    const q = query(collection(db, 'pillar-1'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let usersArr = []
      querySnapshot.forEach((doc) => {
        usersArr.push({...doc.data(), id: doc.id})
      });
      setUsersData(usersArr)
    })
    return () => unsubscribe()
  },[])

  const handleCreateUser = async (e, value) => {
    e.preventDefault(e)
    if(value === '') {
      alert('THIS IS BLANK, SON!') // display this in the UI instead of an alert
      return
    } else {
      await addDoc(collection(db, 'pillar-1'), {
        name: value,
        disabled: false
      })
    }
  }
  const handleDeleteUser = async id => {
    await deleteDoc(doc(db, 'pillar-1', id))
  }

  const handleToggleDisableUser = async (user) => {
    await updateDoc(doc(db, 'pillar-1', user.id), {
      disabled: !user.disabled
    })
  }

  return (
    <div className="App">
      <Sidebar 
        data={usersData} 
        toggleDisable={handleToggleDisableUser}
        createUser={handleCreateUser}
        deleteUser={handleDeleteUser} />
      <Wheel data={usersData} />
    </div>
  );
}