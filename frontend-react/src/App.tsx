import React, { useState } from 'react';
import Home from './home/home';
import Quiz from './quiztest/quiz';
import './App.css'; // optional, for additional styling

const App: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const handleSelectTopic = (topic: string) => {
    setSelectedTopic(topic);
  };

  const handleBackToHome = () => {
    setSelectedTopic(null);
  };

  return (
    <div className="app-container">
      {selectedTopic ? (
        <Quiz topic={selectedTopic} />
      ) : (
        <Home onSelectTopic={handleSelectTopic} />
      )}
      {selectedTopic && (
        <button onClick={handleBackToHome}>Back to Home</button>
      )}
    </div>
  );
};

export default App;
