import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { DeleteTwoTone, EditTwoTone, ShareTwoTone } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { useState } from "react";
import * as EmailValidator from "email-validator";
import { deleteGraphRequest, shareGraphRequest } from "../../../api/requesters";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  resetActiveGraph,
  setActiveGraph,
} from "../../../redux/slices/activeGraphSlice";
import { mutate } from "swr";

const CalculatorHeader = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const authToken = useAppSelector((state) => state.auth.token);
  const activeGraph = useAppSelector((state) => state.activeGraph);
  const changes = useAppSelector((state) => state.expressions.changes);

  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareEmail, setShareEmail] = useState("");
  // snackbar used to show success/failure of sharing graph
  const [shareSnackbarOpen, setShareSnackbarOpen] = useState(false);
  const [shareSnackbarSuccess, setShareSnackbarSuccess] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteSnackbarOpen, setDeleteSnackbarOpen] = useState(false);
  const [deleteSnackbarSuccess, setDeleteSnackbarSuccess] = useState(false);

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

  const handleDeleteDialogSubmit: React.FormEventHandler<HTMLFormElement> =
    async (event) => {
      event.preventDefault();
      try {
        if (!authToken) throw new Error("Needs authentication.");
        if (!activeGraph.id) throw new Error("No active graph.");
        const res = await deleteGraphRequest(authToken, activeGraph.id);

        setDeleteSnackbarSuccess(res.status === 200);
        setDeleteSnackbarOpen(true);
        // nullify active graph
        dispatch(resetActiveGraph());

        // update my graphs in the file tree
        await mutate("/api/user/me/myGraphs");
      } catch (err) {
        console.log(err);
        setDeleteSnackbarSuccess(false);
        setDeleteSnackbarOpen(true);
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

        {activeGraph.isOwner && (
          <>
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
                  <Button
                    onClick={() => setShareDialogOpen(false)}
                    color="primary"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={
                      !shareEmail || !EmailValidator.validate(shareEmail)
                    }
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
                {shareSnackbarSuccess
                  ? "Shared graph!"
                  : "Failed to share graph!"}
              </Alert>
            </Snackbar>
          </>
        )}

        {activeGraph.isOwner && (
          <>
            <Tooltip title="Delete" aria-label="delete">
              <IconButton onClick={() => setDeleteDialogOpen(true)}>
                <DeleteTwoTone />
              </IconButton>
            </Tooltip>
            <Dialog
              open={deleteDialogOpen}
              onClose={() => setDeleteDialogOpen(false)}
              aria-labelledby="delete-dialog-title"
              aria-describedby="delete-dialog-description"
            >
              <DialogTitle id="delete-dialog-title">Delete Graph?</DialogTitle>
              <form onSubmit={handleDeleteDialogSubmit}>
                <DialogContent>
                  <DialogContentText id="delete-dialog-description">
                    Deleting the graph is a <strong>PERMANENT</strong> action.
                    Collaborators will no longer be able to access the graph as
                    well.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => setDeleteDialogOpen(false)}
                    color="primary"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    onClick={() => setDeleteDialogOpen(false)}
                    color="primary"
                    autoFocus
                  >
                    Delete
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
            <Snackbar
              open={deleteSnackbarOpen}
              autoHideDuration={6000}
              onClose={() => setDeleteSnackbarOpen(false)}
            >
              <Alert
                onClose={() => setDeleteSnackbarOpen(false)}
                severity={deleteSnackbarSuccess ? "success" : "error"}
              >
                {deleteSnackbarSuccess
                  ? "Deleted graph!"
                  : "Failed to delete graph!"}
              </Alert>
            </Snackbar>
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
