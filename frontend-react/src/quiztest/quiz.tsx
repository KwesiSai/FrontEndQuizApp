import React, { useEffect, useState } from 'react';
import './quiz.css';
import correct from '../images/icon-correct.svg';
import wrong from '../images/icon-incorrect.svg';

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
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

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

  const handleSubmitAnswer = () => {
    if (selectedOption) {
      if (selectedOption === questions[currentQuestionIndex].answer) {
        const isCorrect = selectedOption === questions[currentQuestionIndex].answer;
        setIsCorrect(isCorrect);
        setScore(score + 1);
      }
      else{
        setIsCorrect(false);
      }
      setSubmitted(true);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setSubmitted(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setIsCorrect(false);
  };

  return (
    <div className="quiz-page">
      {questions.length > 0 ? (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestionIndex + 1}</span> of {questions.length}
            </div>
            <div className="question-text">{questions[currentQuestionIndex].question}</div>
          </div>
          <div className="answer-section">
            <button tabIndex={0}
              onClick={() => handleOptionClick(questions[currentQuestionIndex].options[0])}
              className={`option-button ${submitted && selectedOption === questions[currentQuestionIndex].options[0] ? 'selected' : ''} ${submitted && questions[currentQuestionIndex].options[0] === questions[currentQuestionIndex].answer ? 'correct' : 'wrong'}`}
              disabled={submitted} // Disable options if submitted
            >
              <span>A</span>
              <p>{questions[currentQuestionIndex].options[0]}</p>
              {submitted && selectedOption === questions[currentQuestionIndex].options[0] &&(
                <img src={isCorrect ? correct : wrong} alt={isCorrect ? 'Correct' : 'Wrong'} />
              )}
              {submitted && selectedOption !== questions[currentQuestionIndex].options[0] 
              && questions[currentQuestionIndex].options[0] === questions[currentQuestionIndex].answer
              &&(
                <img src={correct} alt='correct' />
              )}
            </button>

            <button tabIndex={1}
              onClick={() => handleOptionClick(questions[currentQuestionIndex].options[1])}
              className={`option-button ${submitted && selectedOption === questions[currentQuestionIndex].options[1] ? 'selected' : ''} ${submitted && questions[currentQuestionIndex].options[1] === questions[currentQuestionIndex].answer ? 'correct' : 'wrong'}`}
              disabled={submitted} // Disable options if submitted
            >
             <span>B</span>
             <p>{questions[currentQuestionIndex].options[1]}</p>
             {submitted && selectedOption === questions[currentQuestionIndex].options[1] &&(
                <img src={isCorrect ? correct : wrong} alt={isCorrect ? 'Correct' : 'Wrong'} />
              )}
              {submitted && selectedOption !== questions[currentQuestionIndex].options[1] 
              && questions[currentQuestionIndex].options[1] === questions[currentQuestionIndex].answer
              &&(
                <img src={correct} alt='correct' />
              )}
            </button>

            <button tabIndex={2}
              onClick={() => handleOptionClick(questions[currentQuestionIndex].options[2])}
              className={`option-button ${submitted && selectedOption === questions[currentQuestionIndex].options[2] ? 'selected' : ''} ${submitted && questions[currentQuestionIndex].options[2] === questions[currentQuestionIndex].answer ? 'correct' : 'wrong'}`}
              disabled={submitted} // Disable options if submitted
            >
              <span>C</span>
              <p>{questions[currentQuestionIndex].options[2]}</p>
              {submitted && selectedOption === questions[currentQuestionIndex].options[2] &&(
                <img src={isCorrect ? correct : wrong} alt={isCorrect ? 'Correct' : 'Wrong'} />
              )}
              {submitted && selectedOption !== questions[currentQuestionIndex].options[2] 
              && questions[currentQuestionIndex].options[2] === questions[currentQuestionIndex].answer
              &&(
                <img src={correct} alt='correct' />
              )}
            </button>

            <button tabIndex={3}
              onClick={() => handleOptionClick(questions[currentQuestionIndex].options[3])}
              className={`option-button ${submitted && selectedOption === questions[currentQuestionIndex].options[3] ? 'selected' : ''} ${submitted && questions[currentQuestionIndex].options[3] === questions[currentQuestionIndex].answer ? 'correct' : 'wrong'}`}
              disabled={submitted} // Disable options if submitted
            >
              <span>D</span>
              <p>{questions[currentQuestionIndex].options[3]}</p>
              {submitted && selectedOption === questions[currentQuestionIndex].options[3] &&(
                <img src={isCorrect ? correct : wrong} alt={isCorrect ? 'Correct' : 'Wrong'} />
              )}
              {submitted && selectedOption !== questions[currentQuestionIndex].options[3] 
              && questions[currentQuestionIndex].options[3] === questions[currentQuestionIndex].answer
              &&(
                <img src={correct} alt='correct' />
              )}
            </button>

              <button tabIndex={4} className="submit-button" onClick={submitted ? handleNextQuestion : handleSubmitAnswer}>
                {submitted ? 'Next Question' : 'Submit Answer'}
              </button>
  
          </div>

        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Quiz;
