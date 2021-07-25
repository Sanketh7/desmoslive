import { List } from "semantic-ui-react";
import { useActiveGraphContext } from "../../../contexts/ActiveGraphContext";

interface Props {
  graphName: string;
}

const FileTreeItem = ({ graphName }: Props): JSX.Element => {
  const { setActiveGraph } = useActiveGraphContext();
  return (
    <List.Item onClick={() => setActiveGraph(graphName)}>
      <List.Icon name="file alternate" />
      <List.Content>
        <List.Header>{graphName}</List.Header>
      </List.Content>
    </List.Item>
  );
};

export default FileTreeItem;
