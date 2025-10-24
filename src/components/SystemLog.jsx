import React, { useState, useEffect } from 'react';
import '../css/SystemLog.css';

const SystemLog = ({ logs }) => {
  const [displayedLogs, setDisplayedLogs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setDisplayedLogs([]);
    setCurrentIndex(0);
  }, [logs]);

  useEffect(() => {
    if (currentIndex < logs.length) {
      const timer = setTimeout(() => {
        setDisplayedLogs(prev => [...prev, logs[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, logs]);

  return (
    <div className="system-log">
      <div className="panel-header">
        <span className="panel-icon">📊</span>
        <span className="panel-title">SYSTEM LOG</span>
        <div className="panel-controls">
          <span className="control-dot red"></span>
          <span className="control-dot yellow"></span>
          <span className="control-dot green"></span>
        </div>
      </div>
      <div className="log-content terminal">
        <div className="terminal-prompt">root@security-system:~$</div>
        {displayedLogs.map((log, index) => (
          <div key={index} className="log-entry fade-in">
            <span className="log-bracket">[</span>
            <span className="log-text">{log}</span>
            <span className="log-bracket">]</span>
          </div>
        ))}
        {currentIndex < logs.length && (
          <div className="log-cursor">▋</div>
        )}
      </div>
    </div>
  );
};

export default SystemLog;