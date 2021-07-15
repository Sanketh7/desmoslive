import { useEffect, useRef } from "react";
import Desmos from "desmos";
import CalculatorHeader from "./CalculatorHeader";
import { useChangesContext } from "../../../contexts/ChangesContext";
import { ExpressionChange } from "../../../interfaces/changesList";

const Calculator = (): JSX.Element => {
  const calcElem = useRef(document.createElement("div"));
  const calculator = useRef(Desmos.GraphingCalculator());

  const { setChangesList } = useChangesContext();

  useEffect(() => {
    calculator.current = Desmos.GraphingCalculator(calcElem.current);
    calculator.current.setExpression({ id: "graph1", latex: "y=x^2" });
  }, []); // only runs on component mount

  const updateChangesList = () => {
    const changes: ExpressionChange[] = calculator.current
      .getState()
      .expressions.list.filter((expr: any) => expr.latex) // ignores lines that don't contain any latex
      .map((expr: any) => {
        return { type: "added", latex: expr.latex };
      });
    setChangesList(changes);
  };

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
      <button onClick={updateChangesList}>click</button>
    </div>
  );
};

export default Calculator;
