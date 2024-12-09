import { Link } from "react-router-dom";
import { LoginButton } from "../features/auth/LoginButton";

export const HeadNav = () => {
  return (
    <div className="" style={{ zIndex: 3 }}>
      <LoginButton />
      <Link to={"/detailedCards"}>See all detailed cards</Link>
      <Link to={"/cards"}>See all cards</Link>
    </div>
  );
};
