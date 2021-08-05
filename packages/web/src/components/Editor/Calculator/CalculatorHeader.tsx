import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { EditTwoTone, ShareTwoTone } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { useState } from "react";
import * as EmailValidator from "email-validator";
import { shareGraphRequest } from "../../../api/requesters";
import { useAppSelector } from "../../../redux/hooks";

const CalculatorHeader = (): JSX.Element => {
  const authToken = useAppSelector((state) => state.auth.token);
  const activeGraph = useAppSelector((state) => state.activeGraph);
  const changes = useAppSelector((state) => state.expressions.changes);

  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareEmail, setShareEmail] = useState("");
  // snackbar used to show success/failure of sharing graph
  const [shareSnackbarOpen, setShareSnackbarOpen] = useState(false);
  const [shareSnackbarSuccess, setShareSnackbarSuccess] = useState(false);

  // callback for handling the share dialog
  const handleShareDialogSubmit: React.FormEventHandler<HTMLFormElement> =
    async (event) => {
      event.preventDefault();
      try {
        if (!authToken) throw new Error("Needs authentication.");
        if (!activeGraph.id) throw new Error("No active graph.");
        const res = await shareGraphRequest(
          authToken,
          activeGraph.id,
          shareEmail
        );
        setShareSnackbarSuccess(res.status === 200);
        setShareSnackbarOpen(true);
      } catch (err) {
        console.log(err);
        setShareSnackbarSuccess(false);
        setShareSnackbarOpen(true);
      }
    };

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
        <Tooltip title="Rename" aria-label="rename">
          <IconButton aria-label="edit">
            <EditTwoTone />
          </IconButton>
        </Tooltip>

        <Tooltip title="Share" aria-label="share">
          <IconButton
            aria-label="share"
            onClick={() => setShareDialogOpen(true)}
          >
            <ShareTwoTone />
          </IconButton>
        </Tooltip>
        <Dialog
          open={shareDialogOpen}
          onClose={() => setShareDialogOpen(false)}
          aria-labelledby="share-dialog-title"
        >
          <DialogTitle id="share-dialog-title">Share Graph</DialogTitle>
          <form onSubmit={handleShareDialogSubmit}>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="shareEmail"
                label="Email"
                variant="outlined"
                error={!shareEmail || !EmailValidator.validate(shareEmail)}
                value={shareEmail}
                onChange={(event) => setShareEmail(event.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShareDialogOpen(false)} color="primary">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!shareEmail || !EmailValidator.validate(shareEmail)}
                onClick={() => setShareDialogOpen(false)}
                color="primary"
              >
                Share
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        <Snackbar
          open={shareSnackbarOpen}
          autoHideDuration={6000}
          onClose={() => setShareSnackbarOpen(false)}
        >
          <Alert
            onClose={() => setShareSnackbarOpen(false)}
            severity={shareSnackbarSuccess ? "success" : "error"}
          >
            {shareSnackbarSuccess ? "Shared graph!" : "Failed to share graph!"}
          </Alert>
        </Snackbar>
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
