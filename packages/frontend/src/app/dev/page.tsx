"use client";

import { PropsWithChildren, useRef } from "react";
import { useForm } from "react-hook-form";
import Dev from "../../components/Dev";
import MarkdownEditor from "../../components/MarkdownEditor/InitializedMDXEditor";
import MilkdownEditor from "../../components/MilkdownEditor/MilkdownEditor";
import RadioGroupInput from "../../components/inputs/RadioGroupInput";
import SelectInput from "../../components/inputs/SelectInput";
import TextInput from "../../components/inputs/TextInput";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../../components/ui/accordion";
import { Badge } from "../../components/ui/badge";
import { Button, OPButton, Submit } from "../../components/ui/button";
import { Form } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../components/ui/select";
import sleep from "../../lib/sleep";

const buttonVariants = [
	"default",
	"outline",
	"blueOutline",
	"blackOutline",
	"link",
	"op",
	"purple",
] as const;
const buttonSizes = ["default", "lg", "pill", "icon"] as const;

export default function DevPage() {
	const form = useForm();
	const onFormSubmit = async (values: object) => {
		await sleep(1);
		alert(JSON.stringify(values, null, 2));
	};
	const editorRef = useRef(null);
	return (
		<Dev>
			<div className="flex flex-col space-y-8">
				<Section title="Markdown Editor">
					<MarkdownEditor
						diffMarkdown="wow look at this"
						editorRef={editorRef}
						markdown={""}
						placeholder="this is a placeholder alright!"
					/>
				</Section>
				<Section title="Milkdown Editor">
					<MilkdownEditor onChange={() => {}} />
				</Section>
				<Section title="Button">
					<div className="flex justify-between">
						{buttonVariants.map((variant) => (
							<div className="flex flex-col gap-2" key={`button-${variant}`}>
								{buttonSizes.map((size) => (
									<div
										className="flex justify-center"
										key={`button-${variant}-${size}`}
									>
										<Button variant={variant} size={size}>
											{variant} {size}
										</Button>
									</div>
								))}
							</div>
						))}
					</div>
				</Section>

				<Section title="OP Button">
					<OPButton />
				</Section>

				<Section title="Badge">
					<Badge>MUTUAL</Badge>
				</Section>

				<Section title="Accordion">
					<Accordion type="single" collapsible>
						<AccordionItem value="item-1">
							<AccordionTrigger>Accordion</AccordionTrigger>
							<AccordionContent>🪗🪗🪗 we do a lil 🪗🪗🪗</AccordionContent>
						</AccordionItem>
					</Accordion>
				</Section>

				<Section title="Radio Group">
					<RadioGroup>
						<RadioGroupItem value="yes">Yes</RadioGroupItem>
						<RadioGroupItem value="no">No</RadioGroupItem>
						<RadioGroupItem value="maybe" disabled>
							Maybe
						</RadioGroupItem>
					</RadioGroup>
				</Section>
				<Section title="Select">
					<Select>
						<SelectTrigger>
							<SelectValue placeholder={"select wow"} />
						</SelectTrigger>
						<SelectContent>
							<SelectItem key={"wow"} value={"wow"}>
								wow
							</SelectItem>
							<SelectItem key={"another"} value={"another"}>
								another
							</SelectItem>
						</SelectContent>
					</Select>
				</Section>
				<Section title="Form">
					<div className="max-w-xl m-auto">
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onFormSubmit)}>
								<TextInput name="Name" label="Who are you?" />
								<SelectInput
									name="mutual"
									label="Do you feel mutual?"
									placeholder="Select an answer"
									items={[
										{ key: "true", name: "Yes" },
										{ key: "false", name: "No" },
									]}
								/>
								<div className="mt-2">
									<RadioGroupInput
										name="radio"
										items={[
											{ label: "Yes", value: "yes" },
											{ label: "No", value: "no" },
											{ label: "Maybe", value: "maybe", disabled: true },
										]}
									/>
								</div>
								<div className="flex justify-center mt-3">
									<Submit />
								</div>
							</form>
						</Form>
					</div>
				</Section>
				<Section title="Input">
					<Input placeholder="->->->" />
				</Section>
				<Section title="Label">
					<Label>Label</Label>
				</Section>
				<Section title="Tooltip">
					<Button>Primary</Button>
				</Section>
			</div>
		</Dev>
	);
}

interface SectionProps {
	title?: string;
}

function Section({ children, title }: PropsWithChildren<SectionProps>) {
	return (
		<div>
			{title && (
				<div className="text-lg font-aspektak font-medium mb-1">{title}</div>
			)}
			<div className="border p-4">{children}</div>
		</div>
	);
}
