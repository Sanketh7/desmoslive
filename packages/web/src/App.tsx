import Login from "./components/Login/Login";
import Editor from "./components/Editor/Editor";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

const App = (): JSX.Element => {
  const authToken = useSelector((state: RootState) => state.auth.token);

  if (!authToken) return <Login />;
  else return <Editor />;
};

export default App;
