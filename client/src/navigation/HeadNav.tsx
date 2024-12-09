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
  ];

  return (
    <div>
      <div className="row mx-0">
        {navLinks
          .filter((l) => l.to !== location.pathname)
          .map(({ to, iconClass, label }) => (
            <NavItem key={to} to={to} iconClass={iconClass} label={label} />
          ))}
      </div>
    </div>
  );
};
