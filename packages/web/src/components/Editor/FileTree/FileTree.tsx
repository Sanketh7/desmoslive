import { TreeView } from "@material-ui/lab";
import { ArrowDropDown, ArrowRight } from "@material-ui/icons";
import FileTreeFolder from "./FileTreeFolder";
import FileTreeItem from "./FileTreeItem";
import { useMyGraphsSWR, useSharedGraphsSWR } from "../../../api/swrRequests";
import { FileTreeHeader } from "./FileTreeHeader";
import { Paper } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const FileTree = (): JSX.Element => {
  const authToken = useSelector((state: RootState) => state.auth.token);

  const {
    myGraphs,
    mutate: mutateMyGraphs,
    // isError: myGraphsIsError,
    // isLoading: myGraphsIsLoading,
  } = useMyGraphsSWR(authToken);

  const { sharedGraphs, mutate: mutateSharedGraphs } =
    useSharedGraphsSWR(authToken);

  // forces a refresh on all graph data
  const mutateGraphData = async () => {
    await mutateMyGraphs();
    await mutateSharedGraphs();
  };

  return (
    <Paper style={{ width: "100%", height: "100%", padding: "1rem" }}>
      <FileTreeHeader mutateGraphData={mutateGraphData} />
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
                isOwner={true}
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
                isOwner={false}
              />
            ))}
        </FileTreeFolder>
      </TreeView>
    </Paper>
  );
};

export default FileTree;
