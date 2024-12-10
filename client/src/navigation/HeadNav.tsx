import { useLocation } from "react-router-dom";
import { NavItem } from "./NavItem";

export const HeadNav = () => {
  const location = useLocation();

  const navLinks = [
    { to: "/", iconClass: "bi-house", label: "Home" },
    {
      to: "/detailedCards",
      iconClass: "bi-card-list",
      label: "Detailed Cards",
    },
    { to: "/cards", iconClass: "bi-list", label: "Basic Cards" },
    { to: "/info", iconClass: "bi-info-circle", label: "Info" },
    { to: "/settings", iconClass: "bi-gear", label: "Settings" },
    { to: "/profile", iconClass: "bi-person-circle", label: "Profile" },
  ];

  return (
    <div>
      <div className="row mx-0 d-none d-sm-flex pt-2">
        {navLinks
          .filter((l) => l.to !== location.pathname)
          .map(({ to, iconClass, label }) => (
            <NavItem key={to} to={to} iconClass={iconClass} label={label} />
          ))}
      </div>
      <div className="row fixed-bottom mx-0 mb-2 d-sm-none">
        {navLinks
          .filter((l) => l.to !== location.pathname)
          .map(({ to, iconClass }) => (
            <NavItem key={to} to={to} iconClass={iconClass} />
          ))}
      </div>
    </div>
  );
};
