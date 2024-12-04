import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Lost } from "./pages/Lost";
import { AnimalCards } from "./pages/AnimalCards";
import { DetailedAnimalCards } from "./pages/DetailedAnimalCards";
import { LoadingAndErrorHandling } from "./components/LoadingAndErrorHandling";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/cards"
        element={
          <LoadingAndErrorHandling>
            <AnimalCards />
          </LoadingAndErrorHandling>
        }
      />
      <Route
        path="/detailedCards"
        element={
          <LoadingAndErrorHandling>
            <DetailedAnimalCards />
          </LoadingAndErrorHandling>
        }
      />
      <Route path="*" element={<Lost />} />
    </Routes>
  );
};
