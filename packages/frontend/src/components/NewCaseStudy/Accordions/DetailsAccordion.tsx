import { useSession } from "next-auth/react"
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion"
import { BooleanStrings } from "../../../lib/schema"
import Section from "../../Section"
import TextInput from "../../inputs/TextInput"
import SelectInput from "../../inputs/SelectInput"
import { CaseStudyAccordionProps } from "./SignInAccordion"
import { cn } from "utils"

export default function DetailsAccordion({ value }: CaseStudyAccordionProps) {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger>4. Details</AccordionTrigger>
      <AccordionContent>
        <Section title="Your information">
          <TextInput name="email" type="email" label="Email" />
          <TextInput name="name" label="Your Name" />
        </Section>
        <div className={cn("mt-6")}>
          <Section title="About the report">
            <TextInput name="title" label="Title of the Report" />
            <TextInput
              name="organizationName"
              label="Name of the organization"
            />
            <TextInput
              name="productDescription"
              label="In 1-2 sentences, please briefly outline the main purpose of the product you are analyzing"
            />
            <TextInput
              name="industry"
              label="Which industry is this interface designed for?"
            />
            <SelectInput
              name="doesUseChain"
              label="Does this experience utilize blockchain technology?"
              placeholder="Select an answer"
              items={[
                { key: BooleanStrings.True, name: "Yes" },
                { key: BooleanStrings.False, name: "No" },
              ]}
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
            <TextInput
              type="url"
              name="url"
              label="If available, please provide an active URL or prototype link to the experience (ideally in the state you are analyzing)"
            />
          </Section>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
