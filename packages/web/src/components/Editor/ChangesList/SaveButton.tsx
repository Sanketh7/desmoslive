import { useState } from "react";
import { mutate } from "swr";
import { updateBranchExpressionsRequest } from "../../../api/requests";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setExpressionsChanges } from "../../../redux/slices/expressionsSlice";
import IconButton from "../../common/IconButton";
import { Dialog } from "@headlessui/react";
import DialogButton from "../../common/DialogButton";
import { FaSave } from "react-icons/fa";

export const SaveButton: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  // TODO: snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const changes = useAppSelector((state) => state.expressions.changes);
  const currentExpressions = useAppSelector(
    (state) => state.expressions.current
  );
  const auth = useAppSelector((state) => state.auth);
  const activeGraph = useAppSelector((state) => state.activeGraph);
  const activeBranch = useAppSelector((state) => state.activeBranch);

  const dispatch = useAppDispatch();

  const handleSave = async () => {
    try {
      if (!auth.token) throw new Error("No authentication.");
      if (!activeGraph.id) throw new Error("No active graph.");
      const res = await updateBranchExpressionsRequest(
        auth.token as string,
        activeBranch?.id as string,
        currentExpressions.map((expr) => expr.latex)
      );
      // clear changes
      dispatch(setExpressionsChanges([]));
      // force swr to update
      mutate(`/api/branch/${activeBranch?.id}/expressions`);

      setSuccess(res.status === 200);
      setSnackbarOpen(true);
    } catch (err) {
      console.log(err);
      setSuccess(false);
      setSnackbarOpen(true);
    }
  };

  return (
    <div>
      <IconButton
        disabled={
          changes.length === 0 ||
          !activeBranch.owner.email ||
          activeBranch.owner.email !== auth.email
        }
        onClick={() => setDialogOpen(true)}
      >
        <FaSave />
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
            Save Graph?
          </Dialog.Title>
          <Dialog.Description className="text-md italic mb-2">
            This will save changes made to your branch.
          </Dialog.Description>

          <p className="text-lg mb-2">
            Are you sure you want to save these changes? This action cannot be
            undone.
          </p>

          <div className="flex items-center justify-around">
            <DialogButton
              text="Cancel"
              variant="cancel"
              onClick={() => setDialogOpen(false)}
            />
            <DialogButton
              text="Save"
              variant="ok"
              onClick={async () => {
                setDialogOpen(false);
                await handleSave();
              }}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};
