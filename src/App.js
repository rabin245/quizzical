import { useState, useEffect } from "react";
import blob_1 from "./images/blobs_1.png";
import blob_2 from "./images/blobs_2.png";
import Start from "./components/Start";
import Quiz from "./components/Quiz";

function App() {
  const [start, setStart] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    try {
      const fetchData = async () => {
        const response = await fetch(
          "https://opentdb.com/api.php?amount=5&type=multiple"
        );
        const data = await response.json();
        await setQuestionList(data.results);
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
      newAnswers[index] = answer;
      return newAnswers;
    });
  }

  function page() {
    const startPage = (
      <>
        <img className="blob-bottom" src={blob_1} alt="blob" />
        <img className="blob-top" src={blob_2} alt="blob" />
        <Start onClick={startQuiz} />
      </>
    );

    const quizPage = (
      <>
        <Quiz data={questionList} handleAnswer={handleAnswer} />
      </>
    );

    // if (start && isFetched) {
    //   return quizPage;
    // } else {
    //   return startPage;
    // }
    return quizPage;
  }

  return <div className="App">{page()}</div>;
}

export default App;
