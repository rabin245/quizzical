import blob_1 from "./images/blobs_1.png";
import blob_2 from "./images/blobs_2.png";
import Start from "./components/Start";

function App() {
  return (
    <div className="App">
      <img className="blob-bottom" src={blob_1} alt="blob" />
      <img className="blob-top" src={blob_2} alt="blob" />
      <Start />
    </div>
  );
}

export default App;
