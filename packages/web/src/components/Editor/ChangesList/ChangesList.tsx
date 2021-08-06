import { List, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { ExpressionChange } from "../../../interfaces/expressions";
import { useAppSelector } from "../../../redux/hooks";
import ChangesListItem from "./ChangesListItem";
import { SaveButton } from "./SaveButton";

const ChangesList = (): JSX.Element => {
  const changes = useAppSelector((state) => state.expressions.changes);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: "1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" component="h5" style={{ flex: "auto" }}>
          Changes Made
        </Typography>
        <SaveButton />
      </div>
      {changes.length !== 0 ? (
        <List
          style={{
            width: "100%",
            maxHeight: "100%",
            overflow: "scroll",
          }}
        >
          {changes
            .filter((change: ExpressionChange | undefined) => change)
            .map((change: ExpressionChange) => {
              return <ChangesListItem key={change.id} change={change} />;
            })}
        </List>
      ) : (
        <Alert severity="info">No changes made.</Alert>
      )}
    </div>
  );
};

export default ChangesList;
