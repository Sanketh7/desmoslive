import { TreeView } from "@material-ui/lab";
import { ArrowDropDown, ArrowRight } from "@material-ui/icons";
import FileTreeFolder from "./FileTreeFolder";
import FileTreeItem from "./FileTreeItem";
import { useMyGraphsSWR, useSharedGraphsSWR } from "../../../api/fetchers";
import { useAuthContext } from "../../../contexts/AuthContext";

const FileTree = (): JSX.Element => {
  const { authToken } = useAuthContext();

  const {
    myGraphs,
    // isError: myGraphsIsError,
    // isLoading: myGraphsIsLoading,
  } = useMyGraphsSWR(authToken);

  const { sharedGraphs } = useSharedGraphsSWR(authToken);

  return (
    <div style={{ width: "100%", height: "100%", padding: "1rem" }}>
      <TreeView
        defaultCollapseIcon={<ArrowDropDown />}
        defaultExpandIcon={<ArrowRight />}
      >
        <FileTreeFolder folderName="My Graphs">
          {myGraphs &&
            myGraphs.map((graph) => (
              <FileTreeItem
                graphName={graph.name}
                graphID={graph.id}
                key={graph.id}
              />
            ))}
        </FileTreeFolder>
        <FileTreeFolder folderName="Shared With Me">
          {sharedGraphs &&
            sharedGraphs.map((graph) => (
              <FileTreeItem
                graphName={graph.name}
                graphID={graph.id}
                key={graph.id}
              />
            ))}
        </FileTreeFolder>
      </TreeView>
    </div>
  );
};

export default FileTree;

/*

      <List size="huge" style={{ width: "100%", height: "100%" }}>
      </List>
*/
