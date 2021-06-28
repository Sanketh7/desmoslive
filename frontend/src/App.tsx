import { Grid } from "semantic-ui-react";
import Calculator from "./components/Calculator/Calculator";
import ChangesList from "./components/ChangesList/ChangesList";
import FileTree from "./components/FileTree/FileTree";

const App = (): JSX.Element => {
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

export default App;
