import React from "react";
import { AnswerObject } from "../App";

type Properties = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject| undefined;
    questionNr: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Properties> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNr,
    totalQuestions
}) => ( 
    <div> 
      <p className="number">
        Question: {questionNr} / {totalQuestions}
      </p>  
      <p dangerouslySetInnerHTML={{ __html: question}}/>
      <div>
        {answers.map(answers => 
            <div key={answers}>
               <button disabled={userAnswer ? true : false} value={answers} onClick={callback}>
                 <span dangerouslySetInnerHTML={{ __html: answers}} />
               </button>
            </div>
        )}
      </div>
    </div>
);

export default QuestionCard;