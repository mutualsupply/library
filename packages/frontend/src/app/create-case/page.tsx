"use client"

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
import ConnectButton from "../../components/ConnectButton"
import { BackLink, BestPracticesLink, Link } from "../../components/Links"
import Add from "../../components/icons/Add"
import Github from "../../components/icons/Github"
import { Button } from "../../components/ui/button"
import { GithubPullResponse, getPulls } from "../../lib/api"
import { CreateNewCaseStudyResponse } from "../../lib/interfaces"
import NewCaseStudyForm from "../../components/forms/NewCaseStudyForm"
import Section from "../../components/Section"

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
      <BackLink href={"/"}>Index</BackLink>
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
        href={`${pull.html_url}/files`}
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
          <div
            className={cn("flex", "flex-col", "gap-6", "font-medium", "mt-4")}
          >
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
          <div className={cn("mb-6")}>
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

export default NewCaseStudyPage
