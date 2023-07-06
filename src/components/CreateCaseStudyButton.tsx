import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { cn } from "utils";
import { Button } from "./ui/button";

const CreateCaseStudyButton = () => {
  return (
    <Link href={"create-case-study"}>
      <Button
        variant={"outline"}
        className={cn("text-sm", "flex", "items-center", "gap-1", "uppercase")}
      >
        <PlusIcon /> new case study
      </Button>
    </Link>
  );
};

export default CreateCaseStudyButton;
