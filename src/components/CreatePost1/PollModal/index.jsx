// PollModal.js
import React, { useState } from 'react';
import './pollModal.css'; 

const PollModal = ({ show, onHide, onCreatePoll }) => {
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '', '', '', '']);
  const [optionCount, setOptionCount] = useState(2); 

  const handleOptionChange = (index, value) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const handleAddOption = () => {
    if (optionCount < 5) {
      setOptionCount(optionCount + 1);
    }
  };

  const handleCreatePoll = () => {
    const validOptions = pollOptions
      .filter(option => option.trim() !== '')
      .map(option => ({ option, votes: [] }));

    if (pollQuestion.trim() && validOptions.length >= 2) {
      console.log('question',pollQuestion, validOptions);
      onCreatePoll(pollQuestion, validOptions);
      setPollQuestion('');
      setPollOptions(['', '', '', '', '']);
      setOptionCount(2);
      onHide();
    } else {
      alert('Please provide a poll question and at least 2 options.');
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay-poll">
      <div className="modal-content-poll">
        <h2>Create Poll</h2>
        <div>
          <label>Poll Question:</label>
          <input
            type="text"
            value={pollQuestion}
            onChange={(e) => setPollQuestion(e.target.value)}
          />
        </div>
        {Array.from({ length: optionCount }).map((_, index) => (
          <div key={index}>
            <label>Option {index + 1}:</label>
            <input
              type="text"
              value={pollOptions[index]}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
          </div>
        ))}
        {optionCount < 5 && (
          <button onClick={handleAddOption}>Add Option</button>
        )}
        <button onClick={handleCreatePoll}>Create Poll</button>
        <button onClick={onHide}>Cancel</button>
      </div>
    </div>
  );
};

export default PollModal;
