import React from 'react';
import './Stats.css'

const Stats = ({ tasks = [], completedFocusSessions }) => {
  const safeSessionCount = completedFocusSessions ?? 0;

  const total = tasks.length;
  const completed = tasks.filter(task => task.status === 'completed').length;

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hrs}h ${mins}m`;
  };

  const timeDisplay = formatTime(safeSessionCount * 3600); // 1 session = 1 hour

  return (
    <div className="stats">
      <div className="stats-card card">
        <div className="card-header">
          <h3>Stats</h3>
        </div>
        <div className="stats-body">
          <p>Tasks Completed: {completed}/{total}</p>
          <p>Focus Sessions Completed: {safeSessionCount}</p>
          <p>Time Focused: {timeDisplay}</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
