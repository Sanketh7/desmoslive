import { Grid } from "semantic-ui-react";
import FileTree from "./FileTree/FileTree";
import ChangesList from "./ChangesList/ChangesList";
import Calculator from "./Calculator/Calculator";

const Editor = (): JSX.Element => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Grid
        columns="equal"
        style={{ width: "100%", height: "100%", margin: 0 }}
      >
        <Grid.Column>
          <FileTree />
        </Grid.Column>
        <Grid.Column width={8}>
          <Calculator />
        </Grid.Column>
        <Grid.Column>
          <ChangesList />
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Editor;
