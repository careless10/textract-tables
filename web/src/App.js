import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Button } from "reactstrap";
import axios from "axios";
import { useState } from "react";

function App() {
  const [prices, setPrices] = useState([]);
  function extract() {
    axios.get("http://localhost:3001/api/extract");
  }

  function process() {
    axios.get("http://localhost:3001/api/process");
  }

  function list() {
    axios.get("http://localhost:3001/api/list").then((res) => {
      setPrices(res.data);
    });
  }

  return (
    <div className="App">
      <Button onClick={extract}>extract</Button>
      <Button onClick={process}>process</Button>
      <Button onClick={list}>list</Button>
      {prices.map((i) => (
        <p>{i.name}</p>
      ))}
    </div>
  );
}

export default App;
