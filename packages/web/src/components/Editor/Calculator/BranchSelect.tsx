import { Listbox } from "@headlessui/react";
import { useBranchesDataSWR, useMyBranchIDSWR } from "../../../api/swrRequests";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setActiveBranch } from "../../../redux/slices/activeBranchSlice";
import { MergeButton } from "./MergeButton";
import { HiSelector } from "react-icons/hi";

export const BranchSelect: React.FC = () => {
  // TODO: merge branches
  const authEmail = useAppSelector((state) => state.auth.email);
  const authToken = useAppSelector((state) => state.auth.token);
  const activeGraph = useAppSelector((state) => state.activeGraph);
  const activeBranch = useAppSelector((state) => state.activeBranch);

  const dispatch = useAppDispatch();

  const { id: myBranchID } = useMyBranchIDSWR(authToken, activeGraph.id);
  const { branches } = useBranchesDataSWR(authToken, activeGraph.id);

  /*
  // make default selected branch my branch
  // only override if something else isn't already selected
  useEffect(() => {
    if (myBranchID && !activeBranch.id)
      dispatch(setActiveBranch({ id: myBranchID, isOwner: true }));
  }, [activeGraph.id]);
  */
  return (
    <div className="flex items-center gap-x-4">
      <div className="flex-grow">
        <Listbox
          value={activeBranch.id}
          onChange={(value) =>
            dispatch(
              setActiveBranch({
                id: value as string,
                isOwner: Boolean(myBranchID && value === myBranchID),
              })
            )
          }
        >
          <div className="relative">
            <Listbox.Button className="py-2 px-4 text-md border-2 border-green-700 rounded-md w-full text-left">
              {activeBranch.id}
              <HiSelector className="text-lg inline float-right" />
            </Listbox.Button>
            <Listbox.Options className="absolute mt-1 border-2 border-green-700 rounded-md z-50 bg-white w-full">
              {branches?.map((branch) => (
                <Listbox.Option
                  className="py-2 px-4 text-md rounded-md select-none hover:bg-green-200"
                  key={branch.id}
                  value={branch.id}
                >
                  {branch.owner.email}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>

      <div>
        <MergeButton />
      </div>
    </div>
  );
};

/*
<div>
      <div style={{ display: "flex" }}>
        <FormControl variant="outlined" style={{ flex: "auto" }}>
          <InputLabel id="select-labe">Branch</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            value={activeBranch.id}
            onChange={(event) =>
              dispatch(
                setActiveBranch({
                  id: event.target.value as string,
                  isOwner: Boolean(
                    myBranchID && event.target.value === myBranchID
                  ),
                })
              )
            }
            label="Branch"
          >
            {branches &&
              branches.map((branch) => {
                return (
                  <MenuItem key={branch.id} value={branch.id}>
                    {branch.owner.email +
                      (branch.owner.email === authEmail ? " (me)" : "")}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
        <MergeButton />
      </div>
      {!activeBranch.id && (
        <Alert severity="warning">You need to select a branch!</Alert>
      )}
    </div>
*/
