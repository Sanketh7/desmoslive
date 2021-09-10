import FileTree from "./FileTree/FileTree";
import ChangesList from "./ChangesList/ChangesList";
import Calculator from "./Calculator/Calculator";
import { EditorAppBar } from "./EditorAppBar";

const Editor: React.FC = () => {
  return (
    <div className="h-screen flex flex-col content-start flex-wrap">
      <div className="w-screen h-auto">
        <EditorAppBar />
      </div>
      <div className="border-2 flex-grow grid grid-cols-5">
        <div className="border-2 col-span-1">
          <FileTree />
        </div>
        <div className="border-2 col-span-3">
          <Calculator />
        </div>
        <div className="border-2 col-span-1">
          <ChangesList />
        </div>
      </div>
    </div>
  );
};

export default Editor;

/*
<div
      style={{
        width: "100vw",
        height: "100vh",
        maxHeight: "100vh",
        display: "flex",
        flexFlow: "column",
      }}
    >
      <EditorAppBar />
      <Grid
        container
        spacing={3}
        style={{ width: "100%", maxHeight: "100%", flex: "auto", margin: 0 }}
      >
        <Grid item xs>
          <FileTree />
        </Grid>
        <Grid item xs={6}>
          <Calculator />
        </Grid>
        <Grid item xs style={{ maxHeight: "100%" }}>
          <ChangesList />
        </Grid>
      </Grid>
    </div>
*/
