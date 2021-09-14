import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
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
    <div className="h-screen bg-gradient-to-br from-green-400 to-blue-400 flex justify-center items-center">
      <div className="bg-gray-300 bg-opacity-50 w-1/4 h-auto flex flex-col justify-between items-center p-6 gap-y-4 rounded-xl">
        <div className="text-4xl font-sans font-bold text-green-800">
          Sign In
        </div>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
          buttonText="Log in with Google"
          onSuccess={handleLogin}
          onFailure={handleLogin}
          cookiePolicy="single_host_origin"
        />
      </div>
    </div>
  );
};

export default Login;
