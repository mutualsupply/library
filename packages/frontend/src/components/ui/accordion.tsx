"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as React from "react";

import { cn } from "utils";
import Minus from "../icons/Minus";
import Plus from "../icons/Plus";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Item
		ref={ref}
		className={cn("border", "border-dashed", "relative", "group", className)}
		{...props}
	>
		<div className={cn("z-10", "relative")}>{children}</div>
		<div
			className={cn(
				"absolute",
				"w-full",
				"h-full",
				"inset-0",
				"group-data-[state=open]:block",
				"hidden",
				"bg-tertiary/25",
			)}
		/>
	</AccordionPrimitive.Item>
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
		leftOfIcon?: React.ReactNode;
	}
>(({ className, children, leftOfIcon, ...props }, ref) => (
	<AccordionPrimitive.Header className="flex">
		<AccordionPrimitive.Trigger
			ref={ref}
			className={cn(
				"flex flex-1 items-center justify-between text-lg group px-6 py-4 gap-2 text-left font-aspekta",
				className,
			)}
			{...props}
		>
			<div className="group-hover:underline">{children}</div>
			<div className="flex items-center gap-1">
				{leftOfIcon && leftOfIcon}
				<Plus
					className={cn("group-data-[state=open]:hidden w-6 text-primary")}
				/>
				<Minus
					className={cn("group-data-[state=closed]:hidden w-6 text-primary")}
				/>
			</div>
		</AccordionPrimitive.Trigger>
	</AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Content
		ref={ref}
		className={cn(
			"overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down p-3 font-aspekta font-light",
			className,
		)}
		{...props}
	>
		<div className="pt-0 pb-4">{children}</div>
	</AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
