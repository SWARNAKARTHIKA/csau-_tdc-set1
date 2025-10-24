import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import SystemLog from './components/SystemLog';
import ConfigFile from './components/ConfigFile';
import Questions from './components/Questions';
import Timer from './components/Timer';
import ScenarioSelector from './components/ScenarioSelector';

function App() {
  const [scenarios, setScenarios] = useState([]);
  const [currentScenario, setCurrentScenario] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [timerActive, setTimerActive] = useState(() => {
    const saved = localStorage.getItem('timerState');
    if (saved) {
      const { isActive } = JSON.parse(saved);
      return isActive;
    }
    return false;
  });

  useEffect(() => {
    fetchScenarios();
  }, []);

  const fetchScenarios = async () => {
    try {
      const response = await axios.get('/api/scenarios');
      setScenarios(response.data);
      
      const savedScenario = localStorage.getItem('currentScenario');
      if (savedScenario) {
        const scenarioId = parseInt(savedScenario);
        const scenario = response.data.find(s => s.id === scenarioId);
        setCurrentScenario(scenario || response.data[0]);
      } else {
        setCurrentScenario(response.data[0]);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching scenarios:', error);
      setLoading(false);
    }
  };

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
          USER: 😎 | SESSION: ACTIVE
        </div>
      </footer>
    </div>
  );
}

export default App;