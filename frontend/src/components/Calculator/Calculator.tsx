import { useEffect, useRef } from "react";
import Desmos from "desmos";
import CalculatorHeader from "./CalculatorHeader";

const Calculator = (): JSX.Element => {
  const calcElem = useRef(document.createElement("div"));
  const calculator = useRef(Desmos.GraphingCalculator());

  useEffect(() => {
    calculator.current = Desmos.GraphingCalculator(calcElem.current);
    calculator.current.setExpression({ id: "graph1", latex: "y=x^2" });
  }, []); // only runs on component mount

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexFlow: "column",
      }}
    >
      <CalculatorHeader />
      <div ref={calcElem} style={{ width: "100%", flex: "1 1 auto" }} />
    </div>
  );
};

export default Calculator;
