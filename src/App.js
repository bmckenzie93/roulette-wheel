import { useState } from 'react'
import './App.scss';
import Data from "./Data/Data.js"
import Sidebar from './components/sidebar/Sidebar'
import Wheel from './components/wheel/Wheel'


export default function App() {
  const [userDataState, setUserDataState] = useState(Data)

  return (
    <div className="App">
      <Sidebar data={userDataState} />
      <Wheel data={userDataState} />
    </div>
  );
}