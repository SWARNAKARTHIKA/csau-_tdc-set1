import React, { useState, useEffect } from 'react';
import './App.css';
import SystemLog from './components/SystemLog';
import ConfigFile from './components/ConfigFile';
import Questions from './components/Questions';
import Timer from './components/Timer';
import ScenarioSelector from './components/ScenarioSelector';
import { scenarios } from './data/scenarios';

function App() {
  const [currentScenario, setCurrentScenario] = useState(scenarios[0]);
  const [loading, setLoading] = useState(true);
  const [multipleTabsWarning, setMultipleTabsWarning] = useState(false);
  
  const [timerActive, setTimerActive] = useState(() => {
    const saved = localStorage.getItem('timerState');
    if (saved) {
      const { isActive } = JSON.parse(saved);
      return isActive;
    }
    return false;
  });

  useEffect(() => {
    const tabId = Date.now().toString();
    sessionStorage.setItem('tabId', tabId);
    
    const handleStorage = (e) => {
      if (e.key === 'tabId' && e.newValue !== tabId) {
        setMultipleTabsWarning(true);
      }
    };

    const interval = setInterval(() => {
      localStorage.setItem('tabId', tabId);
    }, 1000);

    window.addEventListener('storage', handleStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const savedScenario = localStorage.getItem('currentScenario');
      if (savedScenario) {
        const scenarioId = parseInt(savedScenario);
        const scenario = scenarios.find(s => s.id === scenarioId);
        setCurrentScenario(scenario || scenarios[0]);
      }
      setLoading(false);
    }, 500);
  }, []);

  const handleScenarioChange = (scenarioId) => {
    const scenario = scenarios.find(s => s.id === scenarioId);
    setCurrentScenario(scenario);
    localStorage.setItem('currentScenario', scenarioId.toString());
  };

  const handleStartChallenge = () => {
    setTimerActive(true);
    localStorage.setItem('timerState', JSON.stringify({
      timeLeft: 1200,
      timestamp: Date.now(),
      isActive: true
    }));
  };

  const handleSubmit = () => {
    const confirmSubmit = window.confirm(
      'Are you sure you want to submit?\n\nOnce submitted, you cannot continue the challenge.'
    );
    
    if (confirmSubmit) {
      setTimerActive(false);
      localStorage.removeItem('timerState');
      localStorage.removeItem('currentScenario');
      alert('Challenge submitted successfully! 🎉\n\nPlease hand in your answer sheet.\nGood luck!');
    }
  };

  const handleTimeComplete = () => {
    setTimerActive(false);
    localStorage.removeItem('timerState');
    localStorage.removeItem('currentScenario');
    alert('Time\'s up! ⏰\n\nThe challenge has ended.\nPlease submit your answer sheet immediately.');
  };

  if (multipleTabsWarning) {
    return (
      <div className="loading-screen">
        <div className="terminal-loading" style={{color: '#ff0000'}}>
          <div className="loading-text" style={{fontSize: '1.2rem'}}>⚠️ WARNING: MULTIPLE TABS DETECTED</div>
          <p style={{marginTop: '20px', color: '#00ff41'}}>
            Please close all other tabs and use only ONE tab for this challenge.
          </p>
          <button 
            onClick={() => setMultipleTabsWarning(false)}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              background: '#00ff41',
              border: 'none',
              color: '#000',
              cursor: 'pointer',
              borderRadius: '5px',
              fontFamily: 'Courier New'
            }}
          >
            I understand - Continue with this tab
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="terminal-loading">
          <div className="loading-text">INITIALIZING SECURITY SYSTEM...</div>
          <div className="loading-bar"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-left">
          <h1 className="glitch" data-text="The Digital Chase">The Digital Chase</h1>
          <div className="header-subtitle">CSAU Team</div>
        </div>
        <Timer duration={1200} active={timerActive} onComplete={handleTimeComplete} />
      </header>

      <ScenarioSelector 
        scenarios={scenarios}
        currentScenario={currentScenario}
        onScenarioChange={handleScenarioChange}
        onStartChallenge={handleStartChallenge}
        onSubmit={handleSubmit}
        timerActive={timerActive}
      />

      {currentScenario && (
        <div className="main-content">
          <div className="left-panel">
            <SystemLog logs={currentScenario.systemLog} />
            <ConfigFile config={currentScenario.configFile} />
          </div>

          <div className="right-panel">
            <Questions 
              questions={currentScenario.questions}
              scenarioTitle={currentScenario.title}
            />
          </div>
        </div>
      )}

      <footer className="app-footer">
        <div className="footer-line">
          <span className="status-indicator"></span>
          <span>SYSTEM STATUS: ONLINE</span>
        </div>
        <div className="footer-line">
          USER: Sharieff-Suhaib | SESSION: ACTIVE
        </div>
      </footer>
    </div>
  );
}

export default App;