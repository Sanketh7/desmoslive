/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import Desmos from "desmos";
import * as Diff from "diff";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import CalculatorHeader from "./CalculatorHeader";
import { useChangesContext } from "../../../contexts/ChangesContext";
import { ExpressionChange } from "../../../interfaces/changesList";
import { useGraphExpressionsSWR } from "../../../api/fetchers";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useActiveGraphContext } from "../../../contexts/ActiveGraphContext";

const Calculator = (): JSX.Element => {
  const calcElem = useRef(document.createElement("div"));
  const calculator = useRef(Desmos.GraphingCalculator());

  const { setChangesList } = useChangesContext();

  const { authToken } = useAuthContext();
  const { activeGraph } = useActiveGraphContext();
  const { expressions: oldExpressions } = useGraphExpressionsSWR(
    authToken,
    activeGraph?.id
  );

  const updateChangesList = () => {
    const newExpressions: string[] = calculator.current
      .getState()
      .expressions.list.filter((expr: any) => expr.latex)
      .map((expr: any) => expr.latex);
    const diff = Diff.diffArrays(
      oldExpressions ? oldExpressions : [],
      newExpressions
    );
    const changes: ExpressionChange[] = [];
    diff.forEach((part) => {
      part.value.forEach((latex) => {
        changes.push({
          changeType: part.added
            ? "added"
            : part.removed
              ? "removed"
              : "no change",
          latex: latex,
        });
      });
    });

    setChangesList(changes);
  };

  const throttledUpdateChangesList = _.throttle(updateChangesList, 1000, {
    trailing: true,
  });

  useEffect(() => {
    calculator.current = Desmos.GraphingCalculator(calcElem.current);
    calculator.current.observeEvent("change", throttledUpdateChangesList);
  }, []); // only runs on component mount

  useEffect(() => {
    calculator.current.setBlank();
    oldExpressions?.forEach(latex => {
      calculator.current.setExpression({ id: uuidv4(), latex: latex });
    })
  }, [oldExpressions]);

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
