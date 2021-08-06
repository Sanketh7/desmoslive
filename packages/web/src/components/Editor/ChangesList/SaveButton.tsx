import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
} from "@material-ui/core";
import { SaveTwoTone } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { useState } from "react";
import { mutate } from "swr";
import { updateBranchExpressionsRequest } from "../../../api/requesters";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setExpressionsChanges } from "../../../redux/slices/expressionsSlice";

export const SaveButton: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const changes = useAppSelector((state) => state.expressions.changes);
  const currentExpressions = useAppSelector(
    (state) => state.expressions.current
  );
  const authToken = useAppSelector((state) => state.auth.token);
  const activeGraph = useAppSelector((state) => state.activeGraph);
  const activeBranch = useAppSelector((state) => state.activeBranch);

  const dispatch = useAppDispatch();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    try {
      if (!authToken) throw new Error("No authentication.");
      if (!activeGraph.id) throw new Error("No active graph.");
      const res = await updateBranchExpressionsRequest(
        authToken as string,
        activeBranch.id as string,
        currentExpressions.map((expr) => expr.latex)
      );
      // clear changes
      dispatch(setExpressionsChanges([]));
      // force swr to update
      mutate(`/api/branch/${activeBranch.id}/expressions`);

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
      <IconButton
        disabled={changes.length === 0 || !activeBranch.isOwner}
        onClick={() => setDialogOpen(true)}
      >
        <SaveTwoTone />
      </IconButton>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Save Changes?</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Saving changes will permanently alter your graph. Collaborators
              will be able to see these changes.
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
              Save
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
          {success ? "Saved graph!" : "Failed to save graph!"}
        </Alert>
      </Snackbar>
    </>
  );
};
