"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { signIn, signOut, useSession } from "next-auth/react"
import { cn } from "utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion"

import { ArrowRightIcon } from "@radix-ui/react-icons"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import ConnectButton from "../../components/ConnectButton"
import { BackLink, BestPracticesLink, Link } from "../../components/Links"
import { MilkdownEditorWrapper } from "../../components/MilkdownEditor"
import SelectInput from "../../components/SelectInput"
import TextInput from "../../components/TextInput"
import Add from "../../components/icons/Add"
import Github from "../../components/icons/Github"
import { Button } from "../../components/ui/button"
import { Form } from "../../components/ui/form"
import { GithubPullResponse, getPulls } from "../../lib/api"
import { CreateNewCaseStudyResponse } from "../../lib/interfaces"
import { BooleanStrings, caseStudyFormSchema } from "../../lib/schema"

const NewCaseStudyPage = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["pulls"],
    queryFn: getPulls,
    cacheTime: 0,
    refetchOnWindowFocus: true,
  })
  const onCreateSuccess = () => {
    refetch()
  }
  return (
    <div>
      <BackLink href={"/"}>Library</BackLink>
      <div className={cn("flex", "gap-24", "mt-4", "flex-col", "md:flex-row")}>
        <div className={cn("md:max-w-md", "w-full")}>
          <Accordion
            type="multiple"
            className={cn("flex", "flex-col", "gap-8")}
            defaultValue={["item-0"]}
          >
            <AccordionItem value="item-0" defaultValue={"item-0"}>
              <AccordionTrigger>Welcome</AccordionTrigger>
              <AccordionContent>
                <div className={cn("flex", "flex-col", "gap-4")}>
                  <div>
                    This database exists to provide a collaborative environment
                    for designers, researchers and engineers to learn from and
                    interact with one another.
                  </div>
                  <div>
                    By submitting research, you're contributing to a public
                    knowledge base that fuels experimentation and drives the
                    evolution of user-centered design in blockchain products.
                  </div>
                  <div>
                    We're excited to be a part of your process as you prepare
                    your report. Before submitting, read the{" "}
                    <BestPracticesLink /> to understand requirements and
                    internal standards. All reports are subject to an approval
                    process based on guidelines you will find in our
                    documentation.
                  </div>
                  <div>Database & online experience maintaned by MUTUAL</div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-1">
              <AccordionTrigger>Best Practices Guide</AccordionTrigger>
              <AccordionContent>
                ~ Mutually supply with us please ~
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Case Studies In Progress</AccordionTrigger>
              <AccordionContent>
                <Link
                  isExternal
                  href={"https://github.com/mutualsupply/site/pulls"}
                  className={cn(
                    "inline-flex",
                    "items-center",
                    "gap-1",
                    "border-b",
                    "text-xs",
                    "no-underline",
                  )}
                >
                  <span>View all on Github</span> <ArrowRightIcon />
                </Link>
                {!isLoading && data && (
                  <div className={cn("flex", "flex-col", "gap-3", "mt-4")}>
                    {data?.map((pull) => (
                      <DraftCaseStudy pull={pull} key={pull.number} />
                    ))}
                  </div>
                )}
                {!isLoading && !data && (
                  <div className={cn("text-center", "text-primary")}>
                    No case studies in progress
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className={cn("mt-6", "md:mt-0")}>
          <CreateNewCaseStudy onSuccess={onCreateSuccess} />
        </div>
      </div>
    </div>
  )
}

interface DraftCaseStudyProps {
  pull: GithubPullResponse[number]
}

const DraftCaseStudy = ({ pull }: DraftCaseStudyProps) => {
  return (
    <div className={cn("p-4", "border", "flex", "flex-col", "gap-2")}>
      <Link
        isExternal
        href={pull.html_url}
        className={cn(
          "text-black",
          "font-aspekta",
          "font-light",
          "inline-flex",
          "justify-between",
          "items-center",
        )}
      >
        <span>{pull.title}</span>
        <span className={cn("text-xs")}>({pull.number})</span>
      </Link>
      <div className={cn("text-primary")}>{pull.user?.login}</div>
    </div>
  )
}

const CreateNewCaseStudy = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { data: session } = useSession()
  const isLoggedIn = session?.user?.name
  const [view, setView] = useState<"form" | "success">("form")
  const [receipt, setReceipt] = useState<CreateNewCaseStudyResponse | null>(
    null,
  )
  const onFormSuccess = (receipt: CreateNewCaseStudyResponse) => {
    setView("success")
    setReceipt(receipt)
    if (onSuccess) {
      onSuccess()
    }
  }
  return (
    <div>
      {view === "form" && (
        <Section title="Submit a Report" size="lg">
          Submit a Report
          <div className={cn("flex", "flex-col", "gap-6", "font-medium")}>
            <div>
              Welcome to the MUTUAL research collective. Please read the{" "}
              <BestPracticesLink /> before submitting your report. All reports
              are subject to an approval process by the MUTUAL team, based on
              guidelines outlined in our documentation
            </div>
            <div>
              Connect your Github account and/or your wallet on Optimism to earn
              provenance as the author of this report.{" "}
            </div>
          </div>
          <div className={cn("my-6")}>
            <div className={cn("flex", "items-center", "gap-8")}>
              {isLoggedIn && (
                <div className={cn("flex", "justify-between", "items-center")}>
                  <div className={cn("flex", "flex-col", "items-start")}>
                    <Button
                      variant={"outline"}
                      className={cn("inline-flex", "items-center", "gap-3")}
                    >
                      <Github />
                      <div
                        className={cn("inline-flex", "gap-1", "items-center")}
                      >
                        {session?.user?.image && (
                          <Image
                            src={session.user.image}
                            height={25}
                            width={25}
                            alt={"pfp"}
                            className={cn("rounded-full")}
                          />
                        )}
                        {session?.user?.name && (
                          <span className={cn("text-black")}>
                            {session?.user?.name}
                          </span>
                        )}
                      </div>
                    </Button>
                  </div>
                </div>
              )}
              {!isLoggedIn && (
                <div>
                  <Button
                    className={cn(
                      "rounded-sm",
                      "text-primary",
                      "inline-flex",
                      "items-center",
                      "gap-2",
                    )}
                    variant={"outline"}
                    onClick={() => {
                      signIn("github", {
                        callbackUrl: `${window.location.origin}/create-case`,
                      })
                    }}
                  >
                    <Github /> <span>Sign in to Github</span>
                  </Button>
                </div>
              )}
              <ConnectButton />
            </div>

            {isLoggedIn && (
              <Button
                variant="link"
                onClick={() => signOut()}
                className={cn("p-0")}
              >
                Logout
              </Button>
            )}
          </div>
          <NewCaseStudyForm onSuccess={onFormSuccess} />
        </Section>
      )}
      {view === "success" && receipt && (
        <Section title="Case Study Created" size="lg">
          <div>
            <div className={cn("text-2xl", "font-bold")}>
              {receipt?.caseStudy.title}
            </div>
            <div className={cn("text-xl")}>by: {receipt?.pr.user.login}</div>
          </div>
          <Link
            isExternal
            href={receipt.pr.html_url}
            className={cn("text-primary", "underline")}
          >
            View on Github
          </Link>
          <Button
            variant="outline"
            className={cn(
              "rounded-full",
              "uppercase",
              "text-black",
              "flex",
              "items-center",
              "gap-2",
            )}
            onClick={() => setView("form")}
          >
            <Add fill="black" width={14} />
            <span className={cn("inline-block")}>Submit Another Report</span>
          </Button>
        </Section>
      )}
    </div>
  )
}

