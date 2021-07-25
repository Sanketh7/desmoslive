import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import axios from "axios";
import { Grid, Header } from "semantic-ui-react";
import { useAuthContext } from "../../contexts/AuthContext";

type LoginResponse = GoogleLoginResponse | GoogleLoginResponseOffline;
const isOnlineResponse = (res: LoginResponse): res is GoogleLoginResponse => {
  return (res as GoogleLoginResponse).tokenId !== undefined;
};

const Login: React.FC = () => {
  const { setAuthToken } = useAuthContext();

  const handleLogin = async (data: LoginResponse) => {
    if (isOnlineResponse(data)) {
      try {
        const res = await axios.post(
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
  const handleLogout = async () => {
    const res = await axios.delete("/api/auth/logout");
    console.log(res);
  };
  return (
    <Grid
      textAlign="center"
      style={{ height: "100vh", backgroundColor: "#e2fee2" }}
      verticalAlign="middle"
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <div
          style={{
            backgroundColor: "white",
            paddingTop: "3em",
            paddingBottom: "3em",
            border: "2px solid black",
            borderRadius: "2em",
          }}
        >
          <Header as="h2" color="green" textAlign="center">
            Log-in to your account
          </Header>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
            buttonText="Log in with Google"
            onSuccess={handleLogin}
            onFailure={handleLogin}
            cookiePolicy="single_host_origin"
          />
        </div>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
