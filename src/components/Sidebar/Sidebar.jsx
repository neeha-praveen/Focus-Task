import React from 'react'
import './Sidebar.css'
import Pomodoro from '../Pomodoro/Pomodoro'
import Stats from '../Stats/Stats'

const Sidebar = ({ completedFocusSessions, setCompletedFocusSessions, tasks }) => {
  return (
    <div className='sidebar'>
      <Pomodoro completeFocusSessions={completedFocusSessions} setCompleteFocusSessions={setCompletedFocusSessions} />
      <Stats tasks={tasks} completeFocusSessions={completedFocusSessions} />
    </div>
  )
}

export default Sidebar