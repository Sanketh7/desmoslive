import "katex/dist/katex.min.css";
import TeX from "@matejmazur/react-katex";
import { ExpressionChange } from "../../../interfaces/expressions";

interface Props {
  change: ExpressionChange;
}

const ChangesListItem = ({ change }: Props): JSX.Element => {
  return (
    <div
      className={
        "w-full h-min p-1 m-1 rounded-sm text-sm text-center whitespace-nowrap overflow-hidden " +
        (change.changeType === "added" ? "bg-green-300" : "bg-red-300")
      }
    >
      <TeX math={change.latex} />
    </div>
  );
};

export default ChangesListItem;
