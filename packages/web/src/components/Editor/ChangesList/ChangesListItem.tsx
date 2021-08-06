import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import "katex/dist/katex.min.css";
import TeX from "@matejmazur/react-katex";
import { ExpressionChange } from "../../../interfaces/expressions";
import { AddTwoTone, RemoveTwoTone } from "@material-ui/icons";

interface Props {
  change: ExpressionChange;
}

const ChangesListItem = ({ change }: Props): JSX.Element => {
  return (
    <ListItem divider>
      <ListItemIcon>
        {change.changeType === "added" ? (
          <AddTwoTone htmlColor="green" fontSize="large" />
        ) : (
          <RemoveTwoTone htmlColor="red" fontSize="large" />
        )}
      </ListItemIcon>
      <ListItemText>
        <TeX math={change.latex} style={{ fontSize: "1.5rem" }} />
      </ListItemText>
    </ListItem>
  );
};

export default ChangesListItem;
