import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
  Tooltip,
} from "@material-ui/core";
import { DeleteTwoTone } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { useState } from "react";
import { mutate } from "swr";
import { deleteGraphRequest } from "../../../api/requesters";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { resetActiveGraph } from "../../../redux/slices/activeGraphSlice";

export const DeleteButton: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
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
      const res = await deleteGraphRequest(authToken, activeGraph.id);

      setSuccess(res.status === 200);
      setSnackbarOpen(true);
      // nullify active graph
      dispatch(resetActiveGraph());

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
      <Tooltip title="Delete" aria-label="delete">
        <IconButton onClick={() => setDialogOpen(true)}>
          <DeleteTwoTone />
        </IconButton>
      </Tooltip>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Delete Graph?</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText id="delete-dialog-description">
              Deleting the graph is a <strong>PERMANENT</strong> action.
              Collaborators will no longer be able to access the graph as well.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={() => setDialogOpen(false)}
              color="primary"
              autoFocus
            >
              Delete
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
          {success ? "Deleted graph!" : "Failed to delete graph!"}
        </Alert>
      </Snackbar>
    </>
  );
};
