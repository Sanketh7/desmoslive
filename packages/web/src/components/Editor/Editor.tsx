import { Grid } from "semantic-ui-react";
import FileTree from "./FileTree/FileTree";
import ChangesList from "./ChangesList/ChangesList";
import Calculator from "./Calculator/Calculator";
import { ChangesProvider } from "../../contexts/ChangesContext";
import { ActiveGraphProvider } from "../../contexts/ActiveGraphContext";

const Editor: React.FC = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Grid
        columns="equal"
        style={{ width: "100%", height: "100%", margin: 0 }}
      >
        <ActiveGraphProvider>
          <Grid.Column>
            <FileTree />
          </Grid.Column>
          <ChangesProvider>
            <Grid.Column width={8}>
              <Calculator />
            </Grid.Column>
            <Grid.Column>
              <ChangesList />
            </Grid.Column>
          </ChangesProvider>
        </ActiveGraphProvider>
      </Grid>
    </div>
  );
};

export default Editor;
