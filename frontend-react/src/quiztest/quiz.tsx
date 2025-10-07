// src/components/Quiz.tsx
import React, { useEffect, useState,} from 'react';
import styled, { css } from 'styled-components';
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
  onComplete: (score: number, totalQuestions: number, title: string, iconSrc: string) => void;
}

const Title = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  z-index: 2;
  margin-top: 3%;
  margin-left: 10%;

  img {
    background-color: white;
    border-radius: 12%;
    height: 38px;
    width: 36px;
    padding: 3px 3px;
    object-fit: contain;
  }

  span {
    font-family: Rubik;
    font-weight: 700;
    font-size: 20px;
    margin-top: auto;
    position: relative;
    padding: 5px 20px;
  }
`;

const QuizPage = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 4%;
  margin-left: 3%;
  margin-right: 5%;
  z-index: 2;
`;

const QuestionSection = styled.div`
  display: flex;
  flex-direction: column;
  left: 10%;
  position: absolute;
  width: 40%;

  .question-count p {
    font-family: Rubik-Italic;
    color: rgb(171, 193, 225);
    width: 100%;
  }

  .question-text {
    font-family: Rubik;
    font-weight: 500;
    font-size: 25px;
    position: absolute;
    margin-top: 7%;
    letter-spacing: 3px;
    -webkit-text-stroke: 1px;
  }

  .bar {
    background-color: rgb(98, 108, 127);
    width: 80%;
    height: 10px;
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-items: center;
    position: relative;
    margin-top: 50%;
  }

  .progress {
    background-color: rgb(167, 41, 245);
    height: 60%;
    transition: width 0.1s ease;
    width: 0;
    border-radius: 20px;
    margin-left: 1%;
  }
`;

const AnswerSection = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  left: 60%;
  text-align: left;
`;

interface OptionButtonProps {
  submitted: boolean;
  selected: boolean;
  isCorrect: boolean;
  isWrong: boolean;
}

const OptionButton = styled.button<OptionButtonProps>`
  width: 380px;
  border-radius: 16px;
  padding: 3px;
  background-color: rgb(59, 77, 102);
  color: white;
  border: 1px solid transparent;
  height: 70px;
  margin-bottom: 4%;
  font-size: 17px;
  display: flex;
  flex-direction: row;
  font-family: Rubik;
  align-items: center;

  p {
    text-align: left;
  }

  &:focus {
    border: 2px solid rgb(167, 41, 245);
  }

  &:hover:not(:focus) span {
    color: rgb(167, 41, 245);
    transform: scale(1.1);
  }

  ${({ submitted, selected, isCorrect, isWrong }) => css`
    ${submitted && selected && isCorrect && css`
      border: 2px solid rgb(38, 215, 130);
      span {
        background-color: rgb(38, 215, 130);
        color: white;
      }
    `}
    ${submitted && selected && !isCorrect && css`
      border: 2px solid rgb(238, 84, 84);
      span {
        background-color: rgb(238, 84, 84);
        color: white;
      }
    `}
  `}

  img {
    transform: scale(0.7);
    margin-left: auto;
  }
`;

const OptionSpan = styled.span`
  margin-right: 10px;
  margin-left: 10px;
  padding: 5px;
  background-color: white;
  border-radius: 5px;
  border: 1px solid transparent;
  color: rgb(49, 82, 61);
  width: 33px;
  height: 30px;
  font-family: Rubik;
  font-weight: 1000;
`;

const SubmitButton = styled.button`
  background-color: rgb(167, 41, 245);
  color: white;
  font-family: Rubik;
  font-weight: 1000;
  border: 1px solid transparent;
  height: 60px;
  margin-bottom: 3%;
  width: 380px;
  border-radius: 16px;
  font-size: larger;

  &:hover {
    background-color: rgb(210, 148, 248);
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;
  font-family: Rubik;

  img {
    transform: scale(0.7);
  }
`;

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
    fetch(`${process.env.PUBLIC_URL}/data.json`)
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
      <Title>
        <img src={iconSrc} alt="icon" />
        <span>{title}</span>
      </Title>
      <QuizPage>
        {questions.length > 0 && (
          <>
            <QuestionSection>
              <div className="question-count">
                <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
              </div>
              <div className="question-text">{questions[currentQuestionIndex].question}</div>
              <div className="bar">
                <div className="progress" style={{ width: `${progress}%` }} />
              </div>
            </QuestionSection>
            <AnswerSection>
              {questions[currentQuestionIndex].options.map((option, index) => (
                <OptionButton
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  submitted={submitted}
                  selected={selectedOption === option}
                  isCorrect={option === questions[currentQuestionIndex].answer}
                  isWrong={selectedOption !== option && option === questions[currentQuestionIndex].answer}
                  disabled={submitted}
                >
                  <OptionSpan>{String.fromCharCode(65 + index)}</OptionSpan>
                  <p>{option}</p>
                  {submitted && selectedOption === option && (
                    <img src={isCorrect ? correct : wrong} alt={isCorrect ? 'Correct' : 'Wrong'} />
                  )}
                  {submitted && selectedOption !== option && option === questions[currentQuestionIndex].answer && (
                    <img src={correct} alt="correct" />
                  )}
                </OptionButton>
              ))}
              <SubmitButton onClick={submitted ? handleNextQuestion : handleSubmitAnswer}>
                {submitted ? 'Next Question' : 'Submit Answer'}
              </SubmitButton>
              {showError && (
                <ErrorMessage>
                  <img src={error} alt='error'/>
                  Please select an option
                </ErrorMessage>
              )}
            </AnswerSection>
          </>
        )}
      </QuizPage>
    </>
  );
};

export default Quiz;
