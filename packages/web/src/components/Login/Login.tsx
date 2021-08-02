import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import axios from "axios";
import { useAuthContext } from "../../contexts/AuthContext";
import { Paper, Typography } from "@material-ui/core";

type LoginResponse = GoogleLoginResponse | GoogleLoginResponseOffline;
const isOnlineResponse = (res: LoginResponse): res is GoogleLoginResponse => {
  return (res as GoogleLoginResponse).tokenId !== undefined;
};

const Login: React.FC = () => {
  const { setAuthToken } = useAuthContext();

  const handleLogin = async (data: LoginResponse) => {
    if (isOnlineResponse(data)) {
      try {
        await axios.post(
          "/api/auth/google",
          {},
          {
            headers: {
              Authorization: data.tokenId as string,
            },
          }
        );
        setAuthToken(data.tokenId);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#e2fee2",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        style={{ minWidth: "30%", textAlign: "center", padding: "3% 1%" }}
      >
        <Typography variant="h4" color="primary" style={{ marginBottom: "5%" }}>
          Sign In
        </Typography>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
          buttonText="Log in with Google"
          onSuccess={handleLogin}
          onFailure={handleLogin}
          cookiePolicy="single_host_origin"
        />
      </Paper>
    </div>
  );
};

export default Login;
