import { TreeView } from "@material-ui/lab";
import { ArrowDropDown, ArrowRight } from "@material-ui/icons";
import FileTreeFolder from "./FileTreeFolder";
import FileTreeItem from "./FileTreeItem";
import { useMyGraphsSWR, useSharedGraphsSWR } from "../../../api/fetchers";
import { useAuthContext } from "../../../contexts/AuthContext";
import { FileTreeHeader } from "./FileTreeHeader";
import { Paper } from "@material-ui/core";

const FileTree = (): JSX.Element => {
  const { authToken } = useAuthContext();

  const {
    myGraphs,
    // isError: myGraphsIsError,
    // isLoading: myGraphsIsLoading,
  } = useMyGraphsSWR(authToken);

  const { sharedGraphs } = useSharedGraphsSWR(authToken);

  return (
    <Paper style={{ width: "100%", height: "100%", padding: "1rem" }}>
      <FileTreeHeader />
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
    </Paper>
  );
};

export default FileTree;