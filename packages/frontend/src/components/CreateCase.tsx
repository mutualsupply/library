"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { usePrivy, useWallets } from "@privy-io/react-auth"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { cn } from "utils"
import useCreateCaseStudy from "../hooks/useCreateCaseStudy"
import useSaveDraft from "../hooks/useSaveDraft"
import useUpdateDraft from "../hooks/useUpdateDraft"
import { GITHUB_OWNER, GITHUB_REPO, NEW_CASE_PAGE_NAME } from "../lib/constants"
import { CaseStudy, DBCaseStudy } from "../lib/interfaces"
import { caseStudyFormSchema } from "../lib/schema"
import MilkdownEditor from "./MilkdownEditor/MilkdownEditor"
import { StatusIndicator } from "./StatusIndicator"
import ArrowLeft from "./icons/ArrowLeft"
import Plus from "./icons/Plus"
import SelectInput from "./inputs/SelectInput"
import TextInput from "./inputs/TextInput"
import { Button } from "./ui/button"
import { Form } from "./ui/form"

export const categorySelectItems = [
  { key: "social", name: "Social" },
  { key: "digital-assets", name: "Digital Assets" },
  { key: "games", name: "Games" },
  { key: "defi", name: "Defi" },
  { key: "other", name: "Other" },
]

interface CreateCaseProps {
  draft?: DBCaseStudy
}

