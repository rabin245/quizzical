import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

function Quiz(props) {
  const { data, handleAnswer } = props;

  const [questionList, setQuestionList] = useState(
    data.map((data) => data.question)
  );
  const [answerList, setAnswerList] = useState(
    data.map((data) => {
      let answers = [...data.incorrect_answers, data.correct_answer];
      answers = answers.sort(() => Math.random() - 0.5);

      return answers.map((answer) => ({
        id: nanoid(),
        answer: answer,
        chosen: false,
      }));
    })
  );

  const answerButtonStyle = {
    backgroundColor: "#d6dbf5",
    border: "none",
  };

  function replaceEntities(str) {
    const entities = {
      "&#039;": "'",
      "&quot;": '"',
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
    };

    return str.replace(
      /&#039;|&quot;|&amp;|&lt;|&gt;/g,
      (match) => entities[match]
    );
  }

  function choseAnswer(index, id) {
    setAnswerList((prevAnswers) => {
      return prevAnswers.map((answersList, i) => {
        if (i === index) {
          return answersList.map((answer) => {
            if (answer.id === id) {
              return { ...answer, chosen: !answer.chosen };
            }
            return { ...answer, chosen: false };
          });
        } else {
          return answersList;
        }
      });
    });
  }

  function returnQuestionBlock() {
    return questionList.map((question, index) => {
      question = replaceEntities(question);
      return (
        <div className="question-block" key={index}>
          <h3 className="question">{question}</h3>
          <div className="answer-block">
            {answerList[index].map((answerObj, i) => {
              const answer = replaceEntities(answerObj.answer);
              return (
                <button
                  className="answer"
                  key={i}
                  onClick={() => {
                    console.log("clicked on", answer, i);
                    choseAnswer(index, answerObj.id);
                    handleAnswer(answer, index);
                  }}
                  style={answerObj.chosen ? answerButtonStyle : null}
                >
                  <span>{answer}</span>
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

      <div className="button-block">
        {/* <span className="remarks">You scored 3/5 correct answers</span> */}
        <button className="btn check">
          <span>Check Answers</span>
          {/* <span>Play again</span> */}
        </button>
      </div>
    </div>
  );
}

export default Quiz;
