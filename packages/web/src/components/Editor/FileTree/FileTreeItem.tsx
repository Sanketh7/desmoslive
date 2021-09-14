import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setActiveGraph } from "../../../redux/slices/activeGraphSlice";
import { FaFile } from "react-icons/fa";
import { setActiveBranch } from "../../../redux/slices/activeBranchSlice";
import { getMyBranchIDRequest } from "../../../api/requests";

interface Props {
  graphName: string;
  graphID: string;
  isOwner: boolean;
}

const FileTreeItem = ({ graphName, graphID, isOwner }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  return (
    <button
      className="w-full flex items-center gap-x-4 hover:text-green-700 hover:bg-green-100 rounded-lg p-1 pl-4 hover:shadow"
      onClick={async () => {
        if (!auth.token || !auth.email) return;
        const myBranchID = await getMyBranchIDRequest(auth.token, graphID);
        if (myBranchID.status !== 200) return;
        dispatch(
          setActiveGraph({ name: graphName, id: graphID, isOwner: isOwner })
        );
        dispatch(
          setActiveBranch({
            id: myBranchID.data.id,
            owner: { email: auth.email },
          })
        );
      }}
    >
      <FaFile />
      <div className="text-lg">{graphName}</div>
    </button>
  );
};

export default FileTreeItem;

/*

    <TreeItem
      nodeId={graphID}
      label={graphName}
      //onClick={() => setActiveGraph({ name: graphName, id: graphID })}
      onClick={() => {
        dispatch(
          setActiveGraph({ name: graphName, id: graphID, isOwner: isOwner })
        );
      }}
    />
    */
