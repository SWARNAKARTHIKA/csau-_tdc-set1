import React from 'react';
import '../css/Questions.css';

const Questions = ({ questions, scenarioTitle }) => {
  return (
    <div className="questions-panel">
      <div className="panel-header">
        <span className="panel-icon">❓</span>
        <span className="panel-title">QUESTIONS</span>
      </div>

      <div className="questions-content">
        {questions.map((question, index) => (
          <div key={question.id} className="question-card">
            <div className="question-header">
              <div className="question-number">
                <span className="q-label">Q{index + 1}</span>
              </div>
            </div>

            <div className="question-text">{question.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions;