import { TreeItem } from "@material-ui/lab";
import { useDispatch } from "react-redux";
import { setActiveGraph } from "../../../redux/slices/activeGraphSlice";

interface Props {
  graphName: string;
  graphID: string;
}

const FileTreeItem = ({ graphName, graphID }: Props): JSX.Element => {
  const dispatch = useDispatch();
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
