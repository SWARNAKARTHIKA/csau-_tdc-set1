import React from 'react';
import '../css/Questions.css';

const Questions = ({ questions, scenarioTitle }) => {
  const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);

  return (
    <div className="questions-panel">
      <div className="panel-header">
        <span className="panel-icon">❓</span>
        <span className="panel-title">QUESTIONS</span>
        <span className="total-marks">{totalMarks} MARKS</span>
      </div>

      <div className="scenario-title">
        <div className="scenario-label">SCENARIO:</div>
        <div className="scenario-name">{scenarioTitle}</div>
      </div>

      <div className="questions-content">
        {questions.map((question, index) => (
          <div key={question.id} className="question-card">
            <div className="question-header">
              <div className="question-number">
                <span className="q-label">Q{index + 1}</span>
              </div>
              <div className="question-marks">[{question.marks} marks]</div>
            </div>

            <div className="question-text">{question.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions;