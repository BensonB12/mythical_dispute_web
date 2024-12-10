import { AuthProvider, AuthProviderProps } from "react-oidc-context";
import { CookieKey } from "../../utils/Constant";
import { FC, ReactNode } from "react";

// .well-known/openid-configuration
// Needs to be updated to env variables for off campus and on campus...
const oidcConfig: AuthProviderProps = {
  authority: "https://auth.snowse-ts.duckdns.org/realms/Benson/",
  client_id: "client1", // env
  redirect_uri: "https://mythical-dispute.duckdns.org/profile", // didn't work on env
  onSigninCallback: async (user) => {
    console.log("YOU ARE LOGGED IN, in signinCallback");
    const newUrl = window.location.href.split("?")[0]; // Make sure to keep params you want
    window.history.replaceState({}, document.title, newUrl);
    console.log("User from oidc: " + user?.profile);
    // There is a ID_TOKEN (JWT) & ACCESS_TOKEN
    // Use the access_token... JK use the ID_TOKEN

    if (!user) return;
    const expirationDate = new Date(
      new Date().getTime() + (user.expires_in ?? 300) * 1000
    ).toUTCString();
    console.log("JWT EXPIRES PARSED" + expirationDate);

    Object.values(CookieKey).forEach(
      (k) => (document.cookie = `${k}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`)
    );

    document.cookie = `${CookieKey.JWT_TOKEN}=${user.id_token}; expires=${expirationDate}`;
    document.cookie = `${CookieKey.AUDIENCE}=${user.profile.aud}; expires=${expirationDate}`;
    document.cookie = `${CookieKey.ISSUER}=${user.profile.iss}; expires=${expirationDate}`;
  },
  onRemoveUser: async () => {
    console.log("Signing out and clearing cookies.");

    Object.values(CookieKey).forEach(
      (k) => (document.cookie = `${k}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`)
    );
  },
};

export const AppAuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <AuthProvider {...oidcConfig}>{children}</AuthProvider>;
};
