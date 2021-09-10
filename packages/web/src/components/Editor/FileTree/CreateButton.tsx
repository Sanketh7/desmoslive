import { Dialog } from "@headlessui/react";
import IconButton from "../../common/IconButton";
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { createGraphRequest } from "../../../api/requests";
import { RootState } from "../../../redux/store";
import DialogButton from "../../common/DialogButton";

const CreateButton = (): JSX.Element => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [nameEntry, setNameEntry] = useState("");
  const authToken = useSelector((state: RootState) => state.auth.token);
  // TODO: snackbar

  const handleCreate = async () => {
    try {
      if (!authToken) throw new Error("Not authenticated.");
      const res = await createGraphRequest(authToken, nameEntry);
      // refresh graph data to immediately show new graph
      // await mutateGraphData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <span>
      <IconButton onClick={() => setDialogOpen(true)}>
        <FaPlusCircle />
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
            Create Graph?
          </Dialog.Title>
          <Dialog.Description className="text-md italic mb-8">
            This will create a new graph with the specified name.
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
                await handleCreate();
              }}
            />
          </div>
        </div>
      </Dialog>
    </span>
  );
};

export default CreateButton;
