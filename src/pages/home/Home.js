import React from 'react'
import Styles from './Home.scss'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='home'>
      <h1>Choose your pillar!</h1>
      <Link to='wanderlust'>WanderLust</Link>
      <Link to='digital'>Digital</Link>
    </div>
  )
}

export default Home