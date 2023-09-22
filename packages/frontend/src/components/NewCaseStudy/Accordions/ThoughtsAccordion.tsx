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
      <AccordionTrigger className="font-otBrut text-primary text-2xl">
        2. Type of thoughts
      </AccordionTrigger>
      <AccordionContent>
        <div className={cn("font-medium", "font-aspekta", "text-lg", "mb-2")}>
          I am submitting a:
        </div>
        <RadioGroupInput
          name="type"
          items={[
            {
              value: StudyType.Signal,
              label: (
                <div>
                  <span className="text-primary">Signal</span>
                  {"  "}
                  <span className="text-[#505049] font-light">
                    (short form thoughts)
                  </span>
                </div>
              ),
            },
            {
              value: StudyType.Observation,
              label: (
                <div>
                  <span className="text-primary">Observation</span>
                  {"  "}
                  <span className="text-[#505049] font-light">
                    (semi-formal thoughts on an observed pattern)
                  </span>
                </div>
              ),
            },
            {
              value: StudyType.Exploration,
              label: (
                <span>
                  Exploration{"  "}
                  <span className="text-[#505049] font-light">
                    (formal research reports analyzing a full experience under a
                    problem statements)
                  </span>
                </span>
              ),
              disabled: true,
            },
          ]}
        />
        <div className={cn("mt-4", "font-aspekta", "font-medium")}>
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
