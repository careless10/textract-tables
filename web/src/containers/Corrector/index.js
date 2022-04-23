import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";

const Corrector = (props) => {
  const { correctList, corrections } = props;
  const [result, setResult] = useState([]);
  const [pending, setPending] = useState([...corrections]);

  function correctIt(correct) {
    setResult((prev) => [
      ...prev,
      { incorrect: pending[pending.length - 1], correct },
    ]);
    const newPending = [...pending];
    newPending.pop();
    setPending(newPending);
  }

  return (
    <div>
      <h2>{pending[pending.length - 1]}</h2>
      <div className="d-flex flex-wrap p-4">
        {correctList.map((i) => (
          <Button key={i} onClick={() => {}} className="m-2">
            {i}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Corrector;
