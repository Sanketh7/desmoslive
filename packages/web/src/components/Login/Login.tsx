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
      try {
        const res = await axios.post("http://localhost:7000", {
          token: data.tokenId,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
      buttonText="Log in with Google"
      onSuccess={handleLogin}
      onFailure={handleLogin}
      cookiePolicy="single-host-origin"
    />
  );
};

export default Login;
