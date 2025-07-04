import './App.css';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Tasks from './components/Tasks/Tasks';
import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem('myTasks');
    return stored ? JSON.parse(stored) : [];
  });

  const [completedFocusSessions, setCompletedFocusSessions] = useState(()=>{
    const stored = localStorage.getItem('completedSessions');
    return stored? JSON.parse(stored):0;
  })

  useEffect(() => {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(()=>{
    localStorage.setItem('completedSessions', JSON.stringify(completedFocusSessions));
  },[completedFocusSessions])

  return (
    <div className="app">
      <Navbar />
      <div className="main-body">
        <Sidebar tasks={tasks} completedFocusSessions={completedFocusSessions} setCompletedFocusSessions={setCompletedFocusSessions}/>
        <div className="main-content">
          <Tasks tasks={tasks} setTasks={setTasks} />
        </div>
      </div>
    </div>
  );
}

export default App;
