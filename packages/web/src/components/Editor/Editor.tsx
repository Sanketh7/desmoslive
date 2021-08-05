import { Grid } from "@material-ui/core";
import FileTree from "./FileTree/FileTree";
import ChangesList from "./ChangesList/ChangesList";
import Calculator from "./Calculator/Calculator";
import { EditorAppBar } from "./EditorAppBar";

const Editor: React.FC = () => {
  return (
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
  );
};

export default Editor;
