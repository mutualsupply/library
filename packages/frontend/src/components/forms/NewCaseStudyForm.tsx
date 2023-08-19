import { useSession } from "next-auth/react"
import { CreateNewCaseStudyResponse } from "../../lib/interfaces"
import { useState } from "react"
import { isProd } from "../../lib/env"
import { BooleanStrings, caseStudyFormSchema } from "../../lib/schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form } from "../ui/form"
import TextInput from "../TextInput"
import { cn } from "utils"
import SelectInput from "../SelectInput"
import { BestPracticesLink } from "../Links"
import { MilkdownEditorWrapper } from "../MilkdownEditor"
import { Button } from "../ui/button"
import Section from "../Section"

interface NewCaseStudyFormProps {
  onSuccess?: (data: CreateNewCaseStudyResponse) => void
}

export default function NewCaseStudyForm({ onSuccess }: NewCaseStudyFormProps){
  const { data: session } = useSession()
  const isLoggedIn = session?.user?.name
  const [markdown, setMarkdown] = useState("")
  const [error, setError] = useState<null | string>(null)
  const defaultValues = isProd()
    ? {
        email: session?.user?.email || "",
        name: session?.user?.name || "",
        organizationName: "",
        title: "",
        productDescription: "",
        industry: "",
        doesUseChain: "",
        partOfTeam: "",
        url: "",
      }
    : {
        email: session?.user?.email || "",
        name: session?.user?.name || "",
        title: "How to make a Case Study",
        organizationName: "MUTUAL",
        productDescription: "Mutual Supply",
        industry: "Knowledge",
        doesUseChain: BooleanStrings.True,
        partOfTeam: BooleanStrings.True,
        url: "https://dev.mutual.supply",
      }
  const form = useForm({
    resolver: zodResolver(caseStudyFormSchema),
    defaultValues,
  })
  async function onSubmit(values: z.infer<typeof caseStudyFormSchema>) {
    setError(null)
    const res = await fetch("/api/create-case", {
      method: "POST",
      body: JSON.stringify({
        ...values,
        doesUseChain: values.doesUseChain === BooleanStrings.True,
        partOfTeam: values.partOfTeam === BooleanStrings.True,
        url: values.url === "" ? undefined : values.url,
        markdown: markdown === "" ? undefined : markdown,
      }),
      credentials: "same-origin",
    })
    if (!res.ok) {
      console.error("Could not create case study", await res.text())
      setError("Could not create case study")
    } else {
      const json = await res.json()
      if (onSuccess) {
        onSuccess(json)
      }
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-8")}>
        <Section title="Your information">
          <TextInput name="email" type="email" label="Email" />
          <TextInput name="name" label="Your Name" />
        </Section>
        <Section title="About the report">
          <TextInput name="title" label="Title of the Report" />
          <TextInput name="organizationName" label="Name of the organization" />
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
        <Section title="Share your report">
          <div>
            Please read the <BestPracticesLink /> for guidelines on what to
            include and how to format your report. All reports are subject to an
            approval process by the MUTUAL team, based on guidelines outline in
            our documentation.
          </div>
          <MilkdownEditorWrapper onChange={setMarkdown} />
        </Section>
        {error && <div className={cn("text-red-600")}>{error}</div>}

        <Button
          loading={form.formState.isSubmitting}
          variant={"outline"}
          disabled={!isLoggedIn}
          type="submit"
          className={cn("w-full", "uppercase", "rounded-full")}
        >
          {isLoggedIn ? "submit report" : "sign in to submit"}
        </Button>
      </form>
    </Form>
  )
}