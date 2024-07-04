import React from 'react';
import './App.css';
import Home from './home/home';

function App() {
  // Placeholder function for handling topic selection
  const handleTopicSelection = (topic: string) => {
    console.log(`Selected topic: ${topic}`);
    // Add more logic as needed for topic selection
  };

  return (
    <div className="App">
      <Home onSelectTopic={handleTopicSelection} />
    </div>
  );
}

export default App;
