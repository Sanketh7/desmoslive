import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  Snackbar,
  Typography,
} from "@material-ui/core";
import { SaveTwoTone } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { useState } from "react";
import { mutate } from "swr";
import { updateExpressionsRequest } from "../../../api/requesters";
import { ExpressionChange } from "../../../interfaces/expressions";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setExpressionsChanges } from "../../../redux/slices/expressionsSlice";
import ChangesListItem from "./ChangesListItem";

const ChangesList = (): JSX.Element => {
  const activeGraph = useAppSelector((state) => state.activeGraph);
  const authToken = useAppSelector((state) => state.auth.token);
  const changes = useAppSelector((state) => state.expressions.changes);
  const currentExpressions = useAppSelector(
    (state) => state.expressions.current
  );

  const dispatch = useAppDispatch();

  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  // snackbar notifies user if save was successful or not
  const [saveSnackbarOpen, setSaveSnackbarOpen] = useState(false);
  const [saveSnackbarSuccess, setSaveSnackbarSuccess] = useState(false);

  const handleSaveDialogSubmit: React.FormEventHandler<HTMLFormElement> =
    async (event) => {
      event.preventDefault();
      try {
        if (!authToken) throw new Error("No authentication.");
        if (!activeGraph.id) throw new Error("No active graph.");
        const res = await updateExpressionsRequest(
          authToken as string,
          activeGraph.id as string,
          currentExpressions.map((expr) => expr.latex)
        );
        // clear changes
        dispatch(setExpressionsChanges([]));
        // force swr to update
        mutate(`/api/graph/${activeGraph.id}/branch/me/expressions`);

        setSaveSnackbarSuccess(res.status === 200);
        setSaveSnackbarOpen(true);
      } catch (err) {
        console.log(err);
        setSaveSnackbarSuccess(false);
        setSaveSnackbarOpen(true);
      }
    };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: "1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" component="h5" style={{ flex: "auto" }}>
          Changes Made
        </Typography>
        <IconButton
          disabled={changes.length === 0}
          onClick={() => setSaveDialogOpen(true)}
        >
          <SaveTwoTone />
        </IconButton>

        <Dialog
          open={saveDialogOpen}
          onClose={() => setSaveDialogOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Save Changes?</DialogTitle>
          <form onSubmit={handleSaveDialogSubmit}>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Saving changes will permanently alter your graph. Collaborators
                will be able to see these changes.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSaveDialogOpen(false)} color="primary">
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={() => setSaveDialogOpen(false)}
                color="primary"
                autoFocus
              >
                Confirm
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        <Snackbar
          open={saveSnackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSaveSnackbarOpen(false)}
        >
          <Alert
            onClose={() => setSaveSnackbarOpen(false)}
            severity={saveSnackbarSuccess ? "success" : "error"}
          >
            {saveSnackbarSuccess ? "Saved graph!" : "Failed to save graph!"}
          </Alert>
        </Snackbar>
      </div>
      {changes.length !== 0 ? (
        <List
          style={{
            width: "100%",
            maxHeight: "100%",
            overflow: "scroll",
          }}
        >
          {changes
            .filter((change: ExpressionChange | undefined) => change)
            .map((change: ExpressionChange) => {
              return <ChangesListItem key={change.id} change={change} />;
            })}
        </List>
      ) : (
        <Alert severity="info">No changes made.</Alert>
      )}
    </div>
  );
};

export default ChangesList;
