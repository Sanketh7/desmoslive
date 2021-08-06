import { Paper, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useAppSelector } from "../../../redux/hooks";
import { ShareButton } from "./ShareButton";
import { RenameButton } from "./RenameButton";
import { DeleteButton } from "./DeleteButton";

const CalculatorHeader = (): JSX.Element => {
  const activeGraph = useAppSelector((state) => state.activeGraph);
  const changes = useAppSelector((state) => state.expressions.changes);

  return activeGraph.id ? (
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

        {activeGraph.isOwner && (
          <>
            <RenameButton />
            <ShareButton />
            <DeleteButton />
          </>
        )}
      </span>
      <Alert
        severity={changes.length > 0 ? "warning" : "success"}
        style={{ float: "right" }}
      >
        {changes.length > 0 ? "Unsaved changes!" : "No unsaved changes."}
      </Alert>
    </div>
  ) : (
    <Alert severity="info">Select a graph on the left to edit.</Alert>
  );
};

export default CalculatorHeader;
