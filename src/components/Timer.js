import React, { useState, useEffect } from 'react';
import './Timer.css';

const Timer = ({ duration, active, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    if (active) {
      setTimeLeft(duration);
    }
  }, [active, duration]);

  useEffect(() => {
    if (!active || timeLeft <= 0) {
      if (timeLeft === 0 && onComplete) {
        onComplete();
      }
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [active, timeLeft, onComplete]);

  useEffect(() => {
    setIsWarning(timeLeft <= 300 && timeLeft > 0);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const percentage = (timeLeft / duration) * 100;

  return (
    <div className={`timer-container ${isWarning ? 'warning' : ''} ${!active ? 'inactive' : ''}`}>
      <div className="timer-label">⏱️ TIME REMAINING</div>
      <div className="timer-display">
        {formatTime(timeLeft)}
      </div>
      <div className="timer-bar">
        <div 
          className="timer-fill" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      {!active && <div className="timer-status">Press START to begin</div>}
    </div>
  );
};

export default Timer;