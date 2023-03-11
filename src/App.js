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
  /*
    TO DO:
    - REACT ROUTER
    - CREATE A HOME PAGE, CHOOSE YOUR PILLAR
    - MAKE 3 SEPERATE PILLARS 
  */
  const [usersData, setUsersData] = useState([])

  useEffect(()=>{
    const q = query(collection(db, 'pillar-1'))
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

  const handleCreateUser = async (e, value) => {
    e.preventDefault(e)
    if(value === null || value.match(/^ *$/) !== null) {
      alert('Please add a name')
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