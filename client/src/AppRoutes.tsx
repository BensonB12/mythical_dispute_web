import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Lost } from "./pages/Lost";
import { AnimalCards } from "./pages/AnimalCards";
import { DetailedAnimalCards } from "./pages/DetailedAnimalCards";
import { LoadingAndErrorHandling } from "./components/LoadingAndErrorHandling";
import { BackgroundImageControl } from "./controls/useBackgroundImageControl";
import { FC } from "react";

export const AppRoutes: FC<{
  backgroundImageControl: BackgroundImageControl;
}> = ({ backgroundImageControl }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home backgroundImageControl={backgroundImageControl} />}
      />
      <Route
        path="/cards"
        element={
          <LoadingAndErrorHandling>
            <AnimalCards backgroundImageControl={backgroundImageControl} />
          </LoadingAndErrorHandling>
        }
      />
      <Route
        path="/detailedCards"
        element={
          <LoadingAndErrorHandling>
            <DetailedAnimalCards
              backgroundImageControl={backgroundImageControl}
            />
          </LoadingAndErrorHandling>
        }
      />
      <Route path="*" element={<Lost />} />
    </Routes>
  );
};
