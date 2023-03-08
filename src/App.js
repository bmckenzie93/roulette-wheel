import { useState } from 'react'
import './App.scss';
import Data from "./Data/Data.js"
import Sidebar from './components/sidebar/Sidebar'
import Wheel from './components/wheel/Wheel'


export default function App() {
  const [userData, setuserData] = useState(Data)

  return (
    <div className="App">
      <Sidebar data={userData} />
      <Wheel data={userData} />
    </div>
  );
}