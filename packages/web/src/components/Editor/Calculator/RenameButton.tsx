import { Dialog } from "@headlessui/react";
import IconButton from "../../common/IconButton";
import { useState } from "react";
import { FaPen } from "react-icons/fa";
import { mutate } from "swr";
import { renameGraphRequest } from "../../../api/requests";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setActiveGraph } from "../../../redux/slices/activeGraphSlice";
import DialogButton from "../../common/DialogButton";

export const RenameButton: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [nameEntry, setNameEntry] = useState("");
  // TODO: snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const authToken = useAppSelector((state) => state.auth.token);
  const activeGraph = useAppSelector((state) => state.activeGraph);

  const dispatch = useAppDispatch();

  const handleRename = async () => {
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
    // reset state
    setNameEntry("");
  };

  return (
    <div>
      <IconButton onClick={() => setDialogOpen(true)}>
        <FaPen />
      </IconButton>

      <Dialog
        as="div"
        className="fixed inset-0 text-center flex bg-black bg-opacity-50"
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      >
        <Dialog.Overlay />
        <div className="bg-white w-1/3 m-auto border border-green-700 rounded-xl p-4">
          <Dialog.Title className="text-2xl font-bold">
            Rename Graph?
          </Dialog.Title>
          <Dialog.Description className="text-md italic mb-8">
            This will rename the current graph.
          </Dialog.Description>

          <input
            value={nameEntry}
            onChange={(event) => setNameEntry(event.target.value)}
            placeholder="Graph Name"
            className="w-72 rounded-full py-1 px-4 border-green-700 mb-4"
          />

          <div className="flex items-center justify-around">
            <DialogButton
              text="Cancel"
              variant="cancel"
              onClick={() => setDialogOpen(false)}
            />
            <DialogButton
              text="Rename"
              variant="ok"
              disabled={!nameEntry}
              onClick={async () => {
                setDialogOpen(false);
                await handleRename();
              }}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};
