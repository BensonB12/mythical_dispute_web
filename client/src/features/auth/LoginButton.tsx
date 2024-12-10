import { useAuth } from "react-oidc-context";
import { Spinner } from "../../components/Spinner/Spinner";

export function LoginButton() {
  const auth = useAuth();

  // useEffect(() => {
  //   if(auth.user){
  //     const data = new Date((auth.user.expires_at ?? 0) * 1000);
  //     document.cookie = `jwt_token=${auth.user.access_token}; expires=${data.toUTCString()}`;
  //   }
  // }
  // auth.events.

  switch (auth.activeNavigator) {
    case "signinSilent":
      return <div className="bg-success rounded">Signing you in...</div>;
    case "signoutRedirect":
      return <div className="bg-warning rounded">Signing you out...</div>;
  }

  if (auth.isLoading) {
    return <Spinner numberOfPaws={1} />;
  }

  if (auth.error) {
    return (
      <div className="bg-primary rounded">Oops... {auth.error.message}</div>
    );
  }

  if (auth.isAuthenticated) {
    console.log(auth.user);
    return (
      <button
        className="btn btn-outline-primary"
        onClick={() => void auth.removeUser()}
      >
        Log out
      </button>
    );
  }

  return (
    <button
      className="btn btn-primary btn-lg"
      onClick={() => void auth.signinRedirect()}
    >
      Log in
    </button>
  );
}
