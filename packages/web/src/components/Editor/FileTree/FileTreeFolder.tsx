import { useState } from "react";
import { List } from "semantic-ui-react";

interface Props {
  folderName: string;
  children: React.ReactNode;
}

const FileTreeFolder: React.FC<Props> = ({ folderName, children }: Props) => {
  const [isCollapsed, setCollapsed] = useState(true);

  const handleClick = () => setCollapsed(!isCollapsed);

  return (
    <List.Item>
      <List.Icon
        onClick={handleClick}
        name={isCollapsed ? "chevron circle right" : "chevron circle down"}
      />
      <List.Content>
        <List.Header onClick={handleClick}>{folderName}</List.Header>
        {!isCollapsed && <List.List>{children}</List.List>}
      </List.Content>
    </List.Item>
  );
};

export default FileTreeFolder;
