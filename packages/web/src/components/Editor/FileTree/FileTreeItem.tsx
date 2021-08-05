import { TreeItem } from "@material-ui/lab";
import { useAppDispatch } from "../../../redux/hooks";
import { setActiveGraph } from "../../../redux/slices/activeGraphSlice";

interface Props {
  graphName: string;
  graphID: string;
}

const FileTreeItem = ({ graphName, graphID }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  return (
    <TreeItem
      nodeId={graphID}
      label={graphName}
      //onClick={() => setActiveGraph({ name: graphName, id: graphID })}
      onClick={() => dispatch(setActiveGraph({ name: graphName, id: graphID }))}
    />
  );
};

export default FileTreeItem;
