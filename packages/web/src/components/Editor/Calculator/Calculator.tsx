/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import Desmos from "desmos";
import * as Diff from "diff";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import CalculatorHeader from "./CalculatorHeader";
import { ExpressionChange } from "../../../interfaces/expressions";
import { useBranchExpressionsSWR } from "../../../api/swrRequests";
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
  const activeBranch = useAppSelector((state) => state.activeBranch);

  const { expressions: oldExpressions, mutate: mutateExpressions } =
    useBranchExpressionsSWR(authToken, activeBranch.id);

  // force refresh of expressions when branch is changed
  useEffect(() => {
    mutateExpressions();
  }, [activeBranch]);

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
      const usedIDs = new Set(); // these IDs are used to reduce re-renders of changes in changes list
      part.value.forEach((latex) => {
        const id = usedIDs.has(latex) ? latex + uuidv4() : latex;
        usedIDs.add(id);
        if (part.added)
          changes.push({ changeType: "added", latex: latex, id: id });
        else if (part.removed)
          changes.push({ changeType: "removed", latex: latex, id: id });
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
  }, []); // only runs on component mount

  // whenever the old expressions change, update the calculator to reflect these changes
  useEffect(() => {
    calculator.current.observeEvent("change", throttledUpdateChangesList);
    calculator.current.setBlank();
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
