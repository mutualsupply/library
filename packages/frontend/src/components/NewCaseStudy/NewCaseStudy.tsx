"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { cn } from "utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"

import { ArrowRightIcon } from "@radix-ui/react-icons"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { useState } from "react"
import ConnectButton from "../ConnectButton"
import { BackLink, BestPracticesLink, Link } from "../Links"
import Add from "../icons/Add"
import Github from "../icons/Github"
import { Button } from "../ui/button"
import { GithubPullResponse, getPulls } from "../../lib/api"
import { CreateNewCaseStudyResponse } from "../../lib/interfaces"
import NewCaseStudyForm from "../forms/NewCaseStudyForm"
import Section from "../Section"
import DraftCaseStudy from "./DraftCaseStudy"
import { MilkdownEditorWrapper } from "../MilkdownEditor"

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
            className="border-dashed border border-red-op text-red-op p-3 text-lg"
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
  const { data: session } = useSession()
  const isLoggedIn = session?.user?.name
  const [view, setView] = useState<"form" | "success">("form")
  const [receipt, setReceipt] = useState<CreateNewCaseStudyResponse | null>(
    null,
  )
  const [markdown, setMarkdown] = useState("")
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
          <Accordion
            type="multiple"
            className={cn("flex", "flex-col", "gap-8", "w-full")}
            defaultValue={["item-0"]}
          >
            <AccordionItem value="item-0" defaultValue={"item-0"}>
              <AccordionTrigger>1. Sign in</AccordionTrigger>
              <AccordionContent>
                <div className={cn("flex", "items-center", "gap-8")}>
                  {isLoggedIn && (
                    <div
                      className={cn("flex", "justify-between", "items-center")}
                    >
                      <div className={cn("flex", "flex-col", "items-start")}>
                        <Button
                          variant={"outline"}
                          className={cn("inline-flex", "items-center", "gap-3")}
                        >
                          <Github />
                          <div
                            className={cn(
                              "inline-flex",
                              "gap-1",
                              "items-center",
                            )}
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
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-1">
              <AccordionTrigger>2. Type of thoughts</AccordionTrigger>
              <AccordionContent>
                <div>I am submitting a:</div>
                <div>
                  <div>Signal</div>
                  <div>Observation</div>
                  <div>Exploration</div>
                </div>
                <div className={cn("mt-4")}>
                  We are currently accepting Exploration submissions manually.
                  Chat with us to get started on the submission process.
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>3. Record your thoughts</AccordionTrigger>
              <AccordionContent>
                <div>
                  All submissions are subject to a review process by the MUTUAL
                  team. We suggest starting with our Best Practices Guide to
                  understand what kind of information to include, and how to
                  format your thoughts in the editor below.
                </div>
                <div className={cn("font-bold", "my-6")}>
                  Pro tip : Open the editor below in full-screen mode for a
                  breezy editing experience.
                </div>
                <MilkdownEditorWrapper onChange={setMarkdown} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>4. Details</AccordionTrigger>
              <AccordionContent>
                <NewCaseStudyForm onSuccess={onFormSuccess} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className={cn("flex", "items-center", "gap-2")}>
            <Button
              className={cn("w-full", "rounded-full")}
              size="lg"
              variant="outline"
            >
              Save draft
            </Button>
            <Button className={cn("w-full", "rounded-full")} size="lg">
              Submit for review
            </Button>
          </div>
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
