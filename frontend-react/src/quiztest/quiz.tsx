import React, { useEffect, useState } from 'react';
import './quiz.css';

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
}

const Quiz: React.FC<QuizProps> = ({ topic }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => {
        const selectedQuiz = data.quizzes.find((quiz: QuizData) => quiz.title.toLowerCase() === topic.toLowerCase());
        if (selectedQuiz) {
          setQuestions(selectedQuiz.questions);
        }
      })
      .catch(error => console.error('Error fetching questions:', error));
  }, [topic]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption) {
      if (selectedOption === questions[currentQuestionIndex].answer) {
        setScore(score + 1);
      }
      setSelectedOption(null);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <div className="quiz-page">
      {questions.length > 0 ? (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestionIndex + 1}</span>/{questions.length}
            </div>
            <div className="question-text">{questions[currentQuestionIndex].question}</div>
          </div>
          <div className="answer-section">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className={selectedOption === option ? 'selected' : ''}
              >
                {option}
              </button>
            ))}
          </div>
          <button onClick={handleNextQuestion} disabled={!selectedOption}>
            Next Question
          </button>
        </>
      ) : (
        <div>Loading questions...</div>
      )}
    </div>
  );
};

export default Quiz;
