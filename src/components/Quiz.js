import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

function Quiz(props) {
  const {
    data,
    handleAnswer,
    correctAnswersCount,
    checkCorrectAnswers,
    isFinished,
    userAnswers,
  } = props;

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

  const [correctAnswersList, setCorrectAnswersList] = useState(
    data.map((data) => data.correct_answer)
  );

  const answerButtonStyle = (chosen, index) => {
    // game is not finished
    if (!isFinished) {
      if (chosen) {
        return {
          backgroundColor: "#d6dbf5",
          border: "none",
        };
      }
    } else {
      // game is not finished
      // chosen answer is correct
      if (chosen && userAnswers[index].correct) {
        return {
          backgroundColor: "#94D7A2",
          border: "none",
        };
      }
      // chosen answer is incorrect
      else if (chosen && !userAnswers[index].correct) {
        return {
          backgroundColor: "#F8BCBC",
          opacity: "0.5",
        };
      } else {
        return {
          opacity: "0.5",
        };
      }
    }
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

  function chooseAnswer(index, id) {
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
                    if (!isFinished) {
                      chooseAnswer(index, answerObj.id);
                      handleAnswer(answer, index);
                    }
                  }}
                  style={answerButtonStyle(answerObj.chosen, index)}
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
        {isFinished && (
          <span className="remarks">
            You scored {correctAnswersCount}/5 correct answers
          </span>
        )}
        <button className="btn check" onClick={checkCorrectAnswers}>
          <span>{isFinished ? "Play again" : "Check Answers"}</span>
        </button>
      </div>
    </div>
  );
}

export default Quiz;