export default function CreateCasePage({ draft }: CreateCaseProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const pathName = usePathname()
  console.log("pathname", pathName)
  const { mutateAsync: createDraft, isPending: isCreateDraftPending } =
    useSaveDraft()
  const { mutateAsync: createCase, isPending: isCreateCaseStudyPending } =
    useCreateCaseStudy()

  const { mutateAsync: updateDraft, isPending: isUpdateDraftPending } =
    useUpdateDraft()
  const [markdown, setMarkdown] = useState<string | undefined>(
    draft?.content?.markdown,
  )
  const { wallets } = useWallets()
  const { authenticated } = usePrivy()
  const [id, setId] = useState<number | undefined>(draft?.id)
  const [caseStudyReceipt, setCaseStudyReceipt] = useState<
    DBCaseStudy | undefined
  >()

  let defaultValues = draft?.content
  if (!defaultValues) {
    defaultValues = {
      title: "",
      name: session?.user?.name || "",
      email: session?.user?.email || "",
      category: "",
      experienceUrl: "",
      organization: "",
    }
  }

  const form = useForm({
    resolver: zodResolver(caseStudyFormSchema),
    defaultValues,
  })
  const onSaveDraft = (data: CaseStudy) => {
    const caseStudy = {
      ...data,
      markdown,
    }

    if (id) {
      return updateDraft({ id: id, ...caseStudy })
    }

    return createDraft(caseStudy).then((draft) => {
      setId(draft.id)
    })
  }

  const onSubmit = async (data: CaseStudy) => {
    const caseStudy = {
      ...data,
      markdown,
    }

    let signature
    const wallet = wallets?.[0]
    if (authenticated && wallet) {
      try {
        signature = await wallet.sign(JSON.stringify(caseStudy))
      } catch (e) {
        console.error("Could not sign case study", e)
        return
      }
    }
    const study = await createCase({
      ...caseStudy,
      signature,
      id,
    })
    setCaseStudyReceipt(study.caseStudy)
  }

  return (
    <div className={cn("grow flex flex-col")}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn("grow flex flex-col")}
        >
          <div className={cn("flex justify-between items-center p-4")}>
            <Button
              type="button"
              size="pill"
              className="py-3 px-2"
              onClick={() => router.back()}
            >
              <ArrowLeft className={cn("w-6 text-primary")} />
            </Button>
            <div className={cn("flex items-center gap-2")}>
              <Button
                type="button"
                variant="outline"
                size="pill"
                className={cn("w-28")}
                onClick={form.handleSubmit(onSaveDraft)}
                loading={isCreateDraftPending || isUpdateDraftPending}
                disabled={
                  isCreateCaseStudyPending ||
                  isCreateDraftPending ||
                  isUpdateDraftPending ||
                  !!caseStudyReceipt
                }
              >
                {id ? "Update Draft" : "Save Draft"}
              </Button>
              <Button
                type="submit"
                loading={isCreateCaseStudyPending}
                disabled={
                  isCreateCaseStudyPending ||
                  isCreateDraftPending ||
                  isUpdateDraftPending ||
                  !!caseStudyReceipt
                }
                size="pill"
                className={cn("bg-primary text-white w-28")}
              >
                Submit
              </Button>
            </div>
          </div>
          {!caseStudyReceipt && (
            <div className={cn("md:grid grid-cols-6 grow")}>
              <div
                className={cn(
                  "col-span-2 p-4 border border-primary border-r-0 border-b-0 md:border-b",
                )}
              >
                <div className={cn("font-otBrut text-3xl text-primary")}>
                  Lorem ipsum dolor set
                </div>
                <div className={cn("font-aspekta text-sm")}>
                  This is truly an almighty mountain. In your world you have
                  total and absolute power. Every highlight needs it's own
                  personal shadow. This is your world, whatever makes you happy
                  you can put in it. Go crazy. Let's give him a friend too.
                  Everybody needs a friend. You can get away with a lot.
                </div>
                <div className={cn("flex flex-col space-y-2")}>
                  <TextInput
                    name="title"
                    label="Title"
                    placeholder="MUTUAL Time Capsule Thoughts"
                    size="lg"
                    variant="solid"
                  />
                  <TextInput
                    name="name"
                    label="Author"
                    placeholder="Vitalik Buterin"
                    size="lg"
                    variant="solid"
                  />
                  <SelectInput
                    name="category"
                    label="Choose a category"
                    description="We are actively working on adding more categories 🙏🏽"
                    placeholder="Select one"
                    items={categorySelectItems}
                  />
                  <TextInput
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="research@mutual.supply"
                    size="lg"
                    variant="solid"
                  />
                  <TextInput
                    name="experienceUrl"
                    label="Proof of Experience"
                    description="Share a link to where this lives online. A website / app / prototype / screen recording, etc."
                    placeholder="www.mutual.supply"
                    size="lg"
                    variant="solid"
                  />
                  <TextInput
                    name="organization"
                    label="Name of organization (if applicable)"
                    placeholder="MUTUAL"
                    variant="solid"
                    size="lg"
                  />
                </div>
              </div>
              <div className={cn("col-span-4 flex flex-col")}>
                <MilkdownEditor
                  defaultValue={draft?.content?.markdown}
                  onChange={setMarkdown}
                />
              </div>
            </div>
          )}
          {caseStudyReceipt && (
            <div className={cn("grow flex justify-center items-center")}>
              <div className={cn("border w-[500px] flex flex-col")}>
                <div className={cn("border-b p-4")}>
                  <div className={cn("font-otBrut text-2xl text-primary")}>
                    {caseStudyReceipt.content.title}
                  </div>
                  <div className={cn("font-aspekta mt-2")}>
                    by {caseStudyReceipt.content.name}
                  </div>
                  <div className={cn("mt-3")}>
                    <StatusIndicator
                      caseStudy={caseStudyReceipt}
                      showButton={false}
                    />
                  </div>
                </div>
                <div className={cn("p-4")}>
                  <Link href="/submit">
                    <Button
                      size="pill"
                      className={cn(
                        "border-none bg-tertiary text-black w-full p-3 font-spline text-sm",
                      )}
                    >
                      Back to Dashboard
                    </Button>
                  </Link>
                  <div className={cn("flex justify-between gap-4 mt-4")}>
                    <Link
                      className={cn("w-full")}
                      href={`https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/pull/${caseStudyReceipt.githubBranchName}`}
                    >
                      <Button
                        variant="outline"
                        size="pill"
                        className={cn("w-full p-2 text-sm font-spline")}
                      >
                        View on Github
                      </Button>
                    </Link>
                    <Link
                      href={`/${NEW_CASE_PAGE_NAME}`}
                      className={cn("w-full")}
                    >
                      <Button
                        onClick={() => {
                          if (id) {
                            router.push(`/${NEW_CASE_PAGE_NAME}`)
                          } else {
                            setId(undefined)
                            setCaseStudyReceipt(undefined)
                            form.reset()
                          }
                        }}
                        variant="outline"
                        size="pill"
                        className={cn(
                          "text-black w-full p-2 text-sm font-spline inline-flex items-center gap-2",
                        )}
                      >
                        <Plus className={cn("w-4")} />
                        New thought
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
      </Form>
    </div>
  )
}
