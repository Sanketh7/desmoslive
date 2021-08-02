import { Grid } from "@material-ui/core";
import FileTree from "./FileTree/FileTree";
import ChangesList from "./ChangesList/ChangesList";
import Calculator from "./Calculator/Calculator";
import { ChangesProvider } from "../../contexts/ChangesContext";
import { ActiveGraphProvider } from "../../contexts/ActiveGraphContext";

const Editor: React.FC = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Grid
        container
        spacing={3}
        style={{ width: "100%", height: "100%", margin: 0 }}
      >
        <ActiveGraphProvider>
          <Grid item xs>
            <FileTree />
          </Grid>
          <ChangesProvider>
            <Grid item xs={6}>
              <Calculator />
            </Grid>
            <Grid item xs>
              <ChangesList />
            </Grid>
          </ChangesProvider>
        </ActiveGraphProvider>
      </Grid>
    </div>
  );
};

export default Editor;
