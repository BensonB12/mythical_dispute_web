import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Lost } from "./pages/Lost";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Lost />} />
    </Routes>
  );
};
