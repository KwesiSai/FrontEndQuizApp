import React, { useState } from 'react';
import Home from './home/home';
import Quiz from './quiztest/quiz';
import Score from './score/score'; // Adjust the import path based on your project structure
import './App.css'; 

const App: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [iconSrc, setIconSrc] = useState<string>("");

  const handleSelectTopic = (topic: string) => {
    setSelectedTopic(topic);
    setQuizCompleted(false);
  };

  const handleQuizComplete = (finalScore: number, total: number, quiztitle: string, quiziconSrc: string) => {
    setScore(finalScore);
    setTotalQuestions(total);
    setQuizCompleted(true);
    setTitle(quiztitle);
    setIconSrc(quiziconSrc);
  };

  const handleBackToHome = () => {
    setSelectedTopic(null);
    setScore(0);
    setTotalQuestions(0);
    setQuizCompleted(false);
    setTitle("");
    setIconSrc("");
  };
  console.log(`Title: ${title}`)

  return (
    <div className="app-container">
      {quizCompleted ? (
        <Score score={score} totalQuestions={totalQuestions} 
          topic={selectedTopic} onRestart={handleBackToHome} 
          title={title}   iconSrc={iconSrc}
        />
      ) : selectedTopic ? (
        <Quiz topic={selectedTopic} onComplete={handleQuizComplete} />
      ) : (
        <Home onSelectTopic={handleSelectTopic} />
      )}
      {selectedTopic && !quizCompleted && (
        <button onClick={handleBackToHome}>Back to Home</button>
      )}
    </div>
  );
};

export default App;
