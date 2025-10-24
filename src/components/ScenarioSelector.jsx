import React from 'react';
import '../css/ScenarioSelector.css';

const ScenarioSelector = ({ 
  scenarios, 
  currentScenario, 
  onScenarioChange, 
  onStartChallenge, 
  onSubmit,
  timerActive
}) => {
  return (
    <div className="scenario-selector">
      <div className="selector-label">SELECT SCENARIO:</div>
      <div className="selector-buttons">
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            className={`scenario-btn ${currentScenario?.id === scenario.id ? 'active' : ''}`}
            onClick={() => onScenarioChange(scenario.id)}
          >
            <span className="scenario-number">{scenario.id}</span>
            <span className="scenario-title">{scenario.title}</span>
          </button>
        ))}
      </div>
      <div className="action-buttons">
        {!timerActive && (
          <button className="start-button" onClick={onStartChallenge}>
            <span className="start-icon">▶</span>
            START CHALLENGE
          </button>
        )}
        {timerActive && (
          <>
            <div className="challenge-active">
              <span className="pulse-dot"></span>
              CHALLENGE IN PROGRESS
            </div>
            <button className="submit-button" onClick={onSubmit}>
              <span className="submit-icon">✓</span>
              SUBMIT
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ScenarioSelector;