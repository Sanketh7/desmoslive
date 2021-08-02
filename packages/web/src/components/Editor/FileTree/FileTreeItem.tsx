import { useActiveGraphContext } from "../../../contexts/ActiveGraphContext";
import { TreeItem } from "@material-ui/lab";

interface Props {
  graphName: string;
  graphID: string;
}

const FileTreeItem = ({ graphName, graphID }: Props): JSX.Element => {
  const { setActiveGraph } = useActiveGraphContext();
  return (
    <TreeItem
      nodeId={graphID}
      label={graphName}
      onClick={() => setActiveGraph(graphName)}
    />
  );
};

export default FileTreeItem;
