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
    <>
      <div className="title">
      <img src={iconSrc} alt="icon"/>
      <span>{title}</span>
      </div>
      <div className="score-page">
        <div className="message">
            <p>Quiz completed</p>
            <p>You scored...</p>
        </div>
        <div className="score-display">
            <div className="scorebox">
              <div className="scoretitle">
                <img src={iconSrc} alt='icon'/>
                <span> {title}</span>
              </div>
              <p>{score}</p>
              <p>out of {totalQuestions}</p>
            </div>
            <button onClick={handleRestart}>Play Again</button>
        </div>
      </div>
    </>
  );
};

export default Score;
