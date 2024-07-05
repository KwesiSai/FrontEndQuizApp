// src/components/Quiz.tsx
import React, { useEffect, useState } from 'react';
import './quiz.css';
import correct from '../images/icon-correct.svg';
import wrong from '../images/icon-incorrect.svg';
import error from '../images/icon-error.svg';

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface QuizData {
  title: string;
  icon: string;
  questions: Question[];
}

interface QuizProps {
  topic: string;
  onComplete: (score: number, totalQuestions: number, title: string, iconSrc:string) => void;
}

const Quiz: React.FC<QuizProps> = ({ topic, onComplete }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [iconSrc, setIconSrc] = useState<string>("");
  const [totalQuestions] = useState(10);
  const [progress, setProgress] = useState(0);
  const [showError, setShowError] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => {
        const selectedQuiz = data.quizzes.find((quiz: QuizData) => quiz.title.toLowerCase() === topic.toLowerCase());
        if (selectedQuiz) {
          setQuestions(selectedQuiz.questions);
          setTitle(selectedQuiz.title);
          setIconSrc(`${process.env.PUBLIC_URL}${selectedQuiz.icon}`);
        }
      })
      .catch(error => console.error('Error fetching questions:', error));
  }, [topic]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setShowError(false);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption) {
      setShowError(true);
      return;
    }

    if (selectedOption === questions[currentQuestionIndex].answer) {
      setIsCorrect(true);
      setScore(score + 1);
    } else {
      setIsCorrect(false);
    }
    setSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (!selectedOption) {
      setShowError(true);
      return;
    }

    setSelectedOption(null);
    setSubmitted(false);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      const newProgress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
      setProgress(newProgress);
    } else {
      setQuizCompleted(true);
      onComplete(score, totalQuestions, title, iconSrc);
    }
    setIsCorrect(false);
    setShowError(false);
  };

  if (quizCompleted) {
    return null;
  }

  return (
    <>
      <div className="title">
        <img src={iconSrc} alt="icon" />
        <span>{title}</span>
      </div>
      <div className="quiz-page">
        {questions.length > 0 && (
          <>
            <div className="question-section">
              <div className="question-count">
                <span>Question {currentQuestionIndex + 1}</span> of {questions.length}
              </div>
              <div className="question-text">{questions[currentQuestionIndex].question}</div>
              <div className="bar">
                <div className="progress" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <div className="answer-section">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={`option-button ${submitted && selectedOption === option ? 'selected' : ''} ${
                    submitted && option === questions[currentQuestionIndex].answer ? 'correct' : 'wrong'
                  }`}
                  disabled={submitted}
                >
                  <span>{String.fromCharCode(65 + index)}</span>
                  <p>{option}</p>
                  {submitted && selectedOption === option && (
                    <img src={isCorrect ? correct : wrong} alt={isCorrect ? 'Correct' : 'Wrong'} />
                  )}
                  {submitted && selectedOption !== option && option === questions[currentQuestionIndex].answer && (
                    <img src={correct} alt="correct" />
                  )}
                </button>
              ))}
              <button className="submit-button" onClick={submitted ? handleNextQuestion : handleSubmitAnswer}>
                {submitted ? 'Next Question' : 'Submit Answer'}
              </button>
              {showError && <div className="error-message">
                <img src={error} alt='error'/>
                Please select an option
                </div>}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Quiz;
