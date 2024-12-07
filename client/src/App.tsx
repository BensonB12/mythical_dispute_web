import { AppRoutes } from "./AppRoutes";
import { BackgroundImage } from "./components/BackgroundImage";
import { useBackgroundImageControl } from "./controls/useBackgroundImageControl";
import { HeadNav } from "./navigation/HeadNav";

export const App = () => {
  const backgroundImageControl = useBackgroundImageControl();
  return (
    <div className="d-flex flex-column min-vh-100 p-0">
      <div className="d-flex flex-grow-1">
        <BackgroundImage background={backgroundImageControl.value}>
          <HeadNav />
          <AppRoutes backgroundImageControl={backgroundImageControl} />
        </BackgroundImage>
      </div>
    </div>
  );
};
