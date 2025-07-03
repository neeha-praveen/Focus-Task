import React from 'react'
import './Sidebar.css'
import Pomodoro from '../Pomodoro/Pomodoro'
import Stats from '../Stats/Stats'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Pomodoro/>
        <Stats/>
    </div>
  )
}

export default Sidebar