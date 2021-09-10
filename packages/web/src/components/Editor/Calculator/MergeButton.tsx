import IconButton from "../../common/IconButton";
import { Dialog } from "@headlessui/react";
import { TiFlowMerge } from "react-icons/ti";
import { useState } from "react";
import { getMergeBranchRequest } from "../../../api/requests";
import { useMyBranchIDSWR } from "../../../api/swrRequests";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setActiveBranch } from "../../../redux/slices/activeBranchSlice";
import DialogButton from "../../common/DialogButton";

export const MergeButton: React.FC = () => {
  const authToken = useAppSelector((state) => state.auth.token);
  const activeBranch = useAppSelector((state) => state.activeBranch);
  const activeGraph = useAppSelector((state) => state.activeGraph);

  const dispatch = useAppDispatch();

  const { id: myBranchID } = useMyBranchIDSWR(authToken, activeGraph.id);

  const [dialogOpen, setDialogOpen] = useState(false);
  // TODO: implement snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleMerge = async () => {
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
    <div>
      <IconButton
        disabled={activeBranch.isOwner}
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
