import { useState, useCallback } from 'react';

import quizCompleteImg from '../assets/quiz-complete.png';
import QUESTIONS from '../questions';
import QuestionTimer from './QuestionTimer';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const HandleSelectAnswer = useCallback(function HandleSelectAnswer(
    selectedAnswer
  ) {
    setUserAnswers((prevAnswers) => {
      return [...prevAnswers, selectedAnswer];
    });
  },
  []);

  const handleSkipAnswer = useCallback(
    () => HandleSelectAnswer(null),
    [HandleSelectAnswer]
  );

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Quiz completed" />
        <h2>Quiz Completed</h2>
      </div>
    );
  }

  const shuffeledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffleArray(shuffeledAnswers);

  return (
    <div id="quiz">
      <div id="questions">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={5000}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffeledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => HandleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Quiz;
