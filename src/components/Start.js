function Start(props) {
  const { onClick: startQuiz } = props;

  return (
    <div className="start-page">
      <h1 className="title">Quizzical</h1>
      <p className="description">Quiz but with a 'zical' smiley face :-P</p>
      <button className="btn" onClick={startQuiz}>
        <span>Start quiz</span>
      </button>
    </div>
  );
}

export default Start;
