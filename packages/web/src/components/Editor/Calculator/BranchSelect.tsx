import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useBranchesDataSWR, useMyBranchIDSWR } from "../../../api/swrRequests";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setActiveBranch } from "../../../redux/slices/activeBranchSlice";
import { MergeButton } from "./MergeButton";

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
  );
};
