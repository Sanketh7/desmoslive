import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import IconButton from "../../common/IconButton";
import DialogButton from "../../common/DialogButton";
import * as EmailValidator from "email-validator";
import { useAppSelector } from "../../../redux/hooks";
import { shareGraphRequest } from "../../../api/requests";
import { FaShare } from "react-icons/fa";

export const ShareButton: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [emailEntry, setEmailEntry] = useState("");
  // TODO: snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const authToken = useAppSelector((state) => state.auth.token);
  const activeGraph = useAppSelector((state) => state.activeGraph);

  const handleShare = async () => {
    try {
      if (!authToken) throw new Error("Needs authentication.");
      if (!activeGraph.id) throw new Error("No active graph.");
      const res = await shareGraphRequest(
        authToken,
        activeGraph.id,
        emailEntry
      );
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
      <IconButton onClick={() => setDialogOpen(true)}>
        <FaShare />
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
            Share Graph?
          </Dialog.Title>
          <Dialog.Description className="text-md italic mb-8">
            This will share the current graph with the user specified below.
          </Dialog.Description>

          <input
            value={emailEntry}
            onChange={(event) => setEmailEntry(event.target.value)}
            placeholder="Email"
            className="w-72 rounded-full py-1 px-4 border-green-700 mb-4"
          />

          <div className="flex items-center justify-around">
            <DialogButton
              text="Cancel"
              variant="cancel"
              onClick={() => setDialogOpen(false)}
            />
            <DialogButton
              text="Share"
              variant="ok"
              disabled={!emailEntry || !EmailValidator.validate(emailEntry)}
              onClick={async () => {
                setDialogOpen(false);
                await handleShare();
              }}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};
