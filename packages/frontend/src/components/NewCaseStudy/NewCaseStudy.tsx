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
import { useMutation, useQuery } from "@tanstack/react-query"
import { forwardRef, useImperativeHandle, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { useAccount, useSignMessage } from "wagmi"
import { z } from "zod"
import { getDrafts, getPulls, saveDraft, submitCaseStudy } from "../../lib/api"
import { CaseStudy, ServerCaseStudy } from "../../lib/interfaces"
import { BooleanStrings, caseStudyFormSchema } from "../../lib/schema"
import { Link } from "../Links"
import Section from "../Section"
import Add from "../icons/Add"
import { Button } from "../ui/button"
import { Form } from "../ui/form"
import DetailsAccordion from "./Accordions/DetailsAccordion"
import SignInAccordion from "./Accordions/SignInAccordion"
import ThoughtsAccordion from "./Accordions/ThoughtsAccordion"
import Draft from "./Draft"
import GithubPr from "./GithubPr"
import { MilkdownEditorWrapper } from "../MilkdownEditor"
import { getDefaultValues } from "./utils"

export default function NewCaseStudy() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["pulls"],
    queryFn: getPulls,
    cacheTime: 0,
    refetchOnWindowFocus: true,
  })
  const { data: drafts, refetch: fetchDrafts } = useQuery({
    queryKey: ["drafts"],
    queryFn: getDrafts,
    cacheTime: 0,
    refetchOnWindowFocus: true,
  })
  const onCreateSuccess = () => {
    refetch()
  }
  const { data: session } = useSession()
  const ref = useRef()
  return (
    <div className={cn("flex", "gap-x-40", "flex-col", "md:flex-row")}>
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
                {!isLoading && data && data.length > 0 && (
                  <>
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
                    <div className={cn("flex", "flex-col", "gap-3", "mt-4")}>
                      {data?.map((pull) => (
                        <GithubPr pull={pull} key={pull.number} />
                      ))}
                    </div>
                  </>
                )}
                {!isLoading && (!data || data.length === 0) && (
                  <div className={cn("text-center", "my-4")}>None found</div>
                )}
              </AccordionContent>
            </AccordionItem>
            {session && (
              <AccordionItem value="item-1">
                <AccordionTrigger
                  leftOfIcon={
                    drafts &&
                    drafts.length > 0 && (
                      <div
                        className={cn("ml-2", "text-primary", "no-underline")}
                      >
                        ({drafts.length})
                      </div>
                    )
                  }
                >
                  Your Drafts
                </AccordionTrigger>
                <AccordionContent>
                  {drafts && drafts?.length > 0 && (
                    <div className="flex flex-col gap-4">
                      {drafts?.map((draft, index) => (
                        <Draft
                          onClick={() => {
                            if (ref.current) {
                              //@ts-ignore
                              ref.current.restoreDraft(draft.content)
                            }
                          }}
                          key={`draft-${index}`}
                          draft={draft}
                        />
                      ))}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </Section>
      </div>
      <div className={cn("mt-6", "md:mt-0", "w-full", "max-w-2xl")}>
        <CreateNewCaseStudy
          ref={ref}
          onSuccess={onCreateSuccess}
          drafts={drafts}
          fetchDrafts={fetchDrafts}
        />
      </div>
    </div>
  )
}

const CreateNewCaseStudy = forwardRef(function CreateNewCaseStudy(
  {
    onSuccess,
    fetchDrafts,
  }: {
    onSuccess?: () => void
    drafts?: Array<ServerCaseStudy>
    fetchDrafts: () => void
  },
  ref,
) {
  const [view, setView] = useState<"form" | "success">("form")
  const [markdown, setMarkdown] = useState("")
  const { data: session } = useSession()
  const isLoggedIn = !!session?.user
  const { signMessageAsync } = useSignMessage()
  const { address } = useAccount()
  const markdownRef = useRef()

  const caseStudyMutation = useMutation({
    mutationFn: submitCaseStudy,
    onSuccess(): void {
      setView("success")
      if (onSuccess) {
        onSuccess()
      }
    },
  })

  const draftMutation = useMutation({
    mutationFn: saveDraft,
    onSuccess(): void {
      fetchDrafts()
    },
  })

  const form = useForm({
    resolver: zodResolver(caseStudyFormSchema),
    defaultValues: getDefaultValues(session),
  })

  const parseFormForServer = (values: any): CaseStudy => {
    return {
      ...values,
      partOfTeam: values.partOfTeam === BooleanStrings.True,
      url: values.url === "" ? undefined : values.url,
      markdown: markdown === "" ? undefined : markdown,
      industry: values.industry === "" ? undefined : values.industry,
    }
  }

  const getParsedFormValues = (): CaseStudy => {
    const values = form.getValues()
    return parseFormForServer(values)
  }

  const restoreFromServer = (study: CaseStudy) => {
    return {
      ...study,
      partOfTeam: study.partOfTeam ? BooleanStrings.True : BooleanStrings.False,
      url: study.url || "",
      markdown: study.markdown || "",
      industry: study.industry || "",
    }
  }

  async function onSubmit(values: z.infer<typeof caseStudyFormSchema>) {
    const caseStudy = getParsedFormValues()
    if (address) {
      const signature = await signMessageAsync({
        message: JSON.stringify(caseStudy),
      })
      return caseStudyMutation.mutateAsync({ caseStudy, signature })
    } else {
      return caseStudyMutation.mutateAsync({ caseStudy })
    }
  }

  function onSaveDraft() {
    return draftMutation.mutateAsync(getParsedFormValues())
  }

  useImperativeHandle(ref, () => {
    return {
      restoreDraft: (values: CaseStudy) => {
        const { markdown, ...rest } = values
        form.reset(restoreFromServer(rest))
        if (markdownRef.current) {
          //@ts-expect-error
          markdownRef.current.setContent(markdown)
        }
      },
    }
  })
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
            <form className={cn("space-y-8")}>
              <Accordion
                type="multiple"
                className={cn("flex", "flex-col", "gap-8", "w-full")}
              >
                <SignInAccordion value="item-0" />
                <ThoughtsAccordion value="item-1" />
                <AccordionItem value="item-2">
                  <AccordionTrigger>3. Record your thoughts</AccordionTrigger>
                  <AccordionContent>
                    <div>
                      All submissions are subject to a review process by the
                      MUTUAL team. We suggest starting with our Best Practices
                      Guide to understand what kind of information to include,
                      and how to format your thoughts in the editor below.
                    </div>
                    <div className={cn("font-bold", "my-6")}>
                      Pro tip : Open the editor below in full-screen mode for a
                      breezy editing experience.
                    </div>
                    <div className={cn("h-[500px]")}>
                      <MilkdownEditorWrapper
                        ref={markdownRef}
                        onChange={setMarkdown}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <DetailsAccordion value="item-3" />
              </Accordion>
              {caseStudyMutation.isError &&
                caseStudyMutation.error instanceof Error && (
                  <div className={cn("text-red")}>
                    {caseStudyMutation.error.message}
                  </div>
                )}
              <div className={cn("flex", "items-center", "gap-2")}>
                <div className={cn("w-full")}>
                  <Button
                    className={cn("w-full", "rounded-full")}
                    size="lg"
                    variant="outline"
                    disabled={!isLoggedIn || form.formState.isSubmitting}
                    loading={draftMutation.isLoading}
                    onClick={form.handleSubmit(onSaveDraft)}
                  >
                    <div className={cn("flex", "flex-col")}>
                      <span>Save draft</span>
                    </div>
                  </Button>
                </div>
                <Button
                  size="lg"
                  type="submit"
                  className={cn("w-full", "rounded-full")}
                  disabled={!isLoggedIn || draftMutation.isLoading}
                  loading={form.formState.isSubmitting}
                  onClick={form.handleSubmit(onSubmit)}
                >
                  {isLoggedIn ? "Submit" : "Sign in to submit"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}

      {view === "success" && caseStudyMutation.data && (
        <Section title={caseStudyMutation.data.caseStudy.title} size="lg">
          <div>
            <div className={cn("text-xl")}>
              by: {caseStudyMutation.data?.caseStudy.name}
            </div>
          </div>
          <Link
            isExternal
            href={caseStudyMutation.data.pr.html_url}
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
})
