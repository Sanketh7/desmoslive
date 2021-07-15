/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import Desmos from "desmos";
import _ from "lodash";
import CalculatorHeader from "./CalculatorHeader";
import { useChangesContext } from "../../../contexts/ChangesContext";
import { ExpressionChange } from "../../../interfaces/changesList";

const Calculator = (): JSX.Element => {
  const calcElem = useRef(document.createElement("div"));
  const calculator = useRef(Desmos.GraphingCalculator());

  const { setChangesList } = useChangesContext();

  const updateChangesList = () => {
    const changes: ExpressionChange[] = calculator.current
      .getState()
      .expressions.list.filter((expr: any) => expr.latex) // ignores lines that don't contain any latex
      .map((expr: any): ExpressionChange => {
        return { changeType: "added", latex: expr.latex };
      });
    setChangesList(changes);
  };

  const throttledUpdateChangesList = _.throttle(updateChangesList, 1000, {
    trailing: true,
  });

  useEffect(() => {
    calculator.current = Desmos.GraphingCalculator(calcElem.current);
    calculator.current.setExpression({ id: "graph1", latex: "y=x^2" });
    calculator.current.observeEvent("change", throttledUpdateChangesList);
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
