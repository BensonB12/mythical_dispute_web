import { LoadingAndErrorHandling } from "../components/LoadingAndErrorHandling";
import { AllCards } from "./AllCards";

export const Home = () => {
  return (
    <>
      <LoadingAndErrorHandling>
        <AllCards />
      </LoadingAndErrorHandling>
    </>
  );
};
