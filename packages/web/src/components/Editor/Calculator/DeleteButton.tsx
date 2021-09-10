import IconButton from "../../common/IconButton";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { mutate } from "swr";
import { deleteGraphRequest } from "../../../api/requests";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { resetActiveGraph } from "../../../redux/slices/activeGraphSlice";
import DialogButton from "../../common/DialogButton";

export const DeleteButton: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  // TODO: snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const authToken = useAppSelector((state) => state.auth.token);
  const activeGraph = useAppSelector((state) => state.activeGraph);

  const dispatch = useAppDispatch();

  const handleDelete = async () => {
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
    <div>
      <IconButton onClick={() => setDialogOpen(true)}>
        <FaTrash />
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
            Delete Graph?
          </Dialog.Title>
          <Dialog.Description className="text-md italic mb-2">
            This will permanently delete the current graph.
          </Dialog.Description>

          <p className="text-lg mb-2">
            Are you sure you want to delete this graph? This action cannot be
            undone.
          </p>

          <div className="flex items-center justify-around">
            <DialogButton
              text="Cancel"
              variant="cancel"
              onClick={() => setDialogOpen(false)}
            />
            <DialogButton
              text="Delete"
              variant="ok"
              onClick={async () => {
                setDialogOpen(false);
                await handleDelete();
              }}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};
