import IconButton from "../../common/IconButton";
import { IoIosRefresh } from "react-icons/io";
import _ from "lodash";

interface Props {
  mutateGraphData: () => Promise<void>;
}

const RefreshButton = ({ mutateGraphData }: Props): JSX.Element => {
  return (
    <span>
      <IconButton
        onClick={_.throttle(async () => await mutateGraphData(), 1000)}
      >
        <IoIosRefresh />
      </IconButton>
    </span>
  );
};

export default RefreshButton;
