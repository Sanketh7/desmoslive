import { List } from "semantic-ui-react";
import { useChangesContext } from "../../../contexts/ChangesContext";
import { ExpressionChange } from "../../../interfaces/changesList";
import ChangesListItem from "./ChangesListItem";

const ChangesList = (): JSX.Element => {
  const { changesList } = useChangesContext();

  return (
    <div style={{ width: "100%", height: "100%", padding: "1rem" }}>
      <List
        size="massive"
        divided
        relaxed
        style={{ width: "100%", height: "100%" }}
      >
        {changesList
          .filter((change: ExpressionChange | undefined) => change)
          .map((change: ExpressionChange) => {
            return <ChangesListItem key={change.latex} change={change} />;
          })}
      </List>
    </div>
  );
};

export default ChangesList;
