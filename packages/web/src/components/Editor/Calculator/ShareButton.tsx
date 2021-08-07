import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { ShareTwoTone } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import * as EmailValidator from "email-validator";
import { useAppSelector } from "../../../redux/hooks";
import { shareGraphRequest } from "../../../api/requests";

export const ShareButton: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [emailEntry, setEmailEntry] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const authToken = useAppSelector((state) => state.auth.token);
  const activeGraph = useAppSelector((state) => state.activeGraph);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    try {
      if (!authToken) throw new Error("Needs authentication.");
      if (!activeGraph.id) throw new Error("No active graph.");
      const res = await shareGraphRequest(
        authToken,
        activeGraph.id,
        emailEntry
      );
      setSuccess(res.status === 200);
      setSnackbarOpen(true);
    } catch (err) {
      console.log(err);
      setSuccess(false);
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <Tooltip title="Share" aria-label="share">
        <IconButton aria-label="share" onClick={() => setDialogOpen(true)}>
          <ShareTwoTone />
        </IconButton>
      </Tooltip>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="share-dialog-title"
      >
        <DialogTitle id="share-dialog-title">Share Graph</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="shareEmail"
              label="Email"
              variant="outlined"
              error={!emailEntry || !EmailValidator.validate(emailEntry)}
              value={emailEntry}
              onChange={(event) => setEmailEntry(event.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!emailEntry || !EmailValidator.validate(emailEntry)}
              onClick={() => setDialogOpen(false)}
              color="primary"
            >
              Share
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={success ? "success" : "error"}
        >
          {success ? "Shared graph!" : "Failed to share graph!"}
        </Alert>
      </Snackbar>
    </>
  );
};
