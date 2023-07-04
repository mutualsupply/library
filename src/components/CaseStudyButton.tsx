import { PlusIcon } from "@radix-ui/react-icons";
import { cn } from "utils";
import { Button } from "./ui/button";

const CaseStudyButton = () => {
  return (
    <Button
      variant={"outline"}
      className={cn("text-sm", "flex", "items-center", "gap-1", "uppercase")}
    >
      <PlusIcon /> new case study
    </Button>
  );
};

export default CaseStudyButton;
