import React, {useState} from 'react';
import QuestionCard from './components/QuestionCard';
import { fetchQuizQuestions } from './API';
//Types
import { QuestionState,Difficulty } from './API';

export type AnswerObject = { 
  question: string;
  answer: string; 
  correct: boolean;
  correctAnswer: string;
}

  const  App = () => {

  const TOTAL_QUESTIONS = 10;

  const [loading, setLoading] = useState(false); 
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY))

  const startTrivia = async () => {
     setLoading(true);
     setGameOver(false);

  const newQuestions = await fetchQuizQuestions(
     TOTAL_QUESTIONS,
     Difficulty.EASY
     );

     setQuestions(newQuestions);
     setScore(0);
     setUserAnswers([]);
     setNumber(0);
     setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

    if (!gameOver) {
      //User answer
      const answer = e.currentTarget.value;
      //check answer against correct value
      const correct = questions[number].correct_answer === answer;
      //Add score if answer correct
      if (correct) setScore(prev => prev + 1);
      //Save answer in the array for users answers
      const answerObject = {
        question : questions[number].question, 
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers(prev => [...prev, answerObject]);
    }

  };

  const nextQuestion = () => {
    //Move on to the next question if not the last
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);

    } else {
      setNumber(nextQuestion);
    }
  };

  return (
  <div className='App'>
    <h1>React Quiz</h1>
    {gameOver|| userAnswer.length === TOTAL_QUESTIONS ? (
    <button className='start' onClick={startTrivia}>
      Start
    </button>
    ): null}
    {!gameOver ? <p className='score'>Score:</p> : null}
    {loading ? <p>Loading Questions...</p> : null}
    {!loading && !gameOver && (
        <QuestionCard
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswer ? userAnswer[number]: undefined}
          callback={checkAnswer}
       /> 
    )}
    {!gameOver && !loading && userAnswer.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
      <button className='next' onClick={nextQuestion}>   
        Next Question   
      </button>
        ) : null}
      </div>  
     );    
  };

export default App;
