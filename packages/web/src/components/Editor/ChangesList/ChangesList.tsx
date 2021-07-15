import { List } from "semantic-ui-react";
import { useChangesContext } from "../../../contexts/ChangesContext";
import { Change } from "../../../interfaces/changesList";
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
          .filter((change: Change | undefined) => change)
          .map((change: Change) => {
            return (
              <ChangesListItem
                key={change.latex}
                text={change.latex}
                changeType={change.type}
              />
            );
          })}
      </List>
    </div>
  );
};

export default ChangesList;
