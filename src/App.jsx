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
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    fetchScenarios();
  }, []);

  const fetchScenarios = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/scenarios');
      setScenarios(response.data);
      setCurrentScenario(response.data[0]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching scenarios:', error);
      setLoading(false);
    }
  };

  const handleScenarioChange = (scenarioId) => {
    const scenario = scenarios.find(s => s.id === scenarioId);
    setCurrentScenario(scenario);
    setTimerActive(false);
  };

  const handleStartChallenge = () => {
    setTimerActive(true);
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
          <h1 className="glitch" data-text="i++ SECURITY CHALLENGE">i++ SECURITY CHALLENGE</h1>
          <div className="header-subtitle">Events Team • Cybersecurity Assessment</div>
        </div>
        <Timer duration={1200} active={timerActive} onComplete={() => alert('Time\'s up!')} />
      </header>

      <ScenarioSelector 
        scenarios={scenarios}
        currentScenario={currentScenario}
        onScenarioChange={handleScenarioChange}
        onStartChallenge={handleStartChallenge}
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