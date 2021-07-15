import { List } from "semantic-ui-react";
import "katex/dist/katex.min.css";
import TeX from "@matejmazur/react-katex";
import {
  SemanticCOLORS,
  SemanticICONS,
} from "semantic-ui-react/dist/commonjs/generic";
import { ChangeType } from "../../../interfaces/changesList";

interface Props {
  text: string;
  changeType: ChangeType;
}

const ChangesListItem = ({ text, changeType }: Props): JSX.Element => {
  let iconName: SemanticICONS, iconColor: SemanticCOLORS;
  if (changeType === "added") {
    iconName = "plus";
    iconColor = "green";
  } else if (changeType === "removed") {
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
          <TeX math={text} />
        </List.Header>
      </List.Content>
    </List.Item>
  );
};

export default ChangesListItem;
