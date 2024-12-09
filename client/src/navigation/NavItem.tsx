import { Link } from "react-router-dom";
import shadow from "./../styles/shadows.module.scss";

export const NavItem = ({
  to,
  iconClass,
  label,
}: {
  to: string;
  iconClass: string;
  label?: string;
}) => (
  <div className={`${shadow.light} col text-center m-0 p-0`}>
    <Link to={to} className="btn border-0">
      <i className={`${iconClass} h1`} />
      <div>{label}</div>
    </Link>
  </div>
);
