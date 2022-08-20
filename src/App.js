import { useState, useEffect } from "react";
import blob_1 from "./images/blobs_1.png";
import blob_2 from "./images/blobs_2.png";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import Confetti from "react-confetti";
import { nanoid } from "nanoid";

function App() {
  const [start, setStart] = useState(false);
  const [questionInfoList, setQuestionInfoList] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [answerList, setAnswerList] = useState([]);

  useEffect(() => {
    fetchQuestionsInfo();
  }, []);

  useEffect(() => {
    setAnswerList(
      questionInfoList.map((data) => {
        let answers = [...data.incorrect_answers, data.correct_answer];
        answers = answers.sort(() => Math.random() - 0.5);

        return answers.map((answer) => ({
          id: nanoid(),
          answer: answer,
          chosen: false,
        }));
      })
    );
  }, [questionInfoList]);

  function startQuiz() {
    setStart(true);
  }

  function fetchQuestionsInfo() {
    const abortController = new AbortController();

    try {
      const fetchData = async () => {
        const response = await fetch(
          "https://opentdb.com/api.php?amount=5&category=31&type=multiple"
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

  async function restartGame() {
    setIsFinished(false);
    await fetchQuestionsInfo();
    setUserAnswers([]);
    setCorrectAnswersCount(0);
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
          questionList={questionInfoList.map((data) => data.question)}
          answerList={answerList}
          setAnswerList={setAnswerList}
          correctAnswersList={questionInfoList.map(
            (data) => data.correct_answer
          )}
          handleAnswer={handleAnswer}
          userAnswers={userAnswers}
          correctAnswersCount={correctAnswersCount}
          checkCorrectAnswers={checkCorrectAnswers}
          isFinished={isFinished}
          restartGame={restartGame}
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
      {isFinished && <Confetti />}
    </div>
  );
}

export default App;
