import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Button } from "reactstrap";
import axios from "axios";
import { useState } from "react";
import ChartsList from "./containers/ChartsList";
import Corrector from "./containers/Corrector";

function App() {
  const [prices, setPrices] = useState([]);
  const [correction, setCorrection] = useState();
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

  return (
    <div className="">
      <Button onClick={setup}>setup</Button>
      <Button onClick={extract}>extract</Button>
      <Button onClick={process}>process</Button>
      <Button onClick={list}>list</Button>
      <Corrector />
      {prices.length > 0 && <ChartsList list={prices} />}
    </div>
  );
}

export default App;
