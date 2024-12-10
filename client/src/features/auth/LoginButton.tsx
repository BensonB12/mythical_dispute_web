import { useAuth } from "react-oidc-context";

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
      return <div>Signing you in...</div>;
    case "signoutRedirect":
      return <div>Signing you out...</div>;
  }

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Oops... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    console.log(auth.user);
    return (
      <div>
        Hello {auth.user?.profile.sub}{" "}
        <button
          className="btn btn-outline-primary"
          onClick={() => void auth.removeUser()}
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <button
      className="btn btn-primary"
      onClick={() => void auth.signinRedirect()}
    >
      Log in
    </button>
  );
}
