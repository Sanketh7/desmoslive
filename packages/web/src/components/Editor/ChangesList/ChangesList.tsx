import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  Typography,
} from "@material-ui/core";
import { SaveTwoTone } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ExpressionChange } from "../../../interfaces/changesList";
import { RootState } from "../../../redux/store";
import ChangesListItem from "./ChangesListItem";

const ChangesList = (): JSX.Element => {
  const changes = useSelector((state: RootState) => state.changes.value);

  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

  const handleSaveDialogOpen = () => setSaveDialogOpen(true);
  const handleSaveDialogClose = () => setSaveDialogOpen(false);
  const handleSaveDialogSubmit: React.FormEventHandler<HTMLFormElement> =
    async (event) => {
      event.preventDefault();
      // TODO: save
    };

  return (
    <div style={{ width: "100%", height: "100%", padding: "1rem" }}>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Typography variant="h5" component="h5" style={{ flex: "auto" }}>
          Changes Made
        </Typography>
        <IconButton
          disabled={changes.length === 0}
          onClick={handleSaveDialogOpen}
        >
          <SaveTwoTone />
        </IconButton>

        <Dialog
          open={saveDialogOpen}
          onClose={handleSaveDialogClose}
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
              <Button onClick={handleSaveDialogClose} color="primary">
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={handleSaveDialogClose}
                color="primary"
                autoFocus
              >
                Confirm
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
      {changes.length !== 0 ? (
        <List style={{ width: "100%", height: "100%" }}>
          {changes
            .filter((change: ExpressionChange | undefined) => change)
            .map((change: ExpressionChange) => {
              return <ChangesListItem key={change.latex} change={change} />;
            })}
        </List>
      ) : (
        <Alert severity="info">No changes made.</Alert>
      )}
    </div>
  );
};

export default ChangesList;