interface NewCaseStudyFormProps {
  onSuccess?: (data: CreateNewCaseStudyResponse) => void
}

const NewCaseStudyForm = ({ onSuccess }: NewCaseStudyFormProps) => {
  const { data: session } = useSession()
  const isLoggedIn = session?.user?.name
  const [markdown, setMarkdown] = useState("")
  const [error, setError] = useState<null | string>(null)
  const form = useForm({
    resolver: zodResolver(caseStudyFormSchema),
    defaultValues: {
      email: session?.user?.email || "",
      name: session?.user?.name || "",
      title: "",
      productDescription: "",
      industry: "",
      doesUseChain: "",
      partOfTeam: "",
      url: "",
    },
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
      console.error("Could not create case study pr")
      console.error(await res.text())
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
          <TextInput
            name="email"
            type="email"
            label="Email"
            placeholder="calebcarithers@me.com"
          />
          <TextInput
            name="name"
            label="Your Name"
            placeholder="Caleb Carithers"
          />
        </Section>
        <Section title="About the report">
          <TextInput
            name="title"
            label="Title of the Report"
            placeholder="Interaction Patterns within Dawn Wallet"
          />
          <TextInput
            name="productDescription"
            label="In 1-2 sentences, please briefly outline the main purpose of the product you are analyzing"
            placeholder="Dawn enables Safari users to interact with Ethereum"
          />
          <TextInput
            name="industry"
            label="In which industry would you place this product?"
            placeholder="Financial Services"
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
            placeholder="i.e. https://mutual.supply"
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

const Section = ({
  title,
  children,
  size = "sm",
}: {
  title: string
  children: React.ReactNode
  size?: "sm" | "lg"
}) => {
  return (
    <div className={cn("flex", "flex-col", "gap-4", "md:max-w-xl")}>
      <div
        className={cn("font-otBrut", "text-primary", {
          "text-2xl": size === "sm",
          "text-6xl": size === "lg",
        })}
      >
        {title}
      </div>
      <div className={cn("flex", "flex-col", "gap-8")}>{children}</div>
    </div>
  )
}

export default NewCaseStudyPage
