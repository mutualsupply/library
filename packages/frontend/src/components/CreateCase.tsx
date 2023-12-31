"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { cn } from "utils";
import useCreateCaseStudy from "../hooks/useCreateCaseStudy";
import useSaveDraft from "../hooks/useSaveDraft";
import useUpdateDraft from "../hooks/useUpdateDraft";
import { isProd } from "../lib/env";
import { CaseStudy, DBCaseStudy } from "../lib/interfaces";
import { caseStudyFormSchema } from "../lib/schema";
import MilkdownEditor from "./MilkdownEditor/MilkdownEditor";
import ArrowLeft from "./icons/ArrowLeft";
import SelectInput from "./inputs/SelectInput";
import TextInput from "./inputs/TextInput";
import { Button } from "./ui/button";
import { Form } from "./ui/form";

export const categorySelectItems = [
	{ key: "social", name: "Social" },
	{ key: "digital-assets", name: "Digital Assets" },
	{ key: "games", name: "Games" },
	{ key: "defi", name: "Defi" },
	{ key: "other", name: "Other" },
];

interface CreateCaseProps {
	draft?: DBCaseStudy;
}

export default function CreateCasePage({ draft }: CreateCaseProps) {
	const { data: session } = useSession();
	const router = useRouter();
	const { mutateAsync: createDraft, isPending: isCreateDraftPending } =
		useSaveDraft();
	const { mutateAsync: createCase, isPending: isCreateCaseStudyPending } =
		useCreateCaseStudy();

	const { mutateAsync: updateDraft, isPending: isUpdateDraftPending } =
		useUpdateDraft();
	const [markdown, setMarkdown] = useState<string | undefined>(
		draft?.content?.markdown,
	);
	const { wallets } = useWallets();
	const { authenticated } = usePrivy();
	const [id, setId] = useState<number | undefined>(draft?.id);

	let defaultValues = draft?.content;
	if (!defaultValues) {
		if (isProd()) {
			defaultValues = {
				title: "",
				name: session?.user?.name || "",
				email: session?.user?.email || "",
				category: "",
				experienceUrl: "",
				organization: "",
			};
		} else {
			defaultValues = {
				title: "How to make a Case Study",
				name: session?.user?.name || "",
				email: session?.user?.email || "",
				category: "social",
				experienceUrl: "https://dev.mutual.supply",
				organization: "MUTUAL",
			};
		}
	}

	const form = useForm({
		resolver: zodResolver(caseStudyFormSchema),
		defaultValues,
	});
	const onSaveDraft = (data: CaseStudy) => {
		const caseStudy = {
			...data,
			markdown,
		};

		if (id) {
			return updateDraft({ id: id, ...caseStudy });
		}

		return createDraft(caseStudy).then((draft) => {
			setId(draft.id);
		});
	};

	const onSubmit = async (data: CaseStudy) => {
		const caseStudy = {
			...data,
			markdown,
		};

		const wallet = wallets?.[0];
		if (authenticated && wallet) {
			try {
				const signature = await wallet.sign(JSON.stringify(caseStudy));
				return createCase({
					...caseStudy,
					signature,
					id,
				});
			} catch (e) {
				console.error(e);
				return;
			}
		}
		return createCase({ ...caseStudy, id });
	};

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
									isUpdateDraftPending
								}
							>
								{draft ? "Update Draft" : "Save Draft"}
							</Button>
							<Button
								type="submit"
								loading={isCreateCaseStudyPending}
								disabled={
									isCreateCaseStudyPending ||
									isCreateDraftPending ||
									isUpdateDraftPending
								}
								size="pill"
								className={cn("bg-primary text-white w-28")}
							>
								Submit
							</Button>
						</div>
					</div>
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
								This is truly an almighty mountain. In your world you have total
								and absolute power. Every highlight needs it's own personal
								shadow. This is your world, whatever makes you happy you can put
								in it. Go crazy. Let's give him a friend too. Everybody needs a
								friend. You can get away with a lot.
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
								placeholder="Testing"
								onChange={setMarkdown}
							/>
						</div>
					</div>
				</form>
			</Form>
		</div>
	);
}
