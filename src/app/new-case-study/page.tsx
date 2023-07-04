import Link from "next/link";
import { cn } from "utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

import { ArrowLeftIcon } from "@radix-ui/react-icons";
const NewCaseStudyPage = () => {
  return (
    <div>
      <span className={cn("border-b", "border-black", "inline-block")}>
        <Link
          href={"/"}
          className={cn("flex", "items-center", "gap-1", "text-sm")}
        >
          <ArrowLeftIcon /> Library
        </Link>
      </span>
      <div className={cn("grid", "grid-cols-8", "gap-x-4", "mt-4")}>
        <div className={cn("col-span-2")}>
          <LeftPane />
        </div>
        <div className={cn("col-span-6")}>
          <CreateNewCaseStudy />
        </div>
      </div>
    </div>
  );
};

const LeftPane = () => {
  return (
    <Accordion type="multiple" className={cn("flex", "flex-col", "gap-8")}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Best Practices Guide</AccordionTrigger>
        <AccordionContent>
          Let me tell you about these best practices
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Case Studies In Progress</AccordionTrigger>
        <AccordionContent>
          Here are some case studies that are happening already
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const CreateNewCaseStudy = () => {
  return (
    <div>
      <div className={cn("text-4xl", "text-center", "text-primary")}>
        Create a New Case Study
      </div>
    </div>
  );
};

export default NewCaseStudyPage;
