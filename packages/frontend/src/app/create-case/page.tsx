"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, signOut, useSession } from "next-auth/react";
import { cn } from "utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ConnectButton from "../../components/ConnectButton";
import { BackLink, BestPracticesLink } from "../../components/Links";
import { MilkdownEditorWrapper } from "../../components/MilkdownEditor";
import SelectInput from "../../components/SelectInput";
import TextInput from "../../components/TextInput";
import Github from "../../components/icons/Github";
import { Button } from "../../components/ui/button";
import { Form } from "../../components/ui/form";
import { GithubPullResponse, getPulls } from "../../lib/api";
import { BooleanStrings, caseStudyFormSchema } from "../../lib/schema";

const NewCaseStudyPage = () => {
  return (
    <div>
      <BackLink href={"/"}>Library</BackLink>
      <div
        className={cn(
          "grid",
          "gap-24",
          "mt-4",
          "grid-cols-1",
          "md:grid-cols-12"
        )}
      >
        <div className={cn("md:col-span-4")}>
          <LeftPane />
        </div>
        <div className={cn("md:col-span-6", "mt-6", "md:mt-0")}>
          <CreateNewCaseStudy />
        </div>
      </div>
    </div>
  );
};

const LeftPane = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["pulls"],
    queryFn: getPulls,
    cacheTime: 0,
    refetchOnWindowFocus: true,
  });
  return (
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
              This database exists to provide a collaborative environment for
              designers, researchers and engineers to learn from and interact
              with one another.
            </div>
            <div>
              By submitting research, you're contributing to a public knowledge
              base that fuels experimentation and drives the evolution of
              user-centered design in blockchain products.
            </div>
            <div>
              We're excited to be a part of your process as you prepare your
              report. Before submitting, read the <BestPracticesLink /> to
              understand requirements and internal standards. All reports are
              subject to an approval process based on guidelines you will find
              in our documentation.
            </div>
            <div>Database & online experience maintaned by MUTUAL</div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-1">
        <AccordionTrigger>Best Practices Guide</AccordionTrigger>
        <AccordionContent>~ Mutually supply with us please ~</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Case Studies In Progress</AccordionTrigger>
        <AccordionContent>
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href={"https://github.com/mutualsupply/site/pulls"}
            className={cn(
              "inline-flex",
              "items-center",
              "text-primary",
              "gap-1",
              "border-b",
              "text-xs"
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
  );
};

interface DraftCaseStudyProps {
  pull: GithubPullResponse[number];
}

const DraftCaseStudy = ({ pull }: DraftCaseStudyProps) => {
  return (
    <Link
      target={"_blank"}
      href={pull.html_url}
      className={cn("p-4", "border")}
    >
      <div className={cn("underline", "font-aspekta", "font-light")}>
        {pull.title}
      </div>
      <div className={cn("text-primary", "mt-2")}>{pull.user?.login}</div>
    </Link>
  );
};

const CreateNewCaseStudy = () => {
  const { data: session } = useSession();
  const isLoggedIn = session?.user?.name;
  return (
    <div>
      <div className={cn("text-6xl", "text-primary", "font-otBrut", "mb-6")}>
        Submit a Report
      </div>
      <div className={cn("flex", "flex-col", "gap-6", "font-medium")}>
        <div>
          Welcome to the MUTUAL research collective. Please read the{" "}
          <BestPracticesLink /> before submitting your report. All reports are
          subject to an approval process by the MUTUAL team, based on guidelines
          outlined in our documentation
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
                  <div className={cn("inline-flex", "gap-1")}>
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
                  "gap-2"
                )}
                variant={"outline"}
                onClick={() => {
                  console.log(
                    "calling sign in with callback",
                    `${window.location.origin}/create-case`
                  );
                  signIn("github", {
                    callbackUrl: `${window.location.origin}/create-case`,
                  });
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
      <div className={cn("max-w-lg")}>
        <NewCaseStudyForm />
      </div>
    </div>
  );
};

const NewCaseStudyForm = () => {
  const { data: session } = useSession();
  const isLoggedIn = session?.user?.name;
  const [markdown, setMarkdown] = useState("");
  const form = useForm({
    resolver: zodResolver(caseStudyFormSchema),
    defaultValues: {
      email: session?.user?.email || "calebcarithers@me.com",
      name: session?.user?.name || "Caleb Carithers",
      title: "wow",
      productDescription: "wow",
      industry: "wow",
      doesUseChain: BooleanStrings.True,
      partOfTeam: BooleanStrings.True,
      url: "https://mutual.supply",
    },
  });
  async function onSubmit(values: z.infer<typeof caseStudyFormSchema>) {
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
    });
    if (!res.ok) {
      console.error("Could not create case study pr");
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
          <TextInput
            name="productDescription"
            label="In 1-2 sentences, please briefly outline the main purpose of the product you are analyzing"
          />
          <TextInput
            name="industry"
            label="In which industry would you place this product?"
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
            label="If available, please provide an active URL or prototype link to the experience (ideall in the state you are analyzing)"
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

        <div className={cn("flex", "justify-center")}>
          <Button
            variant={"outline"}
            disabled={!isLoggedIn}
            type="submit"
            className={cn("w-full", "uppercase", "rounded-full")}
          >
            {isLoggedIn ? "submit report" : "sing in to submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={cn("flex", "flex-col", "gap-4")}>
      <div className={cn("text-2xl", "font-otBrut", "text-primary")}>
        {title}
      </div>
      <div className={cn("flex", "flex-col", "gap-8")}>{children}</div>
    </div>
  );
};

export default NewCaseStudyPage;
