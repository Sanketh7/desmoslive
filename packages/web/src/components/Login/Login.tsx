import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { Paper, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/slices/authSlice";
import { loginRequest } from "../../api/requests";

type LoginResponse = GoogleLoginResponse | GoogleLoginResponseOffline;
const isOnlineResponse = (res: LoginResponse): res is GoogleLoginResponse => {
  return (res as GoogleLoginResponse).tokenId !== undefined;
};

const Login: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogin = async (data: LoginResponse) => {
    if (isOnlineResponse(data)) {
      try {
        const res = await loginRequest(data.tokenId as string);
        if (res.status !== 200) throw new Error("Failed to log in.");

        dispatch(
          setAuth({
            token: data.tokenId,
            email: (res.data as { email: string }).email,
          })
        );
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
