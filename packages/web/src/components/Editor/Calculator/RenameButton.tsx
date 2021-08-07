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
import { EditTwoTone } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { useState } from "react";
import { mutate } from "swr";
import { renameGraphRequest } from "../../../api/requests";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setActiveGraph } from "../../../redux/slices/activeGraphSlice";

export const RenameButton: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [nameEntry, setNameEntry] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const authToken = useAppSelector((state) => state.auth.token);
  const activeGraph = useAppSelector((state) => state.activeGraph);

  const dispatch = useAppDispatch();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    try {
      if (!authToken) throw new Error("Needs authentication.");
      if (!activeGraph.id) throw new Error("No active graph.");
      const res = await renameGraphRequest(
        authToken,
        activeGraph.id,
        nameEntry
      );

      setSuccess(res.status === 200);
      setSnackbarOpen(true);

      // refresh active file
      dispatch(
        setActiveGraph({
          name: nameEntry,
          id: activeGraph.id,
          isOwner: activeGraph.isOwner,
        })
      );

      // update my graphs in the file tree
      await mutate("/api/user/me/myGraphs");
    } catch (err) {
      console.log(err);
      setSuccess(false);
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <Tooltip title="Rename" aria-label="rename">
        <IconButton onClick={() => setDialogOpen(true)} aria-label="edit">
          <EditTwoTone />
        </IconButton>
      </Tooltip>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="rename-dialog-title"
      >
        <DialogTitle id="rename-dialog-title">Rename Graph</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="nameEntry"
              label="Graph Name"
              variant="outlined"
              value={nameEntry}
              onChange={(event) => setNameEntry(event.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!nameEntry}
              onClick={() => setDialogOpen(false)}
              color="primary"
            >
              Rename
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
          {success ? "Renamed graph!" : "Failed to rename graph!"}
        </Alert>
      </Snackbar>
    </>
  );
};
