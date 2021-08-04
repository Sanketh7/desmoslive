import _ from "lodash";
import {
  DialogTitle,
  Dialog,
  IconButton,
  Tooltip,
  Typography,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Snackbar,
} from "@material-ui/core";
import { AddTwoTone, RefreshTwoTone } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { useState } from "react";
import { createGraphRequest } from "../../../api/requesters";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

interface Props {
  mutateGraphData: () => void;
}

export const FileTreeHeader: React.FC<Props> = ({ mutateGraphData }: Props) => {
  const [newDialogOpen, setNewDialogOpen] = useState(false);
  const [newGraphName, setNewGraphName] = useState("");
  // snackbar shows up after creating new graph to alert the user if it was successful
  const [newSnackbarOpen, setNewSnackbarOpen] = useState(false);
  // if true, show success snackbar. if false, show error snackbar
  const [newSnackbarSuccess, setNewSnackbarSuccess] = useState(false);

  const authToken = useSelector((state: RootState) => state.auth.token);

  const handleNewSnackbarClose = () => setNewSnackbarOpen(false);

  const handleNewDialogOpen = () => {
    setNewDialogOpen(true);
    setNewGraphName("");
  };
  const handleNewDialogClose = () => setNewDialogOpen(false);
  const handleNewDialogSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      if (!authToken) throw new Error("Not authenticated.");
      const res = await createGraphRequest(authToken, newGraphName);
      setNewSnackbarOpen(true);
      setNewSnackbarSuccess(res.status === 200);
      // refresh graph data to immediately show new graph
      mutateGraphData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleNewGraphNameChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => setNewGraphName(event.target.value);

  return (
    <div
      style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}
    >
      <Typography variant="h5" component="h5" style={{ flex: "auto" }}>
        Graphs
      </Typography>
      <Tooltip title="Refresh" aria-label="refresh">
        <IconButton onClick={_.throttle(mutateGraphData, 1000)}>
          <RefreshTwoTone />
        </IconButton>
      </Tooltip>
      <Tooltip title="Create" aria-label="create">
        <IconButton onClick={handleNewDialogOpen}>
          <AddTwoTone />
        </IconButton>
      </Tooltip>

      <Dialog
        open={newDialogOpen}
        onClose={handleNewDialogClose}
        aria-labelledby="new-dialog-title"
      >
        <DialogTitle id="new-dialog-title">New Graph</DialogTitle>
        <form onSubmit={handleNewDialogSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="graphName"
              label="Graph Name"
              variant="outlined"
              value={newGraphName}
              onChange={handleNewGraphNameChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleNewDialogClose} color="primary">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!newGraphName}
              onClick={handleNewDialogClose}
              color="primary"
            >
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={newSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleNewSnackbarClose}
      >
        <Alert
          onClose={handleNewSnackbarClose}
          severity={newSnackbarSuccess ? "success" : "error"}
        >
          {newSnackbarSuccess ? "Created graph!" : "Failed to create graph!"}
        </Alert>
      </Snackbar>
    </div>
  );
};
