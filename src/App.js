import { useState, useEffect } from "react";
import blob_1 from "./images/blobs_1.png";
import blob_2 from "./images/blobs_2.png";
import Start from "./components/Start";
import Quiz from "./components/Quiz";

function App() {
  const [start, setStart] = useState(false);
  const [questionInfoList, setQuestionInfoList] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    try {
      const fetchData = async () => {
        const response = await fetch(
          "https://opentdb.com/api.php?amount=5&type=multiple"
        );
        const data = await response.json();
        await setQuestionInfoList(data.results);
      };
      fetchData();
      setIsFetched(true);
    } catch (err) {
      console.log(err);
    }

    return () => abortController.abort();
  }, []);

  function startQuiz() {
    setStart(true);
  }

  function handleAnswer(answer, index) {
    setUserAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[index] = {
        answer,
        correct: answer === questionInfoList[index].correct_answer,
      };
      return newAnswers;
    });
  }

  function checkCorrectAnswers() {
    setCorrectAnswersCount(
      userAnswers.filter((answer) => answer.correct).length
    );
    setIsFinished(true);
  }

  function page() {
    const startPage = (
      <>
        <Start onClick={startQuiz} />
      </>
    );

    const quizPage = (
      <>
        <Quiz
          data={questionInfoList}
          handleAnswer={handleAnswer}
          userAnswers={userAnswers}
          correctAnswersCount={correctAnswersCount}
          checkCorrectAnswers={checkCorrectAnswers}
          isFinished={isFinished}
        />
      </>
    );

    if (start && isFetched) {
      return quizPage;
    } else {
      return startPage;
    }
  }

  return (
    <div className="App">
      <img className="blob-bottom" src={blob_1} alt="blob" />
      <img className="blob-top" src={blob_2} alt="blob" />
      {page()}
    </div>
  );
}

export default App;
