import { useState } from "react";
import { FaChevronCircleDown, FaChevronCircleRight } from "react-icons/fa";

interface Props {
  folderName: string;
  children: React.ReactNode;
}

const FileTreeFolder: React.FC<Props> = ({ folderName, children }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <button
        className="flex items-center gap-x-4 hover:text-green-700 hover:bg-green-100 w-full rounded-lg p-1 pl-4 hover:shadow"
        onClick={() => setOpen(!open)}
      >
        {open ? <FaChevronCircleDown /> : <FaChevronCircleRight />}
        <div className="text-lg">{folderName}</div>
      </button>
      <div className="pl-8">{open && children}</div>
    </div>
  );
};

export default FileTreeFolder;
