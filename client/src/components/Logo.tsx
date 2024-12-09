import fonts from "./../styles/fonts.module.scss";
import shadow from "./../styles/shadows.module.scss";

export const Logo = () => {
  return (
    <div className="text-center">
      <div
        className={`${fonts.irish_grover} ${shadow.light} fs-2 text-primary`}
      >
        Mythical Dispute
      </div>
      <div className={`${fonts.calligraffiti} ${shadow.light}  fs-5 text-dark`}>
        Draft Your Animal Army
      </div>
    </div>
  );
};
