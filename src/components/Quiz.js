import { useState } from "react";

function Quiz(props) {
  const { data, handleAnswer } = props;

  const questionList = data.map((data) => data.question);

  const answerList = data.map((data) => {
    let answers = [...data.incorrect_answers, data.correct_answer];
    answers = answers.sort(() => Math.random() - 0.5);
    return answers;
  });

  function returnQuestionBlock() {
    return questionList.map((question, index) => {
      return (
        <div className="question-block" key={index}>
          <h3 className="question">{question}</h3>
          <div className="answer-block">
            {answerList[index].map((answer, index) => {
              return (
                <button
                  className="answer btn"
                  key={index}
                  onClick={() => handleAnswer(answer, index)}
                >
                  {answer}
                </button>
              );
            })}
          </div>
          <hr />
        </div>
      );
    });
  }
  return (
    <div className="quiz-page">
      <div className="page-block">{returnQuestionBlock()}</div>

      <div>
        checking answer
        <button>Check Answers</button>
      </div>
    </div>
  );
}

export default Quiz;
