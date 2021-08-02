import { TreeItem } from "@material-ui/lab";

interface Props {
  folderName: string;
  children: React.ReactNode;
}

const FileTreeFolder: React.FC<Props> = ({ folderName, children }: Props) => {
  return (
    <TreeItem nodeId={folderName} label={folderName}>
      {children}
    </TreeItem>
  );
};

export default FileTreeFolder;
