import { useAppDispatch } from "../../../redux/hooks";
import { setActiveGraph } from "../../../redux/slices/activeGraphSlice";
import { FaFile } from "react-icons/fa";

interface Props {
  graphName: string;
  graphID: string;
  isOwner: boolean;
}

const FileTreeItem = ({ graphName, graphID, isOwner }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  return (
    <button
      className="w-full flex items-center gap-x-4 hover:text-green-700 hover:bg-green-100 rounded-lg p-1 pl-4 hover:shadow"
      onClick={() => {
        dispatch(
          setActiveGraph({ name: graphName, id: graphID, isOwner: isOwner })
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
