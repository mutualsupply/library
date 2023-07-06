import { cn } from "utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

import BackLink from "../../components/backLink";
const NewCaseStudyPage = () => {
  return (
    <div>
      <BackLink href={"/"}>Library</BackLink>
      <div
        className={cn(
          "grid",
          "gap-x-4",
          "mt-4",
          "grid-cols-1",
          "md:grid-cols-8"
        )}
      >
        <div className={cn("md:col-span-2")}>
          <LeftPane />
        </div>
        <div className={cn("md:col-span-6", "mt-6", "md:mt-0")}>
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
