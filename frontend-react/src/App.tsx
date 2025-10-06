// App.tsx

import React, { useState, createContext } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Home from './home/home';
import Quiz from './quiztest/quiz';
import Score from './score/score';
import PatternDark from './images/pattern-background-desktop-dark.svg';
import PatternLight from './images/pattern-background-desktop-light.svg';

export interface ThemeContextType {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

export const ThemeContext = createContext<ThemeContextType>({
  toggleTheme: () => {},
  isDarkMode: true,
});

const PatternOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 1;
`;

const PatternImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 1;
  z-index: 1;
`;

const AppContainer = styled.div<{ isDarkMode: boolean }>`
  background-color: ${({ isDarkMode }) => (isDarkMode ? '#1a1a1a' : '#ffffff')};
  min-height: 100vh;
  color: ${({ isDarkMode }) => (isDarkMode ? '#ffffff' : '#000000')};
`;

const App: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [iconSrc, setIconSrc] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

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

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDarkMode }}>
      <PatternOverlay>
        <PatternImage src={isDarkMode ? PatternDark : PatternLight} alt="pattern svg" />
      </PatternOverlay>
      <AppContainer isDarkMode={isDarkMode}>
        <button onClick={toggleTheme}>
          Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
        </button>
        {quizCompleted ? (
          <Score
            score={score}
            totalQuestions={totalQuestions}
            topic={selectedTopic}
            onRestart={handleBackToHome}
            title={title}
            iconSrc={iconSrc}
          />
        ) : selectedTopic ? (
          <Quiz topic={selectedTopic} onComplete={handleQuizComplete} />
        ) : (
          <Home onSelectTopic={handleSelectTopic} />
        )}
        {selectedTopic && !quizCompleted && (
          <button onClick={handleBackToHome}>Back to Home</button>
        )}
      </AppContainer>
    </ThemeContext.Provider>
  );
};

export default App;
