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
  const [completedScenarios, setCompletedScenarios] = useState([]);

  useEffect(() => {
    fetchScenarios();
  }, []);

  const fetchScenarios = async () => {
    try {
      const response = await axios.get('/api/scenarios');
      setScenarios(response.data);
      setCurrentScenario(response.data[0]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching scenarios:', error);
      setLoading(false);
    }
  };

  const handleScenarioChange = (scenarioId) => {
    if (currentScenario && !completedScenarios.includes(currentScenario.id)) {
      setCompletedScenarios(prev => [...prev, currentScenario.id]);
    }
    
    const scenario = scenarios.find(s => s.id === scenarioId);
    setCurrentScenario(scenario);
  };

  const handleStartChallenge = () => {
    setTimerActive(true);
  };

  const handleSubmit = () => {
    if (currentScenario && !completedScenarios.includes(currentScenario.id)) {
      setCompletedScenarios(prev => [...prev, currentScenario.id]);
    }
    
    setTimerActive(false);
    alert('Challenge submitted successfully! 🎉\n\nAll scenarios completed.\nGood luck with your evaluation!');
  };

  const handleTimeComplete = () => {
    setTimerActive(false);
    alert('Time\'s up! ⏰\n\nThe challenge has ended.\nPlease submit your answer sheet.');
  };

  const allScenariosCompleted = completedScenarios.length === scenarios.length;

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
        completedScenarios={completedScenarios}
        allScenariosCompleted={allScenariosCompleted}
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
          USER: Sharieff-Suhaib | SESSION: ACTIVE | COMPLETED: {completedScenarios.length}/{scenarios.length}
        </div>
      </footer>
    </div>
  );
}

export default App;