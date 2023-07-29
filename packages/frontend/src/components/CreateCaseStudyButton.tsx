import Link from "next/link"
import { cn } from "utils"
import Add from "./icons/Add"
import { Button } from "./ui/button"

const CreateCaseStudyButton = () => {
  return (
    <Link href={"/create-case"}>
      <Button
        variant={"outline"}
        className={cn(
          "text-sm",
          "flex",
          "items-center",
          "gap-2",
          "uppercase",
          "rounded-full",
          "text-black",
        )}
      >
        <Add width={16} fill="black" /> submit a report
      </Button>
    </Link>
  )
}

export default CreateCaseStudyButton
