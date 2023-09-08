import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion"
import { cn } from "utils"
import { CaseStudyAccordionProps } from "./SignInAccordion"
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group"
import { Label } from "../../ui/label"
import { Link } from "../../Links"
import RadioGroupInput from "../../inputs/RadioGroupInput"
import { StudyType } from "../../../lib/interfaces"

export default function ThoughtsAccordion({ value }: CaseStudyAccordionProps) {
  return (
    <AccordionItem value="item-1">
      <AccordionTrigger>2. Type of thoughts</AccordionTrigger>
      <AccordionContent>
        <div className={cn("font-bold", "text-lg", "mb-2")}>
          I am submitting a:
        </div>
        <RadioGroupInput
          name="type"
          items={[
            { value: StudyType.Signal, label: "Signal" },
            { value: StudyType.Observation, label: "Observation" },
            {
              value: StudyType.Exploration,
              label: "Exploration",
              disabled: true,
            },
          ]}
        />
        <div className={cn("mt-4")}>
          We are currently accepting Exploration submissions manually.{" "}
          <Link isExternal href="mailto:help@mutual.supply">
            Chat with us
          </Link>{" "}
          to get started on the submission process.
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
