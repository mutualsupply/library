import { cn } from "utils";
import { SvgProps } from "./Logo";

const Add = ({ width = "24", className, fill = "#0C89E9" }: SvgProps) => {
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13 2C11.8954 2 11 2.89543 11 4V11H4C2.89543 11 2 11.8954 2 13H11V22C12.1046 22 13 21.1046 13 20V13H20C21.1046 13 22 12.1046 22 11H13V2Z"
        fill={fill}
      />
    </svg>
  );
};

export default Add;
