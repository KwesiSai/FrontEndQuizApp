import React from 'react';
import htmlicon from '../images/icon-html.svg'
import jsicon from '../images/icon-js.svg'
import cssicon from '../images/icon-css.svg'
import accicon from '../images/icon-accessibility.svg'
import './home.css'

interface Props {
    onSelectTopic: (topic: string) => void;
  }
  
  const Home: React.FC<Props> = ({ onSelectTopic }) => {
    const topics = ['HTML', 'CSS', 'JavaScript', 'Accessibility'];
    return (
    <div className="container">
         <div className="Home">
            <h1>Welcome to the <span>FrontEnd Quiz!</span></h1>
            <p> pick a subject to get started</p>
        </div>

        <div className="topic">
            <button onClick={() => onSelectTopic(topics[0])}>
                <img src={htmlicon} alt="htmlicon"/>
                <span> HTML </span>
            </button>
            <button onClick={() => onSelectTopic(topics[1])}>
                <img src={cssicon} alt="cssicon"/>
                <span> CSS </span>
            </button>
            <button onClick={() => onSelectTopic(topics[2])}>
                <img src={jsicon} alt="jsicon"/>
                <span> Javascript </span>
            </button>
            <button onClick={() => onSelectTopic(topics[3])}>
                <img src={accicon} alt="accicon"/>
                <span> Accessibility </span>
            </button>
        </div> 
    </div>  
  );
}

export default Home;