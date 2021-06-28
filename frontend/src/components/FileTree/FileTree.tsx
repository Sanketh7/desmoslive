import { List } from "semantic-ui-react";
import FileTreeFolder from "./FileTreeFolder";
import { FileTreeData } from "../../interfaces/fileTree";
import FileTreeItem from "./FileTreeItem";

const FileTree = (): JSX.Element => {
  const data: FileTreeData = {
    folders: [
      {
        name: "My Graphs",
        files: [
          {
            name: "graph1",
          },
        ],
      },
    ],
  };
  return (
    <div style={{ width: "100%", height: "100%", padding: "1rem" }}>
      <List size="huge" style={{ width: "100%", height: "100%" }}>
        {data.folders.map((folder) => {
          return (
            <FileTreeFolder folderName={folder.name} key={folder.name}>
              {folder.files.map((file) => {
                return <FileTreeItem fileName={file.name} key={file.name} />;
              })}
            </FileTreeFolder>
          );
        })}
      </List>
    </div>
  );
};

export default FileTree;
