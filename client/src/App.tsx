import { AppRoutes } from "./AppRoutes";
import { HeadNav } from "./navigation/HeadNav";

export const App = () => {
  return (
    <>
      <HeadNav />
      <AppRoutes />
    </>
  );
};
