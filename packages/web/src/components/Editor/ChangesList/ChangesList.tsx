import { ExpressionChange } from "../../../interfaces/expressions";
import { useAppSelector } from "../../../redux/hooks";
import ChangesListItem from "./ChangesListItem";
import { SaveButton } from "./SaveButton";

const ChangesList = (): JSX.Element => {
  const changes = useAppSelector((state) => state.expressions.changes);
  // TODO: discard changes
  return (
    <div className="h-full p-4">
      <div className="flex items-center justify-around">
        <div className="text-2xl font-bold">Changes Made</div>
        <div className="text-xl">
          <SaveButton />
        </div>
      </div>
      {changes.length !== 0 && (
        <div>
          {changes
            .filter((change: ExpressionChange | undefined) => change)
            .map((change: ExpressionChange) => {
              return <ChangesListItem key={change.id} change={change} />;
            })}
        </div>
      )}
    </div>
  );
};

export default ChangesList;
