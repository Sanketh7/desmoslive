import FileTree from "./FileTree/FileTree";
import ChangesList from "./ChangesList/ChangesList";
import Calculator from "./Calculator/Calculator";
import { EditorAppBar } from "./EditorAppBar";
import { useAppSelector } from "../../redux/hooks";

const Editor: React.FC = () => {
  const activeGraph = useAppSelector((state) => state.activeGraph);
  return (
    <div className="h-screen flex flex-col content-start flex-wrap">
      <div className="w-screen h-auto">
        <EditorAppBar />
      </div>
      <div className="border-2 flex-grow grid grid-cols-5">
        <div className="border-2 col-span-1">
          <FileTree />
        </div>
        {activeGraph.id ? (
          <>
            <div className="border-2 col-span-3">
              <Calculator />
            </div>
            <div className="border-2 col-span-1">
              <ChangesList />
            </div>
          </>
        ) : (
          <div className="bg-gradient-to-br from-green-400 to-blue-400 col-span-4 flex items-center justify-center">
            <div className="text-5xl text-green-800 bg-gray-300 bg-opacity-50 p-4 rounded-xl">
              Select a graph to view the editor!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Editor;
