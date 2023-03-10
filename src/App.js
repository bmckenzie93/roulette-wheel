import { useState, useEffect } from 'react'
import './App.scss';
import { db } from './firebase'
import { query, collection, onSnapshot } from 'firebase/firestore'
import Sidebar from './components/sidebar/Sidebar'
import Wheel from './components/wheel/Wheel'


export default function App() {
  const [usersData, setUsersData] = useState(['default item 1', 'default item 2'])

    /*
    TO DO:

    -CREATE NAME
    -READ NAME FROM DB
    -UPDATE NAME IN DB
    -DELETE NAME
  */

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

  console.log(usersData)

  return (
    <div className="App">
      <Sidebar data={usersData} />
      <Wheel data={usersData} />
    </div>
  );
}