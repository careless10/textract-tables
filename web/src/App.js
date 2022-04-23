import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Button } from "reactstrap";
import axios from "axios";
import { useState } from "react";
import ChartsList from "./containers/ChartsList";
import Corrector from "./containers/Corrector";

function App() {
  const [prices, setPrices] = useState([]);
  const [corrections, setCorrections] = useState([]);
  const [correctList, setCorrectList] = useState([]);
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

  function setup() {
    axios.get("http://localhost:3001/api/setup").then((res) => {});
  }

  function needsCorrection() {
    axios.get("http://localhost:3001/api/needs-correction").then((res) => {
      setCorrectList(res.data[0]);
      setCorrections(res.data[1]);
    });
  }

  return (
    <div className="">
      <Button onClick={setup}>setup</Button>
      <Button onClick={extract}>extract</Button>
      <Button onClick={process}>process</Button>
      <Button onClick={list}>list</Button>
      <Button onClick={needsCorrection}>Correction</Button>
      <Corrector correctList={correctList} corrections={corrections} />
      {prices.length > 0 && <ChartsList list={prices} />}
    </div>
  );
}

export default App;
