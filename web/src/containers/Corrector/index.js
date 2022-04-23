import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import axios from "axios";

const Corrector = (props) => {
  const [pending, setPending] = useState();
  const [correctList, setCorrectList] = useState([]);

  useEffect(() => {
    needsCorrection();
  }, []);

  function needsCorrection() {
    axios.get("http://localhost:3001/api/needs-correction").then((res) => {
      if (correctList.length === 0) setCorrectList(res.data[0]);
      setPending(res.data[1][0]);
    });
  }

  function correctIt(correct) {
    axios
      .post("http://localhost:3001/api/correction", {
        ...pending,
        correct,
      })
      .then((res) => {
        needsCorrection();
      });
  }

  return (
    <div>
      <h2>{pending?.incorrect}</h2>
      <div className="d-flex flex-wrap p-4">
        {correctList.map((i) => (
          <Button
            key={i}
            onClick={() => {
              correctIt(i);
            }}
            className="m-2"
          >
            {i}
          </Button>
        ))}
        <Button
          onClick={() => {
            correctIt(undefined);
          }}
          className="m-2"
        >
          dunno
        </Button>
      </div>
    </div>
  );
};

export default Corrector;
