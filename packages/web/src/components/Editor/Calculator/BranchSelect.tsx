import { Listbox } from "@headlessui/react";
import { useBranchesDataSWR } from "../../../api/swrRequests";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setActiveBranch } from "../../../redux/slices/activeBranchSlice";
import { MergeButton } from "./MergeButton";
import { HiSelector } from "react-icons/hi";
import BranchData from "@desmoslive/api/src/interfaces/BranchData";

export const BranchSelect: React.FC = () => {
  // TODO: merge branches
  const auth = useAppSelector((state) => state.auth);
  const activeGraph = useAppSelector((state) => state.activeGraph);
  const activeBranch = useAppSelector((state) => state.activeBranch);

  const dispatch = useAppDispatch();

  const { branches } = useBranchesDataSWR(auth.token, activeGraph.id);

  return (
    <div className="flex items-center gap-x-4">
      <div className="flex-grow">
        <Listbox
          value={JSON.stringify(activeBranch)}
          onChange={(value: string) => {
            console.log(value);
            dispatch(setActiveBranch(JSON.parse(value) as BranchData));
          }}
        >
          <div className="relative">
            <Listbox.Button className="py-2 px-4 text-md border-2 border-green-700 rounded-md w-full text-left">
              {activeBranch?.owner.email}
              <HiSelector className="text-lg inline float-right" />
            </Listbox.Button>
            <Listbox.Options className="absolute mt-1 border-2 border-green-700 rounded-md z-50 bg-white w-full">
              {branches?.map((branch) => (
                <Listbox.Option
                  className="py-2 px-4 text-md rounded-md select-none hover:bg-green-200"
                  key={branch.id}
                  value={JSON.stringify(branch)}
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
