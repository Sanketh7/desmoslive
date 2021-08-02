import { IconButton, Paper, Tooltip, Typography } from "@material-ui/core";
import { EditTwoTone, ShareTwoTone } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { useActiveGraphContext } from "../../../contexts/ActiveGraphContext";
import { useChangesContext } from "../../../contexts/ChangesContext";

const CalculatorHeader = (): JSX.Element => {
  const { activeGraph } = useActiveGraphContext();
  const { changesList } = useChangesContext();

  return activeGraph ? (
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
            {activeGraph.name}
          </Typography>
        </Paper>
        <Tooltip title="Rename" aria-label="rename">
          <IconButton aria-label="edit">
            <EditTwoTone />
          </IconButton>
        </Tooltip>
        <Tooltip title="Share" aria-label="share">
          <IconButton aria-label="share">
            <ShareTwoTone />
          </IconButton>
        </Tooltip>
      </span>
      <Alert severity={changesList.length > 0 ? "warning" : "success"} style={{ float: "right" }}>
        {changesList.length > 0 ? "Unsaved changes!" : "No unsaved changes."}
      </Alert>
    </div >
  ) : (
    <Alert severity="info">Select a graph on the left to edit.</Alert>
  );
};

export default CalculatorHeader;
