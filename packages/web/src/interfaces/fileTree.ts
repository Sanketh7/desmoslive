export interface FileTreeData {
  folders: FolderData[];
}

export interface FolderData {
  name: string;
  files: FileData[];
}

export interface FileData {
  name: string;
}
