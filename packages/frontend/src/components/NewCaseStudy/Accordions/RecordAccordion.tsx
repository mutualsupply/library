import { cn } from "utils"
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion"
import { MilkdownEditorWrapper } from "../../MilkdownEditor"
import { CaseStudyAccordionProps } from "./SignInAccordion"

interface RecordAccordionProps extends CaseStudyAccordionProps {
  onChange: (value: string) => void
}

export default function RecordAccordion({
  value,
  onChange,
}: RecordAccordionProps) {
  return (
    <AccordionItem value="item-2">
      <AccordionTrigger>3. Record your thoughts</AccordionTrigger>
      <AccordionContent>
        <div>
          All submissions are subject to a review process by the MUTUAL team. We
          suggest starting with our Best Practices Guide to understand what kind
          of information to include, and how to format your thoughts in the
          editor below.
        </div>
        <div className={cn("font-bold", "my-6")}>
          Pro tip : Open the editor below in full-screen mode for a breezy
          editing experience.
        </div>
        <MilkdownEditorWrapper onChange={onChange} />
      </AccordionContent>
    </AccordionItem>
  )
}