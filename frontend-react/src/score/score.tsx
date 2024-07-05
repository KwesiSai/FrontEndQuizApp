import React from 'react';
import './score.css';

interface ScoreProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  topic : string | null;
  title: string;
  iconSrc: string;
}

const Score: React.FC<ScoreProps> = ({ score, totalQuestions, onRestart, topic, title, iconSrc}) => {
  const handleRestart = () => {
    onRestart();
  };

  return (
    <div className="score-container">
      <h2>Your Score</h2>
      <p>{`You scored ${score} out of ${totalQuestions}`}</p>
      <button onClick={handleRestart}>Restart Quiz</button>
    </div>
  );
};

export default Score;
