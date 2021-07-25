import Login from "./components/Login/Login";
import Editor from "./components/Editor/Editor";
import { useAuthContext } from "./contexts/AuthContext";

const App = (): JSX.Element => {
  const { authToken } = useAuthContext();

  if (authToken === "") return <Login />;
  else return <Editor />;
};

export default App;
