import { ClassicButton } from "../components/ClassicButton";

export const PlayingOptions = () => {
  return (
    <div className="text-center">
      <ClassicButton icon="bi-file-arrow-down" label={"Host Game"} />
      <br />
      <ClassicButton icon="bi-arrow-return-right" label={"Join Game"} />
    </div>
  );
};
