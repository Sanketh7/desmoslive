import IconButton from "../../common/IconButton";
import { Dialog } from "@headlessui/react";
import { TiFlowMerge } from "react-icons/ti";
import { useState } from "react";
import {
  getMyBranchIDRequest,
  mergeBranchRequest,
} from "../../../api/requests";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setActiveBranch } from "../../../redux/slices/activeBranchSlice";
import DialogButton from "../../common/DialogButton";

export const MergeButton: React.FC = () => {
  const auth = useAppSelector((state) => state.auth);
  const activeBranch = useAppSelector((state) => state.activeBranch);
  const activeGraph = useAppSelector((state) => state.activeGraph);

  const dispatch = useAppDispatch();

  const [dialogOpen, setDialogOpen] = useState(false);
  // TODO: implement snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleMerge = async () => {
    try {
      if (!auth.token || !auth.email) throw new Error("Needs authentication");
      if (!activeBranch?.id) throw new Error("No branch selected.");
      if (!activeGraph.id) throw new Error("No graph selected.");
      const myBranchID = await getMyBranchIDRequest(auth.token, activeGraph.id);
      if (myBranchID.status !== 200)
        throw new Error("No branch to merge into.");
      const res = await mergeBranchRequest(
        auth.token,
        activeBranch.id,
        myBranchID.data.id
      );

      setSuccess(res.status === 200);
      setSnackbarOpen(true);

      // reset view to my branch
      dispatch(
        setActiveBranch({
          id: myBranchID.data.id,
          owner: { email: auth.email },
        })
      );
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
          !activeBranch.owner.email || activeBranch.owner.email === auth.email
        }
        onClick={() => setDialogOpen(true)}
      >
        <TiFlowMerge className="text-xl" />
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
            Merge Branch?
          </Dialog.Title>
          <Dialog.Description className="text-md italic mb-2">
            This will merge the current branch into your branch.
          </Dialog.Description>

          <p className="text-lg mb-2">
            Are you sure you want to merge the current branch into your branch?
            This action cannot be undone.
          </p>

          <div className="flex items-center justify-around">
            <DialogButton
              text="Cancel"
              variant="cancel"
              onClick={() => setDialogOpen(false)}
            />
            <DialogButton
              text="Merge"
              variant="ok"
              onClick={async () => {
                setDialogOpen(false);
                await handleMerge();
              }}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};
