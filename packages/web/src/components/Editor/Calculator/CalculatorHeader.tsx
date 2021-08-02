import { IconButton, Paper, Typography } from "@material-ui/core";
import { EditTwoTone, ShareTwoTone } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { useActiveGraphContext } from "../../../contexts/ActiveGraphContext";

const CalculatorHeader = (): JSX.Element => {
  const { activeGraph } = useActiveGraphContext();

  const unsavedChanges = false; // TODO
  return (
    <div>
      <span
        style={{ float: "left", display: "inline-flex", alignItems: "center" }}
      >
        <Paper
          variant="outlined"
          elevation={3}
          style={{ display: "inline-block" }}
        >
          <Typography
            variant="h5"
            style={{ padding: "0.25em 0.5em 0.25em 0.5em" }}
          >
            {activeGraph}
          </Typography>
        </Paper>
        <IconButton aria-label="edit">
          <EditTwoTone />
        </IconButton>
        <IconButton aria-label="share">
          <ShareTwoTone />
        </IconButton>
      </span>
      <Alert severity="success" style={{ float: "right" }}>
        No unsaved changes.
      </Alert>
    </div>
  );
};

export default CalculatorHeader;
