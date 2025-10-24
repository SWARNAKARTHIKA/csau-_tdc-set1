import React, { useState } from 'react';
import './Questions.css';

const Questions = ({ questions, scenarioTitle }) => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

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
              <button 
                className="info-button"
                onClick={() => setSelectedQuestion(selectedQuestion === question.id ? null : question.id)}
                title="View evaluation criteria"
              >
                <span className="info-icon">ⓘ</span>
              </button>
            </div>

            <div className="question-text">{question.text}</div>

            {selectedQuestion === question.id && (
              <div className="criteria-dropdown">
                <div className="criteria-header">📋 Evaluation Criteria:</div>
                <ul className="criteria-list">
                  {question.criteria.map((criterion, idx) => (
                    <li key={idx} className="criterion-item">
                      <span className="criterion-bullet">▸</span>
                      {criterion}
                    </li>
                  ))}
                </ul>
                <div className="model-answer">
                  <div className="answer-label">💡 Model Answer:</div>
                  <div className="answer-text">{question.answer}</div>
                </div>
              </div>
            )}

            <div className="answer-area">
              <textarea 
                placeholder="Type your answer here..."
                className="answer-input"
                rows="4"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions;