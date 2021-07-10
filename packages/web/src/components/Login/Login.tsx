import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import axios from "axios";

type LoginResponse = GoogleLoginResponse | GoogleLoginResponseOffline;
const isOnlineResponse = (res: LoginResponse): res is GoogleLoginResponse => {
  return (res as GoogleLoginResponse).tokenId !== undefined;
};

const Login: React.FC = () => {
  const handleLogin = async (data: LoginResponse) => {
    if (isOnlineResponse(data)) {
      console.log(data.tokenId);
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
        console.log(res);
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
    <div>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
        buttonText="Log in with Google"
        onSuccess={handleLogin}
        onFailure={handleLogin}
        cookiePolicy="single_host_origin"
      />
      <button onClick={() => handleLogout()}>Logout</button>
    </div>
  );
};

export default Login;
