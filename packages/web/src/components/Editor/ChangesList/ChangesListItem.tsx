import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import "katex/dist/katex.min.css";
import TeX from "@matejmazur/react-katex";
import { ExpressionChange } from "../../../interfaces/changesList";
import {
  AddTwoTone,
  FiberManualRecordTwoTone,
  RemoveTwoTone,
} from "@material-ui/icons";

interface Props {
  change: ExpressionChange;
}

const ChangesListItem = ({ change }: Props): JSX.Element => {
  let icon: JSX.Element;
  if (change.changeType === "added") {
    icon = <AddTwoTone htmlColor="green" fontSize="large" />;
  } else if (change.changeType === "removed") {
    icon = <RemoveTwoTone htmlColor="red" fontSize="large" />;
  } else {
    // changeType === "no change"
    icon = <FiberManualRecordTwoTone htmlColor="yellow" fontSize="large" />;
  }
  return (
    <ListItem divider>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>
        <TeX math={change.latex} style={{ fontSize: "1.5rem" }} />
      </ListItemText>
    </ListItem>
  );
};

export default ChangesListItem;
