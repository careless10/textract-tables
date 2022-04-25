import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "reactstrap";
import axios from "axios";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

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
    <Row>
      <Col lg="6">
        <h2 className="text-center">{pending?.incorrect}</h2>
        <h4 className="text-center">{pending?.prices}</h4>
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
      </Col>
      <Col lg="6">
        {pending?.file && (
          <ReactCrop
            crop={{
              unit: "px",
              x: 0,
              y: pending.line,
              width: 1000,
              height: 20,
            }}
          >
            <img
              src={`http://localhost:3001/${pending.file.replace(
                "json",
                "jpg"
              )}`}
            />
          </ReactCrop>
        )}
      </Col>
    </Row>
  );
};

export default Corrector;
