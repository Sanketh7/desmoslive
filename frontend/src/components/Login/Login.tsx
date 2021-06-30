import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  useGoogleLogin,
} from "react-google-login";

const clientId = process.env.REACT_APP_GCLOUD_OAUTH_CLIENT_ID || "";

const refreshTokenSystem = (res: GoogleLoginResponse) => {
  let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;
  const refreshToken = async () => {
    const newAuth = await res.reloadAuthResponse();
    refreshTiming = (newAuth.expires_in || 3600 - 5 * 60) * 1000;
    setTimeout(refreshToken, refreshTiming);
  };
  setTimeout(refreshToken, refreshTiming);
};

type LoginResponse = GoogleLoginResponse | GoogleLoginResponseOffline;

const isOnlineResponse = (res: LoginResponse): res is GoogleLoginResponse =>
  (res as GoogleLoginResponse).tokenId !== undefined;

const Login = (): JSX.Element => {
  const onSuccess = (res: LoginResponse) => {
    if (isOnlineResponse(res)) {
      console.log(res.profileObj);
      console.log();
      refreshTokenSystem(res);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFailure = (res: any) => {
    console.log("Login failed.", res);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
  });

  return (
    <button onClick={signIn}>
      <span>Sign in with Google</span>
    </button>
  );
};

export default Login;
