import { List } from "semantic-ui-react";
import "katex/dist/katex.min.css";
import TeX from "@matejmazur/react-katex";
import {
  SemanticCOLORS,
  SemanticICONS,
} from "semantic-ui-react/dist/commonjs/generic";
import { ExpressionChange } from "../../../interfaces/changesList";

interface Props {
  change: ExpressionChange;
}

const ChangesListItem = ({ change }: Props): JSX.Element => {
  let iconName: SemanticICONS, iconColor: SemanticCOLORS;
  if (change.changeType === "added") {
    iconName = "plus";
    iconColor = "green";
  } else if (change.changeType === "removed") {
    iconName = "minus";
    iconColor = "red";
  } else {
    // changeType === "no change"
    iconName = "circle outline";
    iconColor = "yellow";
  }
  return (
    <List.Item>
      <List.Icon name={iconName} color={iconColor} verticalAlign="middle" />
      <List.Content>
        <List.Header>
          <TeX math={change.latex} />
        </List.Header>
      </List.Content>
    </List.Item>
  );
};

export default ChangesListItem;
