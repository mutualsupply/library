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
import { useForm } from "react-hook-form";
import { z } from "zod";
import BackLink from "../../components/BackLink";
import { MilkdownEditorWrapper } from "../../components/MilkdownEditor";
import TextInput from "../../components/TextInput";
import { Button } from "../../components/ui/button";
import { Form } from "../../components/ui/form";
import { Label } from "../../components/ui/label";
import { GithubPullResponse, getPulls } from "../../lib/api";

const NewCaseStudyPage = () => {
  return (
    <div>
      <BackLink href={"/"}>Library</BackLink>
      <div
        className={cn(
          "grid",
          "gap-x-4",
          "mt-4",
          "grid-cols-1",
          "md:grid-cols-8"
        )}
      >
        <div className={cn("md:col-span-2")}>
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
  });
  return (
    <Accordion type="multiple" className={cn("flex", "flex-col", "gap-8")}>
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
  if (session) {
    return (
      <div>
        <div className={cn("text-4xl", "text-center", "text-primary")}>
          Create a New Case Study
        </div>
        <div className={cn("flex", "items-center", "justify-between", "mb-6")}>
          <div>
            {session.user?.image && (
              <Image
                width={50}
                height={50}
                alt={"profile image"}
                src={session.user.image}
              />
            )}
            {session.user?.name} :: {session.user?.email}
          </div>
          <Button variant="ghost" onClick={() => signOut()}>
            logout
          </Button>
        </div>
        <NewCaseStudyForm />
      </div>
    );
  }

  return (
    <div>
      <div className={cn("text-center")}>
        Please login to create a case study
      </div>
      <div className={cn("flex", "justify-center", "mt-4")}>
        <Button
          variant={"outline"}
          onClick={() =>
            signIn("github", {
              callbackUrl: `${window.location.origin}/create-case`,
            })
          }
        >
          login with github
        </Button>
      </div>
    </div>
  );
};

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title must be at least 1 character",
  }),
  name: z.string().min(1, {
    message: "Name must be at least 1 character",
  }),
});

const NewCaseStudyForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      name: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-4")}>
        <TextInput name="title" label="Title" placeholder="An amazing name" />
        <TextInput
          name="name"
          label="Your Name"
          placeholder="You have a lovely name"
        />
        <div className={cn("flex", "flex-col", "gap-3")}>
          <Label>Additional Markdown</Label>
          <MilkdownEditorWrapper />
        </div>
        <div className={cn("flex", "justify-center")}>
          <Button type="submit">Create</Button>
        </div>
      </form>
    </Form>
  );
};

export default NewCaseStudyPage;
