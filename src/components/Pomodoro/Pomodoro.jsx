import React, { useState, useRef, useEffect } from 'react'
import './Pomodoro.css'

const MODES = {
  focus: { label: 'Focus Sesh', duration: 60 * 60 },
  short: { label: 'Short Break', duration: 10 * 60 },
  long: { label: 'Long Break', duration: 30 * 60 },
};

const Pomodoro = ({ completedFocusSessions, setCompletedFocusSessions }) => {
  const defaultMode = 'focus';

  const stored = JSON.parse(localStorage.getItem('pomodoroState')) || {};
  const initialMode = stored.mode || defaultMode;
  const initialTime = typeof stored.timeLeft === 'number' ? stored.timeLeft : MODES[initialMode].duration;

  const [mode, setMode] = useState(initialMode);
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false); // always paused on reload

  const intervalRef = useRef(null);
  const justLoaded = useRef(true);

  // update pomodoroState when mode and timeLeft changes
  useEffect(() => {
    const newState = { mode, timeLeft };
    localStorage.setItem('pomodoroState', JSON.stringify(newState));
  }, [mode, timeLeft])

  // timer logic
  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime > 1) {
            return prevTime - 1;
          } else {
            clearInterval(interval); // Stop the interval

            // Change mode and reset timeLeft WITHOUT starting the timer again
            if (mode === 'focus') {
              setMode('short');
              setTimeLeft(MODES.short.duration);
            } else if (mode === 'short') {
              setMode('focus');
              setTimeLeft(MODES.focus.duration);
            } else if (mode === 'long') {
              setMode('focus');
              setTimeLeft(MODES.focus.duration);
            }

            setIsRunning(false); // stop timer after transition
            return 0;
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, mode]);


  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  useEffect(() => {
    if (isRunning) {
      document.title = `${formatTime(timeLeft)} - Focus Time`;
    } else {
      document.title = 'Focus & Task';
    }
  }, [timeLeft, isRunning]);

  // change to next mode 
  const handleSessionEnd = () => {
    const notif = new Audio('/notification.mp3')
    notif.play().catch(err => {
      console.log('Autoplay blocked:', err);
    });

    if (mode === 'focus') {
      const nextSession = completedFocusSessions + 1;
      setCompletedFocusSessions(nextSession);
      setMode(nextSession === 4 ? 'long' : 'short');
    } else {
      setMode('focus');
    }
    setIsRunning(false);
  };


  // start and pause 
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  // reset timer
  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setTimeLeft(MODES[mode].duration);
    setIsRunning(false);
  };

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');
  const total = MODES[mode].duration;
  const progress = ((total - timeLeft) / total) * 100;

  const handleModeChange = (newMode) => {
    clearInterval(intervalRef.current);
    setIsRunning(false); // pause timer when switching
    setMode(newMode);
    setTimeLeft(MODES[newMode].duration);
  };


  return (
    <div className='pomodoro'>
      <div className='pomodoro-card card'>
        <div className='card-header'>
          <div>
            <h3>Pomodoro</h3>
          </div>
          <h3>·</h3>
          <div>
            <h3 className='pomodoro-label'> {MODES[mode].label}</h3>
          </div>
        </div>

        <div className="mode-buttons">
          <button onClick={() => handleModeChange('focus')}>Focus Sesh</button>
          <button onClick={() => handleModeChange('short')}>Short Break</button>
          <button onClick={() => handleModeChange('long')}>Long Break</button>
        </div>

        <div className="circle-container">
          <svg className="circle desktop-only">
            <circle className="bg" r="70" cx="80" cy="80" />
            <circle
              className="progress"
              r="70"
              cx="80"
              cy="80"
              style={{
                strokeDasharray: 2 * Math.PI * 70,
                strokeDashoffset: 2 * Math.PI * 70 * (1 - progress / 100),
              }}
            />
          </svg>
          <div className="timer-text">{minutes}:{seconds}</div>
        </div>

        <div className="pomodoro-buttons">
          <button onClick={toggleTimer}>{isRunning ? 'Pause' : 'Start'}</button>
          <button onClick={resetTimer}>Reset</button>
        </div>
      </div>
    </div>
  )
}

export default Pomodoro