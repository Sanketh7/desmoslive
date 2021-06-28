import { List } from "semantic-ui-react";

interface Props {
  fileName: string;
}

const FileTreeItem = ({ fileName }: Props): JSX.Element => {
  return (
    <List.Item>
      <List.Icon name="file alternate" />
      <List.Content>
        <List.Header>{fileName}</List.Header>
      </List.Content>
    </List.Item>
  );
};

export default FileTreeItem;
