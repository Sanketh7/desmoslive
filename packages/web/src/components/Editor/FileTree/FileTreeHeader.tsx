import { DialogTitle, Dialog, IconButton, Tooltip, Typography, DialogContent, DialogContentText, TextField, DialogActions, Button } from "@material-ui/core"
import { AddTwoTone } from "@material-ui/icons"
import { useState } from "react"
import { createGraphRequest } from "../../../api/requesters";
import { useAuthContext } from "../../../contexts/AuthContext";

export const FileTreeHeader: React.FC = () => {
  const [newDialogOpen, setNewDialogOpen] = useState(false);
  const [newGraphName, setNewGraphName] = useState("");
  const { authToken } = useAuthContext();

  const handleNewDialogOpen = () => {
    setNewDialogOpen(true);
    setNewGraphName("");
  }

  const handleNewDialogClose = () => {
    setNewDialogOpen(false);
  }

  const handleNewDialogSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await createGraphRequest(authToken, newGraphName);
    } catch (err) {
      console.log(err);
    }
    // TODO: alert for failed responses
  }

  const handleNewGraphNameChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setNewGraphName(event.target.value);
  }

  return (
    <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}>
      <Typography variant="h5" component="h5" style={{ flex: "auto" }}>Graphs</Typography>
      <Tooltip title="Create" aria-label="create">
        <IconButton onClick={handleNewDialogOpen}>
          <AddTwoTone />
        </IconButton>
      </Tooltip>

      <Dialog open={newDialogOpen} onClose={handleNewDialogClose} aria-labelledby="new-dialog-title">
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
            <Button type="submit" onClick={handleNewDialogClose} color="primary">
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}