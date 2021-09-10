import { useAppSelector } from "../../../redux/hooks";
import { ShareButton } from "./ShareButton";
import { RenameButton } from "./RenameButton";
import { DeleteButton } from "./DeleteButton";
import { BranchSelect } from "./BranchSelect";
import { BiError, BiCheckCircle } from "react-icons/bi";

const CalculatorHeader = (): JSX.Element => {
  const activeGraph = useAppSelector((state) => state.activeGraph);
  const changes = useAppSelector((state) => state.expressions.changes);

  return (
    <div className="py-1 px-2">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-x-4">
          <span className="text-lg py-1 px-2 bg-white rounded-md border-2 border-black">
            {activeGraph.name}
          </span>
          {activeGraph.isOwner && (
            <span className="text-xl flex items-center">
              <RenameButton />
              <ShareButton />
              <DeleteButton />
            </span>
          )}
        </div>
        <div
          className={
            "py-1 px-2 rounded-md text-lg flex items-center gap-x-2 " +
            (changes.length > 0 ? "bg-red-300" : "bg-green-300")
          }
        >
          {changes.length > 0 ? <BiError /> : <BiCheckCircle />}
          <span>
            {changes.length > 0 ? "Unsaved Changes!" : "No Unsaved Changes"}
          </span>
        </div>
      </div>
      <div className="w-full">
        <BranchSelect />
      </div>
    </div>
  );
};

export default CalculatorHeader;
