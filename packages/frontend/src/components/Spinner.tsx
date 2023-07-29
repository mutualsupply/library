import { SpinnerCircularFixed } from "spinners-react";
import resolveConfig from "tailwindcss/resolveConfig";
import myConfig from "../../tailwind.config";
const tailwindConfig = resolveConfig(myConfig);
console.log("colors", tailwindConfig?.theme?.colors);

const colors = tailwindConfig?.theme?.colors;

const Spinner = () => {
  return (
    <SpinnerCircularFixed
      size={25}
      thickness={100}
      speed={100}
      color={"#0C89E9"}
      secondaryColor={"#EAEAE6"}
    />
  );
};

export default Spinner;
