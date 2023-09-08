"use client"

import { useSession } from "next-auth/react"
import { cn } from "utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"

import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { getPulls } from "../../lib/api"
import { isProd } from "../../lib/env"
import { CreateNewCaseStudyResponse, StudyType } from "../../lib/interfaces"
import { BooleanStrings, caseStudyFormSchema } from "../../lib/schema"
import { Link } from "../Links"
import Section from "../Section"
import Add from "../icons/Add"
import { Button } from "../ui/button"
import { Form } from "../ui/form"
import DetailsAccordion from "./Accordions/DetailsAccordion"
import RecordAccordion from "./Accordions/RecordAccordion"
import SignInAccordion from "./Accordions/SignInAccordion"
import ThoughtsAccordion from "./Accordions/ThoughtsAccordion"
import DraftCaseStudy from "./DraftCaseStudy"

export default function NewCaseStudy() {
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
    <div className={cn("flex", "gap-x-40", "mt-4", "flex-col", "md:flex-row")}>
      <div className={cn("md:max-w-xl", "w-full")}>
        <Section title="Create cultrual timestamps" size="lg">
          <div>
            This public database offers a collaborative environment for builders
            and researchers of all backgrounds to learn from and interact with
            each other.
          </div>
          <div>
            By submitting your thoughts, you{"’"}re contributing to an
            open-source knowledge base that will create cultural timestamps of
            design as it evolves in decentralized society.
          </div>
          <div>
            As the MUTUAL Library grows over time, so will the influence of your
            thoughts as they help establish patterns & trends that drive the
            evolution of user-centered design in blockchain enabled products.
          </div>
          <div>
            Before submitting, read the Best Practices Guide to understand
            requirements and internal standards. All submissions are subject to
            a review process by the MUTUAL team.
          </div>
          <Link
            href=""
            className="border-dashed border border-red-op text-red-op p-3 text-lg no-underline"
          >
            Earn $OP rewards & on-chain reputation →
          </Link>
          <Accordion
            type="multiple"
            className={cn("flex", "flex-col", "gap-8")}
          >
            <AccordionItem value="item-0">
              <AccordionTrigger>Case Studies In Progress</AccordionTrigger>
              <AccordionContent>
                <Link
                  isExternal
                  href={"https://github.com/mutualsupply/library/pulls"}
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
        </Section>
      </div>
      <div className={cn("mt-6", "md:mt-0", "w-full", "max-w-2xl")}>
        <CreateNewCaseStudy onSuccess={onCreateSuccess} />
      </div>
    </div>
  )
}

const CreateNewCaseStudy = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [view, setView] = useState<"form" | "success">("form")
  const [receipt, setReceipt] = useState<CreateNewCaseStudyResponse | null>(
    null,
  )
  const [error, setError] = useState<string | null>(null)
  const [markdown, setMarkdown] = useState("")
  const { data: session } = useSession()
  const isLoggedIn = !!session?.user

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
        type: StudyType.Signal,
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
        type: StudyType.Signal,
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
      try {
        const json = await res.json()
        setView("success")
        setReceipt(json)
        if (onSuccess) {
          onSuccess()
        }
      } catch (e) {
        console.error(e)
      }
    }
  }
  return (
    <div>
      {view === "form" && (
        <div
          className={cn(
            "flex",
            "flex-col",
            "gap-6",
            "font-medium",
            "mt-4",
            "md:mt-0",
          )}
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={cn("space-y-8")}
            >
              <Accordion
                type="multiple"
                className={cn("flex", "flex-col", "gap-8", "w-full")}
                defaultValue={["item-0"]}
              >
                <SignInAccordion value="item-0" />
                <ThoughtsAccordion value="item-1" />
                <RecordAccordion value="item-2" onChange={setMarkdown} />
                <DetailsAccordion value="item-3" />
              </Accordion>
              <div className={cn("flex", "items-center", "gap-2")}>
                <Button
                  className={cn("w-full", "rounded-full")}
                  size="lg"
                  variant="outline"
                  disabled={!isLoggedIn}
                >
                  Save draft
                </Button>
                <Button
                  type="submit"
                  className={cn("w-full", "rounded-full")}
                  size="lg"
                  disabled={!isLoggedIn}
                >
                  {isLoggedIn ? "Submit" : "Sign in to submit"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}

      {view === "success" && receipt && (
        <Section title={receipt.caseStudy.title} size="lg">
          <div>
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
