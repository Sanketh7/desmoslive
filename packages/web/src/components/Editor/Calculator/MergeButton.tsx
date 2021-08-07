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
import { MergeTypeTwoTone } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { useState } from "react";
import { getMergeBranchRequest } from "../../../api/requests";
import { useMyBranchIDSWR } from "../../../api/swrRequests";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setActiveBranch } from "../../../redux/slices/activeBranchSlice";

export const MergeButton: React.FC = () => {
  const authToken = useAppSelector((state) => state.auth.token);
  const activeBranch = useAppSelector((state) => state.activeBranch);
  const activeGraph = useAppSelector((state) => state.activeGraph);

  const dispatch = useAppDispatch();

  const { id: myBranchID } = useMyBranchIDSWR(authToken, activeGraph.id);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    try {
      if (!authToken) throw new Error("Needs authentication");
      if (!activeBranch.id) throw new Error("No branch selected.");
      if (!myBranchID) throw new Error("No branch to merge into.");
      const res = await getMergeBranchRequest(
        authToken,
        activeBranch.id,
        myBranchID
      );

      setSuccess(res.status === 200);
      setSnackbarOpen(true);

      dispatch(setActiveBranch({ id: myBranchID, isOwner: true }));
    } catch (err) {
      console.log(err);
      setSuccess(false);
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <Tooltip title="Merge" aria-label="merge">
        <IconButton
          onClick={() => setDialogOpen(true)}
          disabled={activeBranch.isOwner}
        >
          <MergeTypeTwoTone />
        </IconButton>
      </Tooltip>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="merge-dialog-title"
        aria-describedby="merge-dialog-description"
      >
        <DialogTitle id="merge-dialog-title">Merge Branch?</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText id="delete-dialog-description">
              This will merge the current branch into <strong>YOUR</strong>{" "}
              branch.
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
              Merge
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
          {success ? "Merged branch!" : "Failed to merge graph!"}
        </Alert>
      </Snackbar>
    </>
  );
};
