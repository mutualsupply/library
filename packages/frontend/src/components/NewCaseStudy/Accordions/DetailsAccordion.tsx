import { cn } from "utils"
import { BooleanStrings } from "../../../lib/schema"
import SelectInput from "../../inputs/SelectInput"
import TextInput from "../../inputs/TextInput"
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion"
import { CaseStudyAccordionProps } from "./SignInAccordion"

export default function DetailsAccordion({ value }: CaseStudyAccordionProps) {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger>4. Details</AccordionTrigger>
      <AccordionContent>
        <div className={cn("flex", "flex-col", "gap-6")}>
          <TextInput
            name="name"
            label="Your Preferred Name (for attribution)"
          />
          <TextInput name="email" type="email" label="Email" />
          <TextInput name="title" label="Report Title" />
          <TextInput
            name="organizationName"
            label="Name of the organization you are observing"
          />
          <TextInput
            type="url"
            name="url"
            label="If available, please provide an active URL or prototype link to the experience (ideally in the state you are analyzing)"
          />
          <TextInput
            name="industry"
            label="Which industry is this interface designed for? (Optional)"
          />
          <SelectInput
            name="partOfTeam"
            label="Were you part of the team that built this experience?"
            placeholder="Select an answer"
            items={[
              { key: BooleanStrings.True, name: "Yes" },
              { key: BooleanStrings.False, name: "No" },
            ]}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
