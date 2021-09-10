import FileTreeFolder from "./FileTreeFolder";
import FileTreeItem from "./FileTreeItem";
import { useMyGraphsSWR, useSharedGraphsSWR } from "../../../api/swrRequests";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import CreateButton from "./CreateButton";
import RefreshButton from "./RefreshButton";

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
    <div className="w-full h-full p-4">
      <div className="flex items-center justify-around">
        <div className="text-2xl font-bold">Graphs</div>
        <div className="text-xl">
          <CreateButton />
          <RefreshButton />
        </div>
      </div>
      <div>
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
      </div>
    </div>
  );
};

export default FileTree;
