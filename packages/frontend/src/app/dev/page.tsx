"use client"

import { PropsWithChildren, useEffect } from "react"
import { Button, Submit } from "../../components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion"
import { Form } from "../../components/ui/form"
import TextInput from "../../components/inputs/TextInput"
import { useForm } from "react-hook-form"
import SelectInput from "../../components/inputs/SelectInput"
import { BooleanStrings } from "../../lib/schema"
import sleep from "../../lib/sleep"
import RadioGroupInput from "../../components/inputs/RadioGroupInput"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group"

const buttonVariants = ["default", "outline", "link"] as const
const buttonSizes = ["default", "lg", "icon"] as const

export default function DevPage() {
  const form = useForm()
  const onFormSubmit = async (values: object) => {
    await sleep(1)
    alert(JSON.stringify(values, null, 2))
  }
  return (
    <div className="flex flex-col space-y-8">
      <Section title="Accordion">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Accordion</AccordionTrigger>
            <AccordionContent>🪗🪗🪗 we do a lil 🪗🪗🪗</AccordionContent>
          </AccordionItem>
        </Accordion>
      </Section>
      <Section title="Button">
        <div className="grid md:grid-cols-3 grid-cols-1 space-y-3">
          {buttonVariants.map((variant) => (
            <>
              {buttonSizes.map((size) => (
                <div className="flex justify-center">
                  <Button variant={variant} size={size}>
                    {variant} {size}
                  </Button>
                </div>
              ))}
            </>
          ))}
        </div>
      </Section>

      <Section title="Radio Group">
        <RadioGroup>
          <RadioGroupItem value="yes">Yes</RadioGroupItem>
          <RadioGroupItem value="no">No</RadioGroupItem>
          <RadioGroupItem value="maybe" disabled>
            Maybe
          </RadioGroupItem>
        </RadioGroup>
      </Section>
      <Section title="Select">
        <Button>Primary</Button>
      </Section>
      <Section title="Form">
        <div className="max-w-xl m-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)}>
              <TextInput name="Name" label="Who are you?" />
              <SelectInput
                name="mutual"
                label="Do you feel mutual?"
                placeholder="Select an answer"
                items={[
                  { key: BooleanStrings.True, name: "Yes" },
                  { key: BooleanStrings.False, name: "No" },
                ]}
              />
              <div className="mt-2">
                <RadioGroupInput
                  name="radio"
                  items={[
                    { label: "Yes", value: "yes" },
                    { label: "No", value: "no" },
                    { label: "Maybe", value: "maybe", disabled: true },
                  ]}
                />
              </div>
              <div className="flex justify-center mt-3">
                <Submit />
              </div>
            </form>
          </Form>
        </div>
      </Section>
      <Section title="Input">
        <Input placeholder="->->->" />
      </Section>
      <Section title="Label">
        <Label>Label</Label>
      </Section>
      <Section title="Tooltip">
        <Button>Primary</Button>
      </Section>
    </div>
  )
}

interface SectionProps {
  title?: string
}

function Section({ children, title }: PropsWithChildren<SectionProps>) {
  return (
    <div>
      {title && <div className="text-2xl mb-1">{title}</div>}
      <div className="border p-4">{children}</div>
    </div>
  )
}
