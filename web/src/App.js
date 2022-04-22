import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Button } from "reactstrap";
import axios from "axios";

function App() {
  function process() {
    axios.get("http://localhost:3001/api/process");
  }
  return (
    <div className="App">
      <Button onClick={process}>process</Button>
    </div>
  );
}

export default App;
