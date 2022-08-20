function Quiz(props) {
  const {
    questionList,
    answerList,
    setAnswerList,
    correctAnswersList,
    handleAnswer,
    correctAnswersCount,
    checkCorrectAnswers,
    isFinished,
    userAnswers,
    restartGame,
  } = props;

  const answerButtonStyle = (answerObj, index) => {
    const { answer, chosen } = answerObj;
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
      // correct answer
      if (answer === correctAnswersList[index]) {
        return {
          backgroundColor: "#94D7A2",
          border: "none",
        };
      }
      // chosen answer is incorrect
      if (chosen && !userAnswers[index].correct) {
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
                  style={answerButtonStyle(answerObj, index)}
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
        <button
          className="btn check"
          onClick={() => {
            if (!isFinished) {
              checkCorrectAnswers();
            } else {
              restartGame();
            }
          }}
        >
          <span>{isFinished ? "Play again" : "Check Answers"}</span>
        </button>
      </div>
    </div>
  );
}

export default Quiz;
