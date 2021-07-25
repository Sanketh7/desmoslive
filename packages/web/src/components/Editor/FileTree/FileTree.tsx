import { List } from "semantic-ui-react";
import FileTreeFolder from "./FileTreeFolder";
import FileTreeItem from "./FileTreeItem";
import { useMyGraphsSWR } from "../../../fetchers";
import { useAuthContext } from "../../../contexts/AuthContext";

const FileTree = (): JSX.Element => {
  const { authToken } = useAuthContext();

  const {
    myGraphs,
    // isError: myGraphsIsError,
    // isLoading: myGraphsIsLoading,
  } = useMyGraphsSWR(authToken);

  return (
    <div style={{ width: "100%", height: "100%", padding: "1rem" }}>
      <List size="huge" style={{ width: "100%", height: "100%" }}>
        <FileTreeFolder folderName="My Graphs">
          {myGraphs &&
            myGraphs.map((graph) => (
              <FileTreeItem fileName={graph} key={graph} />
            ))}
        </FileTreeFolder>
      </List>
    </div>
  );
};

export default FileTree;
