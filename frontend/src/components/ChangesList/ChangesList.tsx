import { List } from "semantic-ui-react";
import ChangesListItem from "./ChangesListItem";

const ChangesList = (): JSX.Element => {
  return (
    <div style={{ width: "100%", height: "100%", padding: "1rem" }}>
      <List
        size="massive"
        divided
        relaxed
        style={{ width: "100%", height: "100%" }}
      >
        <ChangesListItem text="y=x^2" changeType="no change" />
        <ChangesListItem text="y=x^3" changeType="added" />
        <ChangesListItem text="y=x^4" changeType="removed" />
      </List>
    </div>
  );
};

export default ChangesList;
