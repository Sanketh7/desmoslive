/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import Desmos from "desmos";
import * as Diff from "diff";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import CalculatorHeader from "./CalculatorHeader";
import { ExpressionChange } from "../../../interfaces/expressions";
import { useGraphExpressionsSWR } from "../../../api/fetchers";
import {
  setExpressionsChanges,
  setExpressionsCurrent,
} from "../../../redux/slices/expressionsSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

const Calculator = (): JSX.Element => {
  const calcElem = useRef(document.createElement("div"));
  const calculator = useRef(Desmos.GraphingCalculator());

  const dispatch = useAppDispatch();

  const authToken = useAppSelector((state) => state.auth.token);
  const activeGraph = useAppSelector((state) => state.activeGraph);

  const { expressions: oldExpressions } = useGraphExpressionsSWR(
    authToken,
    activeGraph.id
  );

  // updates redux store with changes
  const updateChanges = async () => {
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
        if (part.added) changes.push({ changeType: "added", latex: latex });
        else if (part.removed)
          changes.push({ changeType: "removed", latex: latex });
      });
    });

    dispatch(
      setExpressionsCurrent(
        newExpressions.map((latex) => {
          return { latex: latex };
        })
      )
    );
    dispatch(setExpressionsChanges(changes));
  };

  const throttledUpdateChangesList = _.throttle(updateChanges, 1000, {
    trailing: true,
  });

  useEffect(() => {
    calculator.current = Desmos.GraphingCalculator(calcElem.current);
    calculator.current.observeEvent("change", throttledUpdateChangesList);
  }, []); // only runs on component mount

  useEffect(() => {
    calculator.current.setBlank();
    console.log(activeGraph.id);
    console.log(oldExpressions);
    oldExpressions?.forEach((latex) => {
      calculator.current.setExpression({ id: uuidv4(), latex: latex });
    });
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
